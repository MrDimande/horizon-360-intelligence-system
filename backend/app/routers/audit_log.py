from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.schemas.audit_log import AuditLog
from app.crud.audit_log import get_audit_logs_for_entity, get_recent_audit_logs

router = APIRouter(
    prefix="/audit",
    tags=["audit"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[AuditLog])
def list_audit_logs(
    entity_type: Optional[str] = Query(None, description="Filter by entity type"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List recent audit logs with optional filtering."""
    return get_recent_audit_logs(db, entity_type=entity_type, skip=skip, limit=limit)

@router.get("/{entity_type}/{entity_id}", response_model=List[AuditLog])
def get_entity_history(
    entity_type: str,
    entity_id: str,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get audit history for a specific entity."""
    return get_audit_logs_for_entity(db, entity_type, entity_id, skip=skip, limit=limit)
