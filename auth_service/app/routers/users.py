from typing import Dict
from fastapi import APIRouter, Response, Depends

from schemas import (
    Credentials,
    Token,
)
from dependencies.user_validations import (
    username_exists,
    password_is_long_enough,
    verify_login_info,
)
from dependencies.json_web_token import create_jwt
from dependencies.user_info import extract_user_info
from db import get_users_storage
from db.users import UserAlreadyExists

router = APIRouter()


@router.post(
    '/register',
    tags=['register'],
    status_code=201,
    dependencies=[
        Depends(username_exists),
        Depends(password_is_long_enough),
    ]
)
def register(credentials: Credentials, response: Response):
    storage = get_users_storage()
    user = storage.register_user(
        credentials.username,
        credentials.password
    )
    return user


@router.post(
    '/login',
    tags=['login'],
    status_code=200,
    dependencies=[
        Depends(verify_login_info)
    ]
)
def login(credentials: Credentials):
    storage = get_users_storage()
    user = storage.get_user(credentials.username)
    return {
        'auth_token': create_jwt(user['id'], credentials.username)
    }


@router.get(
    '/userinfo',
    tags=['retrieve user info'],
    status_code=200,
)
def get_user_info(user_info: Dict = Depends(extract_user_info)):
    return dict(user_info)
