from sqlalchemy.orm import Session
from typing import Any, Dict, Optional, List
import uuid
from app.models.audit_log import AuditLog, AuditAction

def create_audit_log(
    db: Session,
    entity_type: str,
    entity_id: str,
    action: AuditAction,
    changes: Optional[Dict[str, Any]] = None,
    performed_by: str = "system",
    description: Optional[str] = None
) -> AuditLog:
    """Create an audit log entry."""
    audit = AuditLog(
        id=str(uuid.uuid4()),
        entityType=entity_type,
        entityId=entity_id,
        action=action,
        changes=changes,
        performedBy=performed_by,
        description=description
    )
    db.add(audit)
    db.commit()
    db.refresh(audit)
    return audit

def get_audit_logs_for_entity(
    db: Session, 
    entity_type: str, 
    entity_id: str,
    skip: int = 0,
    limit: int = 50
) -> List[AuditLog]:
    """Get all audit logs for a specific entity."""
    return db.query(AuditLog).filter(
        AuditLog.entityType == entity_type,
        AuditLog.entityId == entity_id
    ).order_by(AuditLog.createdAt.desc()).offset(skip).limit(limit).all()

def get_recent_audit_logs(
    db: Session,
    entity_type: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
) -> List[AuditLog]:
    """Get recent audit logs, optionally filtered by entity type."""
    query = db.query(AuditLog)
    if entity_type:
        query = query.filter(AuditLog.entityType == entity_type)
    return query.order_by(AuditLog.createdAt.desc()).offset(skip).limit(limit).all()

def calculate_changes(old_data: Dict[str, Any], new_data: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    """Calculate the difference between old and new data."""
    changes = {}
    all_keys = set(old_data.keys()) | set(new_data.keys())
    
    for key in all_keys:
        old_val = old_data.get(key)
        new_val = new_data.get(key)
        
        # Convert to string for comparison (handles dates, decimals, etc.)
        old_str = str(old_val) if old_val is not None else None
        new_str = str(new_val) if new_val is not None else None
        
        if old_str != new_str:
            changes[key] = {"old": old_val, "new": new_val}
    
    return changes
