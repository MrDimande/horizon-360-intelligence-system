from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.performance_review import PerformanceReview, PerformanceReviewCreate, PerformanceReviewUpdate
from app.crud import performance_review as crud

router = APIRouter(
    prefix="/performance-reviews",
    tags=["performance-reviews"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=PerformanceReview)
def create_performance_review(review: PerformanceReviewCreate, db: Session = Depends(get_db)):
    """Create a new performance review for an employee."""
    return crud.create_performance_review(db=db, review=review)

@router.get("/", response_model=List[PerformanceReview])
def read_performance_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all performance reviews with pagination."""
    reviews = crud.get_performance_reviews(db, skip=skip, limit=limit)
    return reviews

@router.get("/{review_id}", response_model=PerformanceReview)
def read_performance_review(review_id: str, db: Session = Depends(get_db)):
    """Get a specific performance review by ID."""
    db_review = crud.get_performance_review(db, review_id=review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Performance review not found")
    return db_review

@router.get("/employee/{employee_id}", response_model=List[PerformanceReview])
def read_performance_reviews_by_employee(
    employee_id: str, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all performance reviews for a specific employee."""
    reviews = crud.get_performance_reviews_by_employee(db, employee_id=employee_id, skip=skip, limit=limit)
    return reviews

@router.get("/period/{period}", response_model=List[PerformanceReview])
def read_performance_reviews_by_period(
    period: str, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all performance reviews for a specific period (e.g., Q4-2024)."""
    reviews = crud.get_performance_reviews_by_period(db, period=period, skip=skip, limit=limit)
    return reviews

@router.put("/{review_id}", response_model=PerformanceReview)
def update_performance_review(
    review_id: str, 
    review: PerformanceReviewUpdate, 
    db: Session = Depends(get_db)
):
    """Update a performance review."""
    db_review = crud.update_performance_review(db, review_id=review_id, review=review)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Performance review not found")
    return db_review

@router.delete("/{review_id}", response_model=PerformanceReview)
def delete_performance_review(review_id: str, db: Session = Depends(get_db)):
    """Delete a performance review."""
    db_review = crud.delete_performance_review(db, review_id=review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Performance review not found")
    return db_review
