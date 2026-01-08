import enum
from sqlalchemy import Column, String, DateTime, Text, Enum, func
from sqlalchemy.dialects.postgresql import JSONB
from app.database import Base

class AuditAction(str, enum.Enum):
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"

class AuditLog(Base):
    __tablename__ = "AuditLog"

    id = Column(String, primary_key=True)
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    
    entityType = Column(String, nullable=False, index=True)  # "EMPLOYEE", "PAYROLL", etc.
    entityId = Column(String, nullable=False, index=True)
    action = Column(Enum(AuditAction), nullable=False)
    
    # JSON with changes: {"field": {"old": value, "new": value}}
    changes = Column(JSONB, nullable=True)
    
    # Who made the change (user email or system)
    performedBy = Column(String, nullable=False, default="system")
    
    # Optional description
    description = Column(Text, nullable=True)
