import enum
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, Enum, Text, func
from sqlalchemy.orm import relationship
from app.database import Base

class ReviewStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"

class PerformanceReview(Base):
    __tablename__ = "PerformanceReview"

    id = Column(String, primary_key=True)
    createdAt = Column(DateTime, default=func.now(), nullable=False)
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    employeeId = Column(String, ForeignKey("Employee.id"), nullable=False, index=True)
    reviewDate = Column(DateTime, nullable=False)
    period = Column(String, nullable=False, index=True)  # e.g., "Q4-2024"
    reviewer = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5 scale
    strengths = Column(Text, nullable=True)
    improvements = Column(Text, nullable=True)
    goals = Column(Text, nullable=True)
    status = Column(Enum(ReviewStatus), default=ReviewStatus.DRAFT, nullable=False)

    # Relationships
    employee = relationship("Employee", back_populates="performance_reviews")
