from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.payroll import Payroll, PayrollSummary, GeneratePayrollRequest
from app.crud import payroll as crud
from app.services.payroll_service import (
    generate_monthly_payroll, 
    generate_payroll_for_employee,
    process_payroll,
    mark_payroll_paid
)
from app.crud.employee import get_employee

router = APIRouter(
    prefix="/payroll",
    tags=["payroll"],
    responses={404: {"description": "Not found"}},
)

@router.post("/generate", response_model=List[PayrollSummary])
def generate_payroll(request: GeneratePayrollRequest, db: Session = Depends(get_db)):
    """Generate payroll for a period. If employee_ids not provided, generates for all active employees."""
    try:
        payrolls = generate_monthly_payroll(db, request.period, request.employee_ids)
        return payrolls
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/generate/{employee_id}/{period}", response_model=Payroll)
def generate_employee_payroll(employee_id: str, period: str, db: Session = Depends(get_db)):
    """Generate payroll for a specific employee and period."""
    employee = get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    try:
        payroll = generate_payroll_for_employee(db, employee, period)
        return payroll
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[PayrollSummary])
def list_payrolls(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all payrolls with pagination."""
    return crud.get_payrolls(db, skip=skip, limit=limit)

@router.get("/period/{period}", response_model=List[PayrollSummary])
def list_payrolls_by_period(period: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all payrolls for a specific period."""
    return crud.get_payrolls_by_period(db, period=period, skip=skip, limit=limit)

@router.get("/employee/{employee_id}", response_model=List[PayrollSummary])
def list_employee_payrolls(employee_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all payrolls for a specific employee."""
    return crud.get_payrolls_by_employee(db, employee_id=employee_id, skip=skip, limit=limit)

@router.get("/{payroll_id}", response_model=Payroll)
def get_payroll(payroll_id: str, db: Session = Depends(get_db)):
    """Get a specific payroll with all items."""
    payroll = crud.get_payroll(db, payroll_id)
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")
    return payroll

@router.post("/{payroll_id}/process", response_model=PayrollSummary)
def process_payroll_endpoint(payroll_id: str, db: Session = Depends(get_db)):
    """Mark a payroll as processed."""
    try:
        return process_payroll(db, payroll_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{payroll_id}/pay", response_model=PayrollSummary)
def pay_payroll(payroll_id: str, db: Session = Depends(get_db)):
    """Mark a payroll as paid."""
    try:
        return mark_payroll_paid(db, payroll_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{payroll_id}", response_model=PayrollSummary)
def delete_payroll(payroll_id: str, db: Session = Depends(get_db)):
    """Delete a payroll (only if in DRAFT status)."""
    payroll = crud.get_payroll(db, payroll_id)
    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")
    
    if payroll.status.value != "DRAFT":
        raise HTTPException(status_code=400, detail="Only draft payrolls can be deleted")
    
    return crud.delete_payroll(db, payroll_id)
