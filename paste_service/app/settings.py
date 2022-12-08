from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    db_user: str
    db_pass: str
    db_host: str
    db_port: str
    jwt_secret: str = 'secret'


@lru_cache
def get_settings():
    return Settings()
