from settings import get_settings
from db.users import UserStorage


def get_users_storage() -> UserStorage:
    '''
    Returns a UserStorage object, created with the
    options present in the app settings.

    :return UserStorage
    '''
    settings = get_settings()
    return UserStorage(
        settings.db_user,
        settings.db_pass,
        settings.db_host,
        settings.db_port
    )
