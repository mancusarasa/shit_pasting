from fastapi import HTTPException

from schemas import AuthInfo
from db import get_users_storage
from db.users import (
    UserDoesntExist,
    WrongPassword,
)
from settings import get_settings


def username_exists(auth_info: AuthInfo):
    '''
    Checks if the indicated username already
    exists, raising an HTTPException if it does.
    '''
    username = auth_info.username
    storage = get_users_storage()
    if storage.user_exists(username):
        raise HTTPException(
            status_code=403,
            detail={'error': f'Username {username} already taken'}
        )


def password_is_long_enough(auth_info: AuthInfo):
    '''
    Checks if the password is long enough
    raising an HTTPException if it doesn't
    '''
    settings = get_settings()
    if len(auth_info.password) <= settings.password_min_length:
        raise HTTPException(
            status_code=422,
            detail={'error': f'Password too short'}
        )


def verify_login_info(auth_info: AuthInfo):
    '''
    Checks if the provided user + password
    combination are correct, raising and HTTPException
    if they aren't.
    '''
    settings = get_settings()
    storage = get_users_storage()
    username = auth_info.username
    try:
        storage.verify_login(
            auth_info.username,
            auth_info.password
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
