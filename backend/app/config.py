from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Know Your Fan"
    database_url: str = "sqlite:///./test.db"

    youtube_client_id: str
    youtube_client_secret: str
    youtube_redirect_uri: str

    twitch_client_id: str
    twitch_client_secret: str
    twitch_redirect_uri: str

    azure_form_recognizer_endpoint: str
    azure_form_recognizer_key: str

    class Config:
        env_file = ".env"

settings = Settings()
