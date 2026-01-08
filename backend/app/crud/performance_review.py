from sqlalchemy.orm import Session
from app.models.performance_review import PerformanceReview
from app.schemas.performance_review import PerformanceReviewCreate, PerformanceReviewUpdate
import uuid

def get_performance_review(db: Session, review_id: str):
    return db.query(PerformanceReview).filter(PerformanceReview.id == review_id).first()

def get_performance_reviews(db: Session, skip: int = 0, limit: int = 100):
    return db.query(PerformanceReview).offset(skip).limit(limit).all()

def get_performance_reviews_by_employee(db: Session, employee_id: str, skip: int = 0, limit: int = 100):
    return db.query(PerformanceReview).filter(
        PerformanceReview.employeeId == employee_id
    ).offset(skip).limit(limit).all()

def get_performance_reviews_by_period(db: Session, period: str, skip: int = 0, limit: int = 100):
    return db.query(PerformanceReview).filter(
        PerformanceReview.period == period
    ).offset(skip).limit(limit).all()

def create_performance_review(db: Session, review: PerformanceReviewCreate):
    db_review = PerformanceReview(
        id=str(uuid.uuid4()),
        **review.model_dump()
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def update_performance_review(db: Session, review_id: str, review: PerformanceReviewUpdate):
    db_review = get_performance_review(db, review_id)
    if not db_review:
        return None
    
    update_data = review.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_review, key, value)
    
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def delete_performance_review(db: Session, review_id: str):
    db_review = get_performance_review(db, review_id)
    if db_review:
        db.delete(db_review)
        db.commit()
    return db_review
