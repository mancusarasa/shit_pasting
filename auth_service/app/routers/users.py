from fastapi import APIRouter, Response, Depends

from schemas import AuthInfo
from dependencies.user_validations import username_exists
from db import get_users_storage
from db.users import UserAlreadyExists

router = APIRouter()


@router.post(
    '/register',
    tags=['register'],
    status_code=201,
    dependencies=[Depends(username_exists)]
)
def register(auth_info: AuthInfo, response: Response):
    storage = get_users_storage()
    storage.register_user(
        auth_info.username,
        auth_info.password
    )
    return {'username': auth_info.username}


@router.post('/login', tags=['login'])
def login(auth_info: AuthInfo):
    return {}
