from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.core import security, deps
from app.crud import user as crud_user
from app.schemas.user import Token, UserResponse, UserCreate

router = APIRouter(tags=["authentication"])

@router.post("/auth/token", response_model=Token)
def login_access_token(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """OAuth2 compatible token login, get an access token for future requests."""
    user = crud_user.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashedPassword):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    if not user.isActive:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.post("/auth/register", response_model=UserResponse)
def register_user(
    user_in: UserCreate,
    db: Session = Depends(get_db),
    # current_user = Depends(deps.get_current_active_user) # Uncomment to protect registration
):
    """Register a new user."""
    user = crud_user.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = crud_user.create_user(db, user_in)
    return user

@router.get("/auth/me", response_model=UserResponse)
def read_users_me(current_user = Depends(deps.get_current_active_user)):
    """Get current user."""
    return current_user
