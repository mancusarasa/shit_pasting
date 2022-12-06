from fastapi import APIRouter, Response, Depends

from schemas import (
    AuthInfo,
    Token,
)
from dependencies.user_validations import (
    username_exists,
    password_is_long_enough,
    verify_login_info,
)
from dependencies.json_web_token import (
    create_jwt,
    extract_jwt_payload,
    ExpiredToken,
)
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
def register(auth_info: AuthInfo, response: Response):
    storage = get_users_storage()
    storage.register_user(
        auth_info.username,
        auth_info.password
    )
    return {'username': auth_info.username}


@router.post(
    '/login',
    tags=['login'],
    status_code=200,
    dependencies=[
        Depends(verify_login_info)
    ]
)
def login(auth_info: AuthInfo):
    storage = get_users_storage()
    user = storage.get_user(auth_info.username)
    return {'auth_token': create_jwt(user['id'])}


@router.get(
    '/auth_info',
    tags=['login'],
    status_code=200,
)
def get_auth_info(token: Token):
    payload = extract_jwt_payload(token.jwt)
    return {'user_id': payload['user_id']}
