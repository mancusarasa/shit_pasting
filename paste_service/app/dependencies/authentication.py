import jwt
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
    settings = get_settings()
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            options={'require': ['exp']},
            algorithms=['HS256']
        )
        return str(payload['user_id'])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=403,
            detail={'error': f'Your token has expired'}
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=403,
            detail={'error': f'Invalid token provided'}
        )
