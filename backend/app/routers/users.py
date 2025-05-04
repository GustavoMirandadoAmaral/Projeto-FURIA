from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from ..models import User
from ..db import get_session
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=User)
def create_user(user: User, session: Session = Depends(get_session)):
    # Verifica se o e-mail já existe
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="E-mail já está em uso.")
    
    session.add(user)
    try:
        session.commit()
        session.refresh(user)
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=500, detail="Erro ao salvar o usuário")
    return user

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.get("/", response_model=list[User])
def list_users(skip: int = Query(0, ge=0), limit: int = Query(10, le=100), session: Session = Depends(get_session)):
    users = session.exec(select(User).offset(skip).limit(limit)).all()
    return users
