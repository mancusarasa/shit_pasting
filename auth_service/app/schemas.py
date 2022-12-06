from pydantic import BaseModel


class Credentials(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    jwt: str
