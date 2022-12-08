from fastapi import (
    APIRouter,
    Header,
    Depends
)

from dependencies.authentication import extract_current_user
from schemas import Paste
from db import get_pastes_storage


router = APIRouter()


@router.get(
    '/myPastes',
    tags=['myPastes'],
    status_code=200
)
def retrieve_pastes(user_id: str = Depends(extract_current_user)):
    storage = get_pastes_storage()
    return {
        'pastes': storage.get_pastes(user_id)
    }


@router.post(
    '/myPastes',
    tags=['myPastes'],
)
def create_paste(paste: Paste, user_id: str = Depends(extract_current_user)):
    storage = get_pastes_storage()
    paste_id = storage.create_paste(
        paste=paste.paste_text,
        user_id=user_id,
        private=paste.private
    )
    return {'paste_id': paste_id}
