from sqlalchemy.orm import Session
from decimal import Decimal
from typing import List, Optional
import uuid

from app.models.employee import Employee
from app.models.payroll import Payroll, PayrollItem, PayrollStatus, PayrollItemType
from app.schemas.payroll import PayrollCreate, PayrollItemCreate

# Tax rates (configurable - these are example rates)
TAX_RATES = {
    "IRT": {  # Imposto sobre Rendimento de Trabalho (Mozambique)
        "brackets": [
            (42_000, 0.0),      # 0% up to 42,000 MZN
            (168_000, 0.10),   # 10% from 42,001 to 168,000
            (504_000, 0.15),   # 15% from 168,001 to 504,000
            (1_512_000, 0.20), # 20% from 504,001 to 1,512,000
            (float('inf'), 0.32),  # 32% above 1,512,000
        ]
    },
    "INSS": 0.03,  # 3% Social Security contribution
}

def calculate_irt(gross_salary: Decimal) -> Decimal:
    """Calculate IRT (Income Tax) based on Mozambique tax brackets."""
    salary = float(gross_salary)
    tax = Decimal("0.00")
    previous_limit = 0
    
    for limit, rate in TAX_RATES["IRT"]["brackets"]:
        if salary <= previous_limit:
            break
        taxable_in_bracket = min(salary, limit) - previous_limit
        if taxable_in_bracket > 0:
            tax += Decimal(str(taxable_in_bracket * rate))
        previous_limit = limit
    
    return tax.quantize(Decimal("0.01"))

def calculate_inss(gross_salary: Decimal) -> Decimal:
    """Calculate INSS (Social Security) contribution."""
    return (gross_salary * Decimal(str(TAX_RATES["INSS"]))).quantize(Decimal("0.01"))

def generate_payroll_for_employee(
    db: Session, 
    employee: Employee, 
    period: str,
    additional_items: Optional[List[PayrollItemCreate]] = None
) -> Payroll:
    """Generate payroll for a single employee."""
    
    # Check if payroll already exists for this employee and period
    existing = db.query(Payroll).filter(
        Payroll.employeeId == employee.id,
        Payroll.period == period
    ).first()
    
    if existing:
        raise ValueError(f"Payroll already exists for employee {employee.id} in period {period}")
    
    # Get base salary (use 0 if not set)
    base_salary = Decimal(str(employee.baseSalary)) if hasattr(employee, 'baseSalary') and employee.baseSalary else Decimal("0.00")
    
    # If no base salary, try to get from most recent SALARY financial record
    if base_salary == 0:
        from app.models.financial_record import FinancialRecord
        latest_salary = db.query(FinancialRecord).filter(
            FinancialRecord.employeeId == employee.id,
            FinancialRecord.category == "SALARY"
        ).order_by(FinancialRecord.date.desc()).first()
        
        if latest_salary:
            base_salary = Decimal(str(latest_salary.amount))
    
    # Create payroll items
    items = []
    gross_salary = Decimal("0.00")
    
    # Base salary item
    if base_salary > 0:
        items.append(PayrollItem(
            id=str(uuid.uuid4()),
            type=PayrollItemType.SALARY,
            description="Salário Base",
            amount=base_salary
        ))
        gross_salary += base_salary
    
    # Add additional items (bonuses, allowances)
    if additional_items:
        for item in additional_items:
            pi = PayrollItem(
                id=str(uuid.uuid4()),
                type=item.type,
                description=item.description,
                amount=item.amount
            )
            items.append(pi)
            if item.type in [PayrollItemType.SALARY, PayrollItemType.BONUS, PayrollItemType.ALLOWANCE]:
                gross_salary += item.amount
    
    # Calculate deductions
    irt = calculate_irt(gross_salary)
    inss = calculate_inss(gross_salary)
    total_deductions = irt + inss
    
    # Add deduction items
    if irt > 0:
        items.append(PayrollItem(
            id=str(uuid.uuid4()),
            type=PayrollItemType.TAX,
            description="IRT (Imposto sobre Rendimento)",
            amount=-irt  # Negative for deductions
        ))
    
    if inss > 0:
        items.append(PayrollItem(
            id=str(uuid.uuid4()),
            type=PayrollItemType.DEDUCTION,
            description="INSS (Segurança Social)",
            amount=-inss  # Negative for deductions
        ))
    
    # Calculate net salary
    net_salary = gross_salary - total_deductions
    
    # Create payroll record
    payroll = Payroll(
        id=str(uuid.uuid4()),
        employeeId=employee.id,
        period=period,
        grossSalary=gross_salary,
        netSalary=net_salary,
        totalDeductions=total_deductions,
        status=PayrollStatus.DRAFT,
        items=items
    )
    
    db.add(payroll)
    db.commit()
    db.refresh(payroll)
    
    return payroll

def generate_monthly_payroll(
    db: Session, 
    period: str, 
    employee_ids: Optional[List[str]] = None
) -> List[Payroll]:
    """Generate payroll for multiple employees for a given period."""
    
    # Get employees
    query = db.query(Employee).filter(Employee.isActive == True)
    if employee_ids:
        query = query.filter(Employee.id.in_(employee_ids))
    
    employees = query.all()
    payrolls = []
    errors = []
    
    for employee in employees:
        try:
            payroll = generate_payroll_for_employee(db, employee, period)
            payrolls.append(payroll)
        except ValueError as e:
            errors.append({"employee_id": employee.id, "error": str(e)})
    
    return payrolls

def process_payroll(db: Session, payroll_id: str) -> Payroll:
    """Mark payroll as processed."""
    payroll = db.query(Payroll).filter(Payroll.id == payroll_id).first()
    if not payroll:
        raise ValueError(f"Payroll {payroll_id} not found")
    
    payroll.status = PayrollStatus.PROCESSED
    db.commit()
    db.refresh(payroll)
    return payroll

def mark_payroll_paid(db: Session, payroll_id: str) -> Payroll:
    """Mark payroll as paid."""
    payroll = db.query(Payroll).filter(Payroll.id == payroll_id).first()
    if not payroll:
        raise ValueError(f"Payroll {payroll_id} not found")
    
    if payroll.status != PayrollStatus.PROCESSED:
        raise ValueError("Payroll must be processed before marking as paid")
    
    payroll.status = PayrollStatus.PAID
    db.commit()
    db.refresh(payroll)
    return payroll
