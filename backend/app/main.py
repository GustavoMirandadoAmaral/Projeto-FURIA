from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import create_db
from app.routers import users, documents, socials, openai_recommendation  # Inclui o novo módulo

app = FastAPI()

# Incluir os roteadores existentes
app.include_router(users.router)
app.include_router(documents.router)
app.include_router(socials.router)
app.include_router(openai_recommendation.router)  # Roteador da IA

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Evento de inicialização
@app.on_event("startup")
def on_startup():
    create_db()
