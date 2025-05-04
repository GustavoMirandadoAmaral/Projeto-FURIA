from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
import re
from pydantic import validator

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  
    name: str  
    cpf: str  
    email: str  
    address: Optional[str] = None  

    documents: List["Document"] = Relationship(back_populates="user")
    socials: List["SocialProfile"] = Relationship(back_populates="user")

    @validator("cpf")
    def validate_cpf(cls, v):
        if not re.match(r"\d{3}\.\d{3}\.\d{3}-\d{2}", v):
            raise ValueError("CPF inválido")
        return v

    @validator("email")
    def validate_email(cls, v):
        if "@" not in v:
            raise ValueError("E-mail inválido")
        return v

class Document(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  
    filename: str  
    content_type: str   
    user_id: int = Field(foreign_key="user.id")  

    user: Optional[User] = Relationship(back_populates="documents")

class SocialProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  
    platform: str  
    url: str  
    user_id: int = Field(foreign_key="user.id") 

    user: Optional[User] = Relationship(back_populates="socials")
