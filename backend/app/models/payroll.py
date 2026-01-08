import enum
from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Enum, func, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class PayrollStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PROCESSED = "PROCESSED"
    PAID = "PAID"

class PayrollItemType(str, enum.Enum):
    SALARY = "SALARY"
    BONUS = "BONUS"
    ALLOWANCE = "ALLOWANCE"
    DEDUCTION = "DEDUCTION"
    TAX = "TAX"

class Payroll(Base):
    __tablename__ = "Payroll"

    id = Column(String, primary_key=True)
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    employeeId = Column(String, ForeignKey("Employee.id"), nullable=False, index=True)
    period = Column(String, nullable=False, index=True)  # e.g., "2024-10"
    grossSalary = Column(Numeric(14, 2), nullable=False)
    netSalary = Column(Numeric(14, 2), nullable=False)
    totalDeductions = Column(Numeric(14, 2), nullable=False)
    status = Column(Enum(PayrollStatus), default=PayrollStatus.DRAFT, nullable=False)

    # Relationships
    employee = relationship("Employee", back_populates="payrolls")
    items = relationship("PayrollItem", back_populates="payroll", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint('employeeId', 'period', name='_payroll_employee_period_uc'),
    )

class PayrollItem(Base):
    __tablename__ = "PayrollItem"

    id = Column(String, primary_key=True)
    payrollId = Column(String, ForeignKey("Payroll.id", ondelete="CASCADE"), nullable=False)
    
    type = Column(Enum(PayrollItemType), nullable=False)
    description = Column(String, nullable=False)
    amount = Column(Numeric(14, 2), nullable=False)

    # Relationships
    payroll = relationship("Payroll", back_populates="items")
