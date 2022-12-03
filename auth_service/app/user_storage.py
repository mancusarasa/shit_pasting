from pymongo import MongoClient

from config import get_settings

class UserStorage:
    def __init__(self, db_user: str, db_pass: str, db_host: str, db_port: str):
        connection_string = f'mongodb://{db_user}:{db_pass}@{db_host}:{db_port}/auth_service?authSource=admin'
        self.client = MongoClient(connection_string)
        self.database = self.client['auth_service']

    def create_user(self, username: str, password: str):
        users_collection = self.database['users']
        users_collection.insert_one({
            'username': username,
            'password': password
        })


settings = get_settings()
storage = UserStorage(
    settings.db_user,
    settings.db_pass,
    settings.db_host,
    settings.db_port,
)
