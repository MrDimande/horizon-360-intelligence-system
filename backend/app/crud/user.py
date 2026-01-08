from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash
import uuid

def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        id=str(uuid.uuid4()),
        email=user.email,
        hashedPassword=hashed_password,
        fullName=user.fullName,
        isActive=user.isActive,
        isSuperuser=user.isSuperuser,
        employeeId=user.employeeId
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
