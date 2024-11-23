from typing import Dict
from fastapi import (
    APIRouter,
    Response,
    Depends,
    BackgroundTasks
)

from schemas import (
    UserInfo,
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
from amqp.connection import Connection

from json import dumps


def queue_email_send(email_content: str) -> None:
    connection = Connection()
    connection.send_message(email_content)


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
def register(
    user_info: UserInfo,
    response: Response,
    background_tasks: BackgroundTasks
):
    storage = get_users_storage()
    user = storage.register_user(
        user_info.username,
        user_info.password
    )
    background_tasks.add_task(
        queue_email_send,
        email_content=dumps({
            'username': user_info.username
        })
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
    auth_token = create_jwt(
        user['id'],
        credentials.username,
        credentials.remember_me
    )
    return {
        'auth_token': auth_token
    }


@router.get(
    '/userinfo',
    tags=['retrieve user info'],
    status_code=200,
)
def get_user_info(user_info: Dict = Depends(extract_user_info)):
    return dict(user_info)
