from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.financial_record import FinancialRecord, FinancialRecordCreate, FinancialRecordUpdate
from app.crud import financial_record as crud

router = APIRouter(
    prefix="/financial-records",
    tags=["financial-records"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=FinancialRecord)
def create_financial_record(record: FinancialRecordCreate, db: Session = Depends(get_db)):
    return crud.create_financial_record(db=db, record=record)

@router.get("/", response_model=List[FinancialRecord])
def read_financial_records(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    records = crud.get_financial_records(db, skip=skip, limit=limit)
    return records

@router.get("/{record_id}", response_model=FinancialRecord)
def read_financial_record(record_id: str, db: Session = Depends(get_db)):
    db_record = crud.get_financial_record(db, record_id=record_id)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Financial Record not found")
    return db_record

@router.put("/{record_id}", response_model=FinancialRecord)
def update_financial_record(record_id: str, record: FinancialRecordUpdate, db: Session = Depends(get_db)):
    db_record = crud.update_financial_record(db, record_id=record_id, record=record)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Financial Record not found")
    return db_record

@router.delete("/{record_id}", response_model=FinancialRecord)
def delete_financial_record(record_id: str, db: Session = Depends(get_db)):
    db_record = crud.delete_financial_record(db, record_id=record_id)
    if db_record is None:
        raise HTTPException(status_code=404, detail="Financial Record not found")
    return db_record
