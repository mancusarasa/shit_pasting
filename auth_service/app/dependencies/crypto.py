import bcrypt

from settings import get_settings


def get_hashed_password(password: str) -> str:
    '''
    Creates a hash + salt for the given password.
    Returns the created hash

    :param password: str representing the password we
    want to store in a permanent storage.
    :return: str representing the hashed version of
    password.
    '''
    settings = get_settings()
    salt = bcrypt.gensalt(rounds=settings.salt_rounds)
    hashed_pass = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_pass


def check_password(password: str, hashed_pass: str) -> bool:
    '''
    Checks the clear-text password against it's
    (alleged) hashed version.

    :param password: str representing a clear-text password.
    :param hashed_pass: str representing the hashed version of
    the password
    :return True if the passwords match; False otherwise.
    '''
    return bcrypt.checkpw(
        password.encode('utf-8'),
        hashed_pass
    )
