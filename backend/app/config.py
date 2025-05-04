from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    app_name: str = "Know Your Fan"
    database_url: str = "sqlite:///./test.db"

    youtube_client_id: str
    youtube_client_secret: str
    youtube_redirect_uri: str

    twitch_client_id: str = Field(..., alias="TWITCH_CLIENT_ID")
    twitch_client_secret: str = Field(..., alias="TWITCH_CLIENT_SECRET")
    twitch_redirect_uri: str = Field(..., alias="TWITCH_REDIRECT_URI")

    azure_form_recognizer_endpoint: str
    azure_form_recognizer_key: str

    class Config:
        env_file = ".env"
        allow_population_by_field_name = True

settings = Settings()
