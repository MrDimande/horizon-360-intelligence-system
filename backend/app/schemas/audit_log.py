from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any
from enum import Enum

class AuditAction(str, Enum):
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"

class AuditLogBase(BaseModel):
    entityType: str
    entityId: str
    action: AuditAction
    changes: Optional[Dict[str, Any]] = None
    performedBy: str = "system"
    description: Optional[str] = None

class AuditLogCreate(AuditLogBase):
    pass

class AuditLog(AuditLogBase):
    id: str
    createdAt: datetime

    class Config:
        from_attributes = True
