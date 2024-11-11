from datetime import (
    timezone,
    datetime,
    timedelta
)

import jwt

from settings import get_settings


def create_jwt(
    user_id: int,
    username: str,
    remember_me: bool
) -> str:
    '''
    Creates a JWT (JSON web token), encrypting the username
    as part of the payload.
    Returns the str representing the JWT.

    :param user_id: int representing the user the token belongs to.
    :param username: str representing the username
    :param remember_me: bool representing if the token should
    expire or not.
    :return str: JWT for authentication purposes.
    '''
    settings = get_settings()
    delta = settings.token_expiration
    payload = {
        'user_id': str(user_id),
        'username': username
    }
    if not remember_me:
        expiration_date = datetime.now(timezone.utc) + timedelta(minutes=delta)
        payload['exp'] = expiration_date

    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm='HS256'
    )

