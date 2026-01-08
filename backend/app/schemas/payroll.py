from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from decimal import Decimal
from enum import Enum

class PayrollStatus(str, Enum):
    DRAFT = "DRAFT"
    PROCESSED = "PROCESSED"
    PAID = "PAID"

class PayrollItemType(str, Enum):
    SALARY = "SALARY"
    BONUS = "BONUS"
    ALLOWANCE = "ALLOWANCE"
    DEDUCTION = "DEDUCTION"
    TAX = "TAX"

# PayrollItem Schemas
class PayrollItemBase(BaseModel):
    type: PayrollItemType
    description: str
    amount: Decimal

class PayrollItemCreate(PayrollItemBase):
    pass

class PayrollItem(PayrollItemBase):
    id: str

    class Config:
        from_attributes = True

# Payroll Schemas
class PayrollBase(BaseModel):
    employeeId: str
    period: str = Field(..., description="Period in format YYYY-MM, e.g., 2024-10")
    grossSalary: Decimal
    netSalary: Decimal
    totalDeductions: Decimal
    status: PayrollStatus = PayrollStatus.DRAFT

class PayrollCreate(BaseModel):
    employeeId: str
    period: str
    items: List[PayrollItemCreate] = []

class PayrollUpdate(BaseModel):
    status: Optional[PayrollStatus] = None

class PayrollSummary(BaseModel):
    id: str
    employeeId: str
    period: str
    grossSalary: Decimal
    netSalary: Decimal
    totalDeductions: Decimal
    status: PayrollStatus
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class Payroll(PayrollSummary):
    items: List[PayrollItem] = []

    class Config:
        from_attributes = True

# Generate Payroll Request
class GeneratePayrollRequest(BaseModel):
    period: str = Field(..., description="Period in format YYYY-MM")
    employee_ids: Optional[List[str]] = None  # If None, generate for all active employees
