from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Know Your Fan"
    database_url: str = "sqlite:///./test.db"  # Para produção, substitua por PostgreSQL

    class Config:
        env_file = ".env"

settings = Settings()
