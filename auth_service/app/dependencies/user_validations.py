from fastapi import HTTPException

from schemas import AuthInfo
from db import get_users_storage


def username_exists(auth_info: AuthInfo):
    '''
    Checks if the indicated username already
    exists, raising an HTTPException if it does.
    '''
    username = auth_info.username
    storage = get_users_storage()
    if storage.user_exists(username):
        raise HTTPException(
            status_code=200,
            detail={'error': f'Username {username} already taken'}
        )
