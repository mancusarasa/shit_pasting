from fastapi import (
    APIRouter,
    Header,
    Depends
)

from dependencies.authentication import extract_current_user


router = APIRouter()


@router.get(
    '/myPastes',
    tags=['myPastes'],
    status_code=200
)
def retrieve_pastes(user_id: str = Depends(extract_current_user)):
    return {
        'pastes': []
    }


@router.post(
    '/myPastes',
    tags=['myPastes'],
)
def create_paste():
    pass
