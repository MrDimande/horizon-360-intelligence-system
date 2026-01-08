from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.department import DepartmentCreate, DepartmentUpdate, DepartmentResponse
from app.crud import department as crud

router = APIRouter(
    prefix="/departments",
    tags=["departments"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[DepartmentResponse])
def list_departments(skip: int = 0, limit: int = 100, active_only: bool = False, db: Session = Depends(get_db)):
    """List all departments."""
    return crud.get_departments(db, skip=skip, limit=limit, active_only=active_only)

@router.get("/tree", response_model=List[DepartmentResponse])
def get_department_tree(db: Session = Depends(get_db)):
    """Get root departments (for building tree structure)."""
    return crud.get_root_departments(db)

@router.get("/{department_id}", response_model=DepartmentResponse)
def get_department(department_id: str, db: Session = Depends(get_db)):
    """Get a specific department."""
    dept = crud.get_department(db, department_id)
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    return dept

@router.post("/", response_model=DepartmentResponse)
def create_department(department: DepartmentCreate, db: Session = Depends(get_db)):
    """Create a new department."""
    existing = crud.get_department_by_code(db, department.code)
    if existing:
        raise HTTPException(status_code=400, detail="Department code already exists")
    return crud.create_department(db, department)

@router.put("/{department_id}", response_model=DepartmentResponse)
def update_department(department_id: str, department: DepartmentUpdate, db: Session = Depends(get_db)):
    """Update a department."""
    updated = crud.update_department(db, department_id, department)
    if not updated:
        raise HTTPException(status_code=404, detail="Department not found")
    return updated

@router.delete("/{department_id}", response_model=DepartmentResponse)
def delete_department(department_id: str, db: Session = Depends(get_db)):
    """Delete a department."""
    deleted = crud.delete_department(db, department_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Department not found")
    return deleted
