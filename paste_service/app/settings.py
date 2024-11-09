
from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    paste_expiration: int
    auth_service_host: str
    auth_service_port: str
    mysql_user: str
    mysql_password: str
    mysql_host: str
    mysql_port: str
    mysql_database: str

    @property
    def auth_service_url(self) -> str:
        return f'http://{self.auth_service_host}:{self.auth_service_port}'

@lru_cache
def get_settings():
    return Settings()
