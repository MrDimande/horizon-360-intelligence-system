from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base

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

# Importar rotas (adicionar depois)
# from .routes import hr, finance, ai_chat
# app.include_router(hr.router, prefix="/api/hr", tags=["RH"])
# app.include_router(finance.router, prefix="/api/finance", tags=["Finanças"])
# app.include_router(ai_chat.router, prefix="/api/chat", tags=["IA Chat"])
