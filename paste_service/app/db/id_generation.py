from base64 import b64encode
from os import urandom

def generate_random_id(length: int) -> str:
    '''
    Generates a random id of the indicated length.
    '''
    random_bytes = urandom(length)
    return b64encode(random_bytes).decode('utf-8')
