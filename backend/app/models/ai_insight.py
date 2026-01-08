import enum
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, JSON, UniqueConstraint, func
from sqlalchemy.orm import relationship
from app.database import Base

class AiInsightScope(str, enum.Enum):
    EMPLOYEE = "EMPLOYEE"
    FINANCIAL_RECORD = "FINANCIAL_RECORD"
    CASHFLOW = "CASHFLOW"
    FORECAST = "FORECAST"
    ORGANIZATION = "ORGANIZATION"

class AiInsight(Base):
    __tablename__ = "AiInsight"

    id = Column(String, primary_key=True)
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    scope = Column(Enum(AiInsightScope), nullable=False)
    key = Column(String, nullable=False)
    summary = Column(String, nullable=True)
    payload = Column(JSON, nullable=False)
    model = Column(String, nullable=True)
    promptHash = Column(String, nullable=True)
    expiresAt = Column(DateTime, nullable=True)

    employeeId = Column(String, ForeignKey("Employee.id"), nullable=True, index=True)
    financialRecordId = Column(String, ForeignKey("FinancialRecord.id"), nullable=True, index=True)

    # Relationships
    employee = relationship("Employee", back_populates="insights")
    financial_record = relationship("FinancialRecord", back_populates="insights")

    __table_args__ = (
        UniqueConstraint('scope', 'key', name='_AiInsight_scope_key_uc'),
    )
