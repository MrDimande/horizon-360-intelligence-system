from sqlalchemy import Column, String, DateTime, Boolean, func
from sqlalchemy.orm import relationship
from app.database import Base

class Employee(Base):
    __tablename__ = "Employee"

    id = Column(String, primary_key=True, default=func.cuid()) # Using string for CUID compatibility if needed, or UUID
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    department = Column(String, nullable=False, index=True)
    position = Column(String, nullable=False)
    hireDate = Column(DateTime, nullable=False)
    isActive = Column(Boolean, default=True, nullable=False)

    # Relationships
    financial_records = relationship("FinancialRecord", back_populates="employee")
    insights = relationship("AiInsight", back_populates="employee")
    performance_reviews = relationship("PerformanceReview", back_populates="employee")
    payrolls = relationship("Payroll", back_populates="employee")


