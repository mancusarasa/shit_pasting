from os import urandom
from uuid import uuid4

import base62


def generate_random_id() -> str:
    '''
    Generates a random id
    '''
    return base62.encode(uuid4().int)
