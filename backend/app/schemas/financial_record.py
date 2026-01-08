from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from decimal import Decimal
from app.models.financial_record import FinancialRecordType

class FinancialRecordBase(BaseModel):
    type: FinancialRecordType
    category: str
    amount: Decimal = Field(..., max_digits=14, decimal_places=2)
    currency: str
    date: datetime
    description: Optional[str] = None
    employeeId: Optional[str] = None

class FinancialRecordCreate(FinancialRecordBase):
    pass

class FinancialRecordUpdate(BaseModel):
    type: Optional[FinancialRecordType] = None
    category: Optional[str] = None
    amount: Optional[Decimal] = Field(None, max_digits=14, decimal_places=2)
    currency: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None
    employeeId: Optional[str] = None

class FinancialRecord(FinancialRecordBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
