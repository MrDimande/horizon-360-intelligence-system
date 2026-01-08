import enum
from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Enum, func
from sqlalchemy.orm import relationship
from app.database import Base

class FinancialRecordType(str, enum.Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"

class FinancialRecord(Base):
    __tablename__ = "FinancialRecord"

    id = Column(String, primary_key=True) # Managed by client or DB default
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    type = Column(Enum(FinancialRecordType), nullable=False, index=True)
    category = Column(String, nullable=False)
    amount = Column(Numeric(14, 2), nullable=False)
    currency = Column(String, nullable=False)
    date = Column(DateTime, nullable=False, index=True)
    description = Column(String, nullable=True)

    employeeId = Column(String, ForeignKey("Employee.id"), nullable=True, index=True)
    
    # Relationships
    employee = relationship("Employee", back_populates="financial_records")
    insights = relationship("AiInsight", back_populates="financial_record")
