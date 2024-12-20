from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_user: str
    db_pass: str
    db_host: str
    db_port: str
    password_min_length: int
    salt_rounds: int
    token_expiration: int
    jwt_secret: str
    rabbit_mq_user: str
    rabbit_mq_pass: str
    rabbit_mq_host: str
    rabbit_mq_port: int


@lru_cache
def get_settings():
    return Settings()
