# app/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str = "local"
    DATABASE_URL: str
    REDIS_HOST: str | None = None
    REDIS_PORT: int | None = 6379
    ROOT_PATH: str = "/common"

    EMAIL_HOST: str | None = None
    EMAIL_PORT: int | None = None
    EMAIL_HOST_USER: str | None = None
    EMAIL_HOST_PASSWORD: str | None = None
    EMAIL_USE_TLS: bool = False
    EMAIL_USE_SSL: bool = True
    EMAIL_FROM_NAME: str | None = None

    class Config:
        env_file = ".env"  # default, can override with uvicorn --env-file

settings = Settings()
