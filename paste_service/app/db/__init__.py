from settings import get_settings
from db.pastes import PastesStorage


def get_pastes_storage() -> PastesStorage:
    '''
    Returns a PastesStorage object, created with the
    options present in the app settings.

    :return PastesStorage
    '''
    settings = get_settings()
    return PastesStorage(
        settings.db_user,
        settings.db_pass,
        settings.db_host,
        settings.db_port
    )
