from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from app.crud.audit_log import create_audit_log, calculate_changes
from app.models.audit_log import AuditAction
import uuid

def get_employee(db: Session, employee_id: str):
    return db.query(Employee).filter(Employee.id == employee_id).first()

def get_employee_by_email(db: Session, email: str):
    return db.query(Employee).filter(Employee.email == email).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Employee).offset(skip).limit(limit).all()

def _employee_to_dict(employee: Employee) -> dict:
    """Convert employee to dict for audit logging."""
    return {
        "name": employee.name,
        "email": employee.email,
        "department": employee.department,
        "position": employee.position,
        "hireDate": str(employee.hireDate) if employee.hireDate else None,
        "isActive": employee.isActive,
    }

def create_employee(db: Session, employee: EmployeeCreate, performed_by: str = "system"):
    db_employee = Employee(
        id=str(uuid.uuid4()),
        **employee.model_dump()
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    
    # Log creation
    create_audit_log(
        db=db,
        entity_type="EMPLOYEE",
        entity_id=db_employee.id,
        action=AuditAction.CREATE,
        changes=_employee_to_dict(db_employee),
        performed_by=performed_by,
        description=f"Funcionário {db_employee.name} criado"
    )
    
    return db_employee

def update_employee(db: Session, employee_id: str, employee: EmployeeUpdate, performed_by: str = "system"):
    db_employee = get_employee(db, employee_id)
    if not db_employee:
        return None
    
    # Capture old state for audit
    old_data = _employee_to_dict(db_employee)
    
    update_data = employee.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_employee, key, value)
    
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    
    # Capture new state and calculate changes
    new_data = _employee_to_dict(db_employee)
    changes = calculate_changes(old_data, new_data)
    
    if changes:  # Only log if there were actual changes
        create_audit_log(
            db=db,
            entity_type="EMPLOYEE",
            entity_id=db_employee.id,
            action=AuditAction.UPDATE,
            changes=changes,
            performed_by=performed_by,
            description=f"Funcionário {db_employee.name} atualizado"
        )
    
    return db_employee

def delete_employee(db: Session, employee_id: str, performed_by: str = "system"):
    db_employee = get_employee(db, employee_id)
    if db_employee:
        # Log deletion before actually deleting
        create_audit_log(
            db=db,
            entity_type="EMPLOYEE",
            entity_id=db_employee.id,
            action=AuditAction.DELETE,
            changes=_employee_to_dict(db_employee),
            performed_by=performed_by,
            description=f"Funcionário {db_employee.name} removido"
        )
        
        db.delete(db_employee)
        db.commit()
    return db_employee
