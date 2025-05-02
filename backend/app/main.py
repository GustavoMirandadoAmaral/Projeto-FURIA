from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import create_db
from app.routers import users, documents, socials

from routers import twitch_auth

app = FastAPI()

app.include_router(twitch_auth.router)

# CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # ajuste conforme necessário
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas do banco ao iniciar o app
@app.on_event("startup")
def on_startup():
    create_db()

# Registra as rotas da aplicação
app.include_router(users.router)
app.include_router(documents.router)
app.include_router(socials.router)
