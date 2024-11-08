from datetime import (
    timezone,
    datetime,
    timedelta
)
from typing import List

from pymongo import MongoClient

from settings import get_settings
from db.id_generation import generate_random_id


class PastesStorage:
    def __init__(self, db_user: str, db_pass: str, db_host: str, db_port: str):
        uri = 'mongodb://{}:{}@{}:{}/paste_service?authSource=admin'.format(
            db_user,
            db_pass,
            db_host,
            db_port
        )
        self.client = MongoClient(uri, uuidRepresentation='standard')
        self.database = self.client['paste_service']
        self.collection = self.database['pastes']

    def create_paste(self,
        title: str,
        paste_text: str,
        user_id: str,
        private: bool = False,
        expiration_time: int = None,
    ):
        '''
        Persists a paste to the database. Returns the
        id generated for it, I guess.

        :param paste_title:str title of the paste to store.
        :param paste_text:str text of the paste to store.
        :return str representing the id of the paste.
        '''
        settings = get_settings()
        inserted = False
        expiration = expiration_time or settings.paste_expiration
        while not inserted:
            random_id = generate_random_id()
            if self.collection.find_one({'paste_id': random_id}) is None:
                inserted = True
                now = datetime.now(timezone.utc)
                self.collection.insert_one({
                    'paste_id': random_id,
                    'user_id': user_id,
                    'title': title,
                    'paste_text': paste_text,
                    'creation_date': now,
                    'expiration_date': now + timedelta(minutes=expiration),
                    'private': private
                })
        return random_id

    def get_paste(self, paste_id: str):
        '''
        Returns the indicated paste, without any sort of
        permissions check. The outer layers should check for
        authorization over the paste.
        '''
        paste = self.collection.find_one(
            filter={'paste_id': paste_id},
            projection={'_id': False}
        )
        if paste is None:
            raise PasteNotFoundException(paste_id)
        return paste

    def get_pastes(self, user_id: str) -> List:
        '''
        Returns the pastes posted by the indicated user, without
        any sort of permissions check. The outer layers should check for
        authorization over the pastes.

        :param user_id: str representing the user_id.
        :return list of paste objects.
        '''
        result = self.collection.find(
            filter={'user_id': user_id},
            projection={'_id': False}
        )
        return list(result)


class PasteNotFoundException(Exception):
    def __init__(self, paste_id: str):
        super().__init__(f'Paste {paste_id} doesn\'t exist')
