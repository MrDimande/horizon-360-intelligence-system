import enum
from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Numeric, func
from sqlalchemy.orm import relationship
from app.database import Base

class Department(Base):
    __tablename__ = "Department"

    id = Column(String, primary_key=True)
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    name = Column(String, nullable=False)
    code = Column(String, unique=True, nullable=False, index=True)
    description = Column(String, nullable=True)
    
    # Hierarchy
    parentId = Column(String, ForeignKey("Department.id"), nullable=True)
    
    # Manager (optional reference to employee)
    managerId = Column(String, nullable=True)
    
    # Budget
    budget = Column(Numeric(14, 2), nullable=True)
    
    isActive = Column(Boolean, default=True, nullable=False)

    # Self-referential relationship for hierarchy
    parent = relationship("Department", remote_side=[id], backref="children")
