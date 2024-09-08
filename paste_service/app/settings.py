from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_user: str
    db_pass: str
    db_host: str
    db_port: str
    paste_expiration: int
    auth_service_host: str
    auth_service_port: str

    @property
    def auth_service_url(self) -> str:
        return f'http://{self.auth_service_host}:{self.auth_service_port}'

@lru_cache
def get_settings():
    return Settings()
