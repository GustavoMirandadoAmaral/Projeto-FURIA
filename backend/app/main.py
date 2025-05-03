from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import create_db
from app.routers import users, documents, socials, twitch_auth, youtube_auth

app = FastAPI()

# Incluir os roteadores
app.include_router(users.router)
app.include_router(documents.router)
app.include_router(socials.router)
app.include_router(twitch_auth.router)
app.include_router(youtube_auth.router)

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
