from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..models import SocialProfile
from ..db import get_session

router = APIRouter(prefix="/socials", tags=["Social Profiles"])

@router.post("/{user_id}", response_model=SocialProfile)
def add_social_profile(user_id: int, profile: SocialProfile, session: Session = Depends(get_session)):
    profile.user_id = user_id
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile

@router.get("/{user_id}", response_model=list[SocialProfile])
def get_user_socials(user_id: int, session: Session = Depends(get_session)):
    result = session.exec(select(SocialProfile).where(SocialProfile.user_id == user_id)).all()
    return result
