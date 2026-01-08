from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum

class ReviewStatus(str, Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"

class PerformanceReviewBase(BaseModel):
    employeeId: str
    reviewDate: datetime
    period: str = Field(..., description="e.g., Q4-2024")
    reviewer: str
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    strengths: Optional[str] = None
    improvements: Optional[str] = None
    goals: Optional[str] = None
    status: ReviewStatus = ReviewStatus.DRAFT

class PerformanceReviewCreate(PerformanceReviewBase):
    pass

class PerformanceReviewUpdate(BaseModel):
    reviewDate: Optional[datetime] = None
    period: Optional[str] = None
    reviewer: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    strengths: Optional[str] = None
    improvements: Optional[str] = None
    goals: Optional[str] = None
    status: Optional[ReviewStatus] = None

class PerformanceReview(PerformanceReviewBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
