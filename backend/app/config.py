from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Know Your Fan"
    database_url: str = "sqlite:///./test.db"

    # Azure Form Recognizer
    azure_form_recognizer_endpoint: str
    azure_form_recognizer_key: str

    # OpenAI oficial
    openai_api_key: str

    class Config:
        env_file = ".env"
        validate_assignment = True  # substitui `allow_population_by_field_name` no Pydantic v2

settings = Settings()
