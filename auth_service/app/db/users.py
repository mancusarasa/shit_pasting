from uuid import uuid4

from pymongo import MongoClient
import base62

from settings import get_settings
from dependencies.crypto import get_hashed_password, check_password


class UserStorage:
    def __init__(self, db_user: str, db_pass: str, db_host: str, db_port: str):
        uri = 'mongodb://{}:{}@{}:{}/auth_service?authSource=admin'.format(
            db_user,
            db_pass,
            db_host,
            db_port
        )
        self.client = MongoClient(uri, uuidRepresentation='standard')
        self.database = self.client['auth_service']
        self.collection = self.database['users']

    def user_exists(self, username: str) -> bool:
        '''
        Returns True if a user with this username already
        exists; False otherwise

        :param username: str user whose existance we're testing for
        :return True if the user already exists; False otherwise
        '''
        return self.collection.find_one({'username': username}) is not None

    def register_user(self, username: str, password: str):
        '''
        Creates a new user in the database. Raises a UserAlreadyExists
        if the username is already taken.

        :param username: str representing the username
        :param password: str with the clear-text pass for the user.
        '''
        if self.user_exists(username):
            raise UserAlreadyExists(username)
        hashed_pass = get_hashed_password(password)
        user_id = base62.encode(uuid4().int)
        # FIXME: add retry logic to avoid potential collisions
        # over the id
        self.collection.insert_one({
            'id': user_id,
            'username': username,
            'password': hashed_pass
        })
        return {
            'id': user_id,
            'username': username
        }

    def verify_login(self, username: str, password: str):
        '''
        Checks the provided credentials. This means:
        - Verifying that the username actually exists.
        - Verifying that username + password combination is correct.
        '''
        if not self.user_exists(username):
            raise UserDoesntExist(username)
        user = self.collection.find_one({'username': username})
        hashed_pass = user['password']
        if not check_password(password, hashed_pass):
            raise WrongPassword()

    def get_user(self, username: str) -> dict:
        '''
        Obtains an existing user in the database.

        :param username: str representing the user to retrieve.
        :return dict with the info of the user
        '''
        return self.collection.find_one(
            {'username': username},
            projection={'_id': False, 'password': False}
        )


class UserAlreadyExists(Exception):
    def __init__(self, username: str):
        super().__init__(f'Username {username} already exists')


class UserDoesntExist(Exception):
    def __init__(self, username: str):
        super().__init__(f'Username {username} doesn\'t exist')


class WrongPassword(Exception):
    def __init__(self):
        super().__init__('Wrong password was supplied')
