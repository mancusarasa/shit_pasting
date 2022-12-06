from pydantic import BaseModel


class AuthInfo(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    jwt: str
