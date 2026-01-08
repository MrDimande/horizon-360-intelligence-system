from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    department: str
    position: str
    hireDate: datetime
    isActive: bool = True

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    position: Optional[str] = None
    hireDate: Optional[datetime] = None
    isActive: Optional[bool] = None

class Employee(EmployeeBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
