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


def extract_user_info(auth: HTTPAuthorizationCredentials = Depends(bearer)):
    '''
    Extracts the user info from the JWT contained in the Authorization
    header of a request.
    :param HTTPAuthorizationCredentials: pydantic model containing:
    - scheme (in this context we're only expecting 'bearer')
    - credentials (in this context, a JSon Web Token)
    :return str: value of the Authorization:Bearer header
    '''
    token = auth.credentials
    settings = get_settings()
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            options={'require': ['exp']},
            algorithms=['HS256']
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=403,
            detail={'error': 'Your token has expired'}
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=403,
            detail={'error': 'Invalid token provided'}
        )