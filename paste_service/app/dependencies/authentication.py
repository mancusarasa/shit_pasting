import requests
from fastapi import (
    Depends,
    HTTPException
)
from fastapi.security.http import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from settings import get_settings


bearer = HTTPBearer()


def extract_jwt(auth: HTTPAuthorizationCredentials = Depends(bearer)):
    '''
    Extracts the JWT from the provided Authorization header
    of a request to an endpoint that requires authentication.

    :param HTTPAuthorizationCredentials: pydantic model containing:
    - scheme (in this context we're only expecting 'bearer')
    - credentials (in this context, a JSon Web Token)
    :return str: value of the Authorization:Bearer header
    '''
    return auth.credentials


def extract_current_user(token: str = Depends(extract_jwt)):
    '''
    Extracts the user_id from the provided jwt
    token.

    :param token: str representing a JWT.
    :return str: user_id as a string.
    '''
    headers = {
        'Authorization': f'Bearer {token}',
    }
    settings = get_settings()
    response = requests.get(
        f'{settings.auth_service_url}/userinfo',
        headers=headers
    )
    response.raise_for_status()
    return response.json()['username']
