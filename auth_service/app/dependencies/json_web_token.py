from datetime import (
    timezone,
    datetime,
    timedelta
)

import jwt

from settings import get_settings


def create_jwt(user_id: int, username: str) -> str:
    '''
    Creates a JWT (JSON web token), encrypting the username
    as part of the payload.
    Returns the str representing the JWT.

    :param user_id: int representing the user the token belongs to.
    :return str: JWT for authentication purposes.
    '''
    settings = get_settings()
    delta = settings.token_expiration
    expiration_date = datetime.now(timezone.utc) + timedelta(minutes=delta)
    payload = {
        'user_id': str(user_id),
        'username': username,
        'exp': expiration_date,
    }
    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm='HS256'
    )

