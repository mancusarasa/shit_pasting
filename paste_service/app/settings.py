from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_user: str
    db_pass: str
    db_host: str
    db_port: str
    jwt_secret: str
    paste_expiration: int

@lru_cache
def get_settings():
    return Settings()
