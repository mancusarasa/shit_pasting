from pydantic import BaseModel


class UserInfo(BaseModel):
    username: str
    password: str


class Credentials(BaseModel):
    username: str
    password: str
    remember_me: bool


class Token(BaseModel):
    jwt: str
