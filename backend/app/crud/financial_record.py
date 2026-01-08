from sqlalchemy.orm import Session
from app.models.financial_record import FinancialRecord
from app.schemas.financial_record import FinancialRecordCreate, FinancialRecordUpdate

def get_financial_record(db: Session, record_id: str):
    return db.query(FinancialRecord).filter(FinancialRecord.id == record_id).first()

def get_financial_records(db: Session, skip: int = 0, limit: int = 100):
    return db.query(FinancialRecord).offset(skip).limit(limit).all()

def create_financial_record(db: Session, record: FinancialRecordCreate):
    db_record = FinancialRecord(**record.model_dump())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def update_financial_record(db: Session, record_id: str, record: FinancialRecordUpdate):
    db_record = get_financial_record(db, record_id)
    if not db_record:
        return None
    
    update_data = record.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_record, key, value)
    
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def delete_financial_record(db: Session, record_id: str):
    db_record = get_financial_record(db, record_id)
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record
