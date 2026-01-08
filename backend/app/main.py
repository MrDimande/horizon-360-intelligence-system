from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base

from .routers import employee_router, financial_record_router, performance_review_router, payroll_router, audit_log_router, department_router, notification_router, auth_router

# Criar tabelas
Base.metadata.create_all(bind=engine)

# Inicializar app
app = FastAPI(
    title="Horizon 360° API",
    description="API para gestão integrada de RH e Finanças com IA",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
async def root():
    return {
        "message": "Horizon 360° API",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

app.include_router(employee_router)
app.include_router(financial_record_router)
app.include_router(performance_review_router)
app.include_router(payroll_router)
app.include_router(audit_log_router)
app.include_router(department_router)
app.include_router(notification_router)
app.include_router(auth_router)


