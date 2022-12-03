from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    # private_key_file: str = '/usr/local/bin/private.pem'
    db_user: str
    db_pass: str
    db_host: str
    db_port: str


@lru_cache
def get_settings():
    return Settings()
