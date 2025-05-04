from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import SocialProfile, User
from ..db import get_session

router = APIRouter(prefix="/socials", tags=["Social Profiles"])

@router.post("/{user_id}", response_model=SocialProfile, summary="Adicionar perfil social de um usuário")
def add_social_profile(user_id: int, profile: SocialProfile, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    try:
        profile.user_id = user_id
        session.add(profile)
        session.commit()
        session.refresh(profile)
        return profile
    except Exception as e:
        session.rollback() 
        raise HTTPException(status_code=400, detail="Erro ao salvar perfil social")

@router.get("/{user_id}", response_model=list[SocialProfile])
def get_user_socials(user_id: int, session: Session = Depends(get_session)):
    """
    Recupera todos os perfis sociais vinculados a um usuário.

    - **user_id**: ID do usuário cujos perfis sociais serão recuperados.
    """
    result = session.exec(select(SocialProfile).where(SocialProfile.user_id == user_id)).all()
    return result if result else []  
