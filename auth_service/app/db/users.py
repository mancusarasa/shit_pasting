from pymongo import MongoClient

from settings import get_settings


class UserStorage:
    def __init__(self, db_user: str, db_pass: str, db_host: str, db_port: str):
        uri = 'mongodb://{}:{}@{}:{}/auth_service?authSource=admin'.format(
            db_user,
            db_pass,
            db_host,
            db_port
        )
        self.client = MongoClient(uri)
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
        self.collection.insert_one({
            'username': username,
            'password': password,
            'salt': '123,'
        })


class UserAlreadyExists(Exception):
    def __init__(self, username: str):
        super().__init__(f'Username {username} already exists')
