from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import User
from ..db import get_session

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=User)
def create_user(user: User, session: Session = Depends(get_session)):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.get("/", response_model=list[User])
def list_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users
