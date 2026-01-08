import enum
from sqlalchemy import Column, String, DateTime, Boolean, Text, Enum, func
from app.database import Base

class NotificationType(str, enum.Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    SUCCESS = "SUCCESS"
    ERROR = "ERROR"
    PAYROLL_READY = "PAYROLL_READY"
    REVIEW_DUE = "REVIEW_DUE"
    SYSTEM = "SYSTEM"

class Notification(Base):
    __tablename__ = "Notification"

    id = Column(String, primary_key=True)
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    
    userId = Column(String, nullable=False, index=True)  # Target user
    
    type = Column(Enum(NotificationType), nullable=False, default=NotificationType.INFO) 
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    
    isRead = Column(Boolean, default=False, nullable=False)
    
    # Optional action URL
    actionUrl = Column(String, nullable=True)
    
    # Optional metadata
    meta_data = Column(String, nullable=True)  # JSON string for extra data
