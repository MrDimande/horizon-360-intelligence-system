from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.core.security import get_password_hash

# Ensure tables exist (in case backend crashed before creating them)
# Explicitly import models to register them
import app.models.user
import app.models.employee
Base.metadata.create_all(bind=engine)
# Hopefully User table was created or exists. If not, we might need to fix models first.

def create_admin():
    db = SessionLocal()
    try:
        email = "admin@horizon360.com"
        password = "admin"
        
        # Check if user exists
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"User {email} already exists.")
            # Update password just in case
            user.hashedPassword = get_password_hash(password)
            user.isActive = True
            db.commit()
            print("Password updated.")
            return

        new_user = User(
            id=email, # Using email as ID for simplicity as per auth logic
            email=email,
            hashedPassword=get_password_hash(password),
            fullName="Admin User",
            isActive=True,
            isSuperuser=True
        )
        db.add(new_user)
        db.commit()
        print(f"Successfully created user: {email}")
    except Exception as e:
        print(f"Error creating user: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
