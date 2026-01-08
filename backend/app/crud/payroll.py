from sqlalchemy.orm import Session
from app.models.payroll import Payroll, PayrollItem
from typing import List, Optional

def get_payroll(db: Session, payroll_id: str) -> Optional[Payroll]:
    return db.query(Payroll).filter(Payroll.id == payroll_id).first()

def get_payrolls(db: Session, skip: int = 0, limit: int = 100) -> List[Payroll]:
    return db.query(Payroll).offset(skip).limit(limit).all()

def get_payrolls_by_period(db: Session, period: str, skip: int = 0, limit: int = 100) -> List[Payroll]:
    return db.query(Payroll).filter(Payroll.period == period).offset(skip).limit(limit).all()

def get_payrolls_by_employee(db: Session, employee_id: str, skip: int = 0, limit: int = 100) -> List[Payroll]:
    return db.query(Payroll).filter(Payroll.employeeId == employee_id).offset(skip).limit(limit).all()

def delete_payroll(db: Session, payroll_id: str) -> Optional[Payroll]:
    payroll = get_payroll(db, payroll_id)
    if payroll:
        db.delete(payroll)
        db.commit()
    return payroll
