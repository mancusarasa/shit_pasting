from fastapi import HTTPException

from schemas import (
    UserInfo,
    Credentials
)
from db import get_users_storage
from db.users import (
    UserDoesntExist,
    WrongPassword,
)
from settings import get_settings


def username_exists(user_info: UserInfo):
    '''
    Checks if the indicated username already
    exists, raising an HTTPException if it does.
    '''
    username = user_info.username
    storage = get_users_storage()
    if storage.user_exists(username):
        raise HTTPException(
            status_code=403,
            detail={'error': f'Username {username} already taken'}
        )


def password_is_long_enough(user_info: UserInfo):
    '''
    Checks if the password is long enough
    raising an HTTPException if it doesn't
    '''
    settings = get_settings()
    if len(user_info.password) <= settings.password_min_length:
        raise HTTPException(
            status_code=422,
            detail={'error': f'Password too short'}
        )


def verify_login_info(credentials: Credentials):
    '''
    Checks if the provided user + password
    combination are correct, raising an HTTPException
    if they aren't.
    '''
    settings = get_settings()
    storage = get_users_storage()
    username = credentials.username
    try:
        storage.verify_login(
            credentials.username,
            credentials.password
        )
    except UserDoesntExist:
        raise HTTPException(
            status_code=403,
            detail={'error': f'Username {username} doesn\'t exist'}
        )
    except WrongPassword:
        raise HTTPException(
            status_code=403,
            detail={'error': 'Wrong password'}
        )
