from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

from app.database import get_db
from app.crud.notification import (
    get_user_notifications,
    get_unread_count,
    mark_as_read,
    mark_all_as_read,
    delete_notification
)

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
    responses={404: {"description": "Not found"}},
)

class NotificationType(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    SUCCESS = "SUCCESS"
    ERROR = "ERROR"
    PAYROLL_READY = "PAYROLL_READY"
    REVIEW_DUE = "REVIEW_DUE"
    SYSTEM = "SYSTEM"

class NotificationResponse(BaseModel):
    id: str
    createdAt: datetime
    userId: str
    type: NotificationType
    title: str
    message: str
    isRead: bool
    actionUrl: Optional[str] = None

    class Config:
        from_attributes = True

class UnreadCountResponse(BaseModel):
    count: int

@router.get("/", response_model=List[NotificationResponse])
def list_notifications(
    user_id: str = Query(..., description="User ID to get notifications for"),
    unread_only: bool = False,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get notifications for a user."""
    return get_user_notifications(db, user_id, unread_only=unread_only, skip=skip, limit=limit)

@router.get("/unread-count", response_model=UnreadCountResponse)
def get_notification_count(
    user_id: str = Query(..., description="User ID"),
    db: Session = Depends(get_db)
):
    """Get unread notification count."""
    count = get_unread_count(db, user_id)
    return {"count": count}

@router.put("/{notification_id}/read", response_model=NotificationResponse)
def read_notification(
    notification_id: str,
    db: Session = Depends(get_db)
):
    """Mark a notification as read."""
    notification = mark_as_read(db, notification_id)
    if not notification:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

@router.put("/read-all")
def read_all_notifications(
    user_id: str = Query(..., description="User ID"),
    db: Session = Depends(get_db)
):
    """Mark all notifications as read for a user."""
    count = mark_all_as_read(db, user_id)
    return {"marked_read": count}

@router.delete("/{notification_id}")
def remove_notification(
    notification_id: str,
    db: Session = Depends(get_db)
):
    """Delete a notification."""
    notification = delete_notification(db, notification_id)
    if not notification:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"deleted": True}
