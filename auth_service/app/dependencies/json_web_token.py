from datetime import (
    timezone,
    datetime,
    timedelta
)

import jwt

from settings import get_settings


def create_jwt(user_id) -> str:
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
        'exp': expiration_date,
    }
    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm='HS256'
    )


def extract_jwt_payload(json_web_token: str) -> dict:
    '''
    Extracts the payload from the provided JWT.
    Returns a dict object containing the authentication
    info of the user the JWT belongs to.

    :param json_web_token: str web token.
    :return dict object.
    '''
    settings = get_settings()
    try:
        return jwt.decode(
            json_web_token,
            settings.jwt_secret,
            options={'require': ['exp']},
            algorithms=['HS256']
        )
    except jwt.ExpiredSignatureError:
        raise ExpiredToken()


class ExpiredToken(Exception):
    pass
