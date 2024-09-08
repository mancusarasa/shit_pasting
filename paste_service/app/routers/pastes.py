from fastapi import (
    APIRouter,
    Header,
    Depends,
    HTTPException
)

from dependencies.authentication import extract_current_user
from schemas import Paste
from db import get_pastes_storage
from db.pastes import PasteNotFoundException


router = APIRouter()


@router.get(
    '/paste/{paste_id}',
    tags=['pastes'],
    status_code=200
)
def retrieve_paste(paste_id: str):
    storage = get_pastes_storage()
    try:
        return storage.get_paste(paste_id)
    except PasteNotFoundException:
        raise HTTPException(
            status_code=404,
            detail={'error': f'Paste {paste_id} not found'}
        )


@router.get(
    '/my_pastes',
    tags=['my_pastes'],
    status_code=200
)
def retrieve_pastes(user_id: str = Depends(extract_current_user)):
    storage = get_pastes_storage()
    return {
        'pastes': storage.get_pastes(user_id)
    }


@router.post(
    '/my_pastes',
    tags=['my_pastes'],
)
def create_paste(paste: Paste, user_id: str = Depends(extract_current_user)):
    storage = get_pastes_storage()
    paste_id = storage.create_paste(
        paste=paste.paste_text,
        user_id=user_id,
        private=paste.private
    )
    return {'paste_id': paste_id}
