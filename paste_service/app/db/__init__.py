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
        settings.mysql_user,
        settings.mysql_password,
        settings.mysql_host,
        settings.mysql_port,
        settings.mysql_database
    )

