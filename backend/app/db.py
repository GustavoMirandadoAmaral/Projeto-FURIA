from sqlmodel import SQLModel, create_engine, Session
from .config import settings

# Criar a engine do banco de dados
engine = create_engine(settings.database_url, echo=True)

def create_db():
    """
    Cria as tabelas no banco de dados, caso não existam.
    """
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    Cria e retorna uma sessão do banco de dados.
    """
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()
