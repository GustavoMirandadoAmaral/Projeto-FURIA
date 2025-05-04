from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import create_db
from app.routers import users, documents, socials, openai_recommendation 

app = FastAPI()

app.include_router(users.router)
app.include_router(documents.router)
app.include_router(socials.router)
app.include_router(openai_recommendation.router) 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db()
