from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from decimal import Decimal

class DepartmentBase(BaseModel):
    name: str
    code: str
    description: Optional[str] = None
    parentId: Optional[str] = None
    managerId: Optional[str] = None
    budget: Optional[Decimal] = None
    isActive: bool = True

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    parentId: Optional[str] = None
    managerId: Optional[str] = None
    budget: Optional[Decimal] = None
    isActive: Optional[bool] = None

class DepartmentResponse(DepartmentBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class DepartmentWithChildren(DepartmentResponse):
    children: List["DepartmentWithChildren"] = []

    class Config:
        from_attributes = True
