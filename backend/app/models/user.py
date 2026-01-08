from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashedPassword = Column(String, nullable=False)
    fullName = Column(String, nullable=True)
    
    isActive = Column(Boolean, default=True)
    isSuperuser = Column(Boolean, default=False)
    
    # Optional link to employee
    employeeId = Column(String, ForeignKey("Employee.id"), nullable=True)
    employee = relationship("Employee")
    
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now())
