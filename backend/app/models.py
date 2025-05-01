from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    cpf: str
    email: str
    address: Optional[str] = None

    documents: List["Document"] = Relationship(back_populates="user")
    socials: List["SocialProfile"] = Relationship(back_populates="user")


class Document(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    content_type: str
    user_id: int = Field(foreign_key="user.id")

    user: Optional[User] = Relationship(back_populates="documents")


class SocialProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    platform: str  # exemplo: "Instagram", "Twitter"
    url: str
    user_id: int = Field(foreign_key="user.id")

    user: Optional[User] = Relationship(back_populates="socials")
