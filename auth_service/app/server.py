from fastapi import FastAPI

from config import get_settings
from schemas import AuthInfo
from user_storage import storage


app = FastAPI()
users = {}

@app.get('/register')
def register(auth_info: AuthInfo):
    settings = get_settings()
    storage.create_user(
        auth_info.username,
        auth_info.password
    )
    return {
        'username': auth_info.username,
        'password': auth_info.password,
    }

@app.post('/login')
def login(auth_info: AuthInfo):
    settings = get_settings()
    return {}
