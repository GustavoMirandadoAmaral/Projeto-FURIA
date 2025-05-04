from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
import re
from pydantic import validator

# Modelo de Usuário
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  # id como chave primária
    name: str  # Nome do usuário
    cpf: str  # CPF do usuário
    email: str  # E-mail do usuário
    address: Optional[str] = None  # Endereço opcional

    # Relacionamento com documentos e perfis sociais
    documents: List["Document"] = Relationship(back_populates="user")
    socials: List["SocialProfile"] = Relationship(back_populates="user")

    @validator("cpf")
    def validate_cpf(cls, v):
        # Validação simples de CPF usando regex
        if not re.match(r"\d{3}\.\d{3}\.\d{3}-\d{2}", v):
            raise ValueError("CPF inválido")
        return v

    @validator("email")
    def validate_email(cls, v):
        # Validação simples de e-mail
        if "@" not in v:
            raise ValueError("E-mail inválido")
        return v

# Modelo de Documento
class Document(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  # id como chave primária
    filename: str  # Nome do arquivo
    content_type: str  # Tipo de conteúdo (mime type) do arquivo
    user_id: int = Field(foreign_key="user.id")  # Chave estrangeira para a tabela User

    # Relacionamento reverso com o modelo User
    user: Optional[User] = Relationship(back_populates="documents")

# Modelo de Perfil Social
class SocialProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)  # id como chave primária
    platform: str  # Plataforma do perfil social (ex: "Instagram", "Twitter")
    url: str  # URL do perfil social
    user_id: int = Field(foreign_key="user.id")  # Chave estrangeira para a tabela User

    # Relacionamento reverso com o modelo User
    user: Optional[User] = Relationship(back_populates="socials")
