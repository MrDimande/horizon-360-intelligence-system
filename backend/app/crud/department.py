from sqlalchemy.orm import Session
from app.models.department import Department
from app.schemas.department import DepartmentCreate, DepartmentUpdate
import uuid

def get_department(db: Session, department_id: str):
    return db.query(Department).filter(Department.id == department_id).first()

def get_department_by_code(db: Session, code: str):
    return db.query(Department).filter(Department.code == code).first()

def get_departments(db: Session, skip: int = 0, limit: int = 100, active_only: bool = False):
    query = db.query(Department)
    if active_only:
        query = query.filter(Department.isActive == True)
    return query.offset(skip).limit(limit).all()

def get_root_departments(db: Session):
    """Get departments without a parent (top-level)."""
    return db.query(Department).filter(
        Department.parentId == None,
        Department.isActive == True
    ).all()

def create_department(db: Session, department: DepartmentCreate):
    db_department = Department(
        id=str(uuid.uuid4()),
        **department.model_dump()
    )
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

def update_department(db: Session, department_id: str, department: DepartmentUpdate):
    db_department = get_department(db, department_id)
    if not db_department:
        return None
    
    update_data = department.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_department, key, value)
    
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

def delete_department(db: Session, department_id: str):
    db_department = get_department(db, department_id)
    if db_department:
        db.delete(db_department)
        db.commit()
    return db_department
