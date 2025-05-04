from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Know Your Fan"
    database_url: str = "sqlite:///./test.db"

    youtube_client_id: str
    youtube_client_secret: str
    youtube_redirect_uri: str

    twitch_client_id: str = "okhimocfoclmxh546btjo2x6fa5yxe"
    twitch_client_secret: str = "6lbjnh5r5yv3kag4c4k2l237z2x3p6"
    twitch_redirect_uri: str = "http://localhost:8000/twitch/callback"

    azure_form_recognizer_endpoint: str
    azure_form_recognizer_key: str

    class Config:
        env_file = ".env"

settings = Settings()
