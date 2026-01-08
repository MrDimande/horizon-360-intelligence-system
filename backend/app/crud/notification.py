from sqlalchemy.orm import Session
from app.models.notification import Notification, NotificationType
from typing import List, Optional
import uuid

def create_notification(
    db: Session,
    user_id: str,
    title: str,
    message: str,
    notification_type: NotificationType = NotificationType.INFO,
    action_url: Optional[str] = None,
    metadata: Optional[str] = None
) -> Notification:
    """Create a new notification."""
    notification = Notification(
        id=str(uuid.uuid4()),
        userId=user_id,
        type=notification_type,
        title=title,
        message=message,
        actionUrl=action_url,
        metadata=metadata
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def get_user_notifications(
    db: Session,
    user_id: str,
    unread_only: bool = False,
    skip: int = 0,
    limit: int = 50
) -> List[Notification]:
    """Get notifications for a user."""
    query = db.query(Notification).filter(Notification.userId == user_id)
    if unread_only:
        query = query.filter(Notification.isRead == False)
    return query.order_by(Notification.createdAt.desc()).offset(skip).limit(limit).all()

def get_unread_count(db: Session, user_id: str) -> int:
    """Get count of unread notifications for a user."""
    return db.query(Notification).filter(
        Notification.userId == user_id,
        Notification.isRead == False
    ).count()

def mark_as_read(db: Session, notification_id: str) -> Optional[Notification]:
    """Mark a notification as read."""
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if notification:
        notification.isRead = True
        db.commit()
        db.refresh(notification)
    return notification

def mark_all_as_read(db: Session, user_id: str) -> int:
    """Mark all notifications for a user as read. Returns count of affected."""
    count = db.query(Notification).filter(
        Notification.userId == user_id,
        Notification.isRead == False
    ).update({"isRead": True})
    db.commit()
    return count

def delete_notification(db: Session, notification_id: str) -> Optional[Notification]:
    """Delete a notification."""
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if notification:
        db.delete(notification)
        db.commit()
    return notification
