from datetime import (
    timezone,
    datetime,
    timedelta
)
from typing import List

from sqlalchemy import (
    create_engine,
    select,
    desc
)
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound

from settings import get_settings
from db.id_generation import generate_random_id
from db.models import Paste


class PastesStorage:
    def __init__(
        self,
        mysql_user: str,
        mysql_pass: str,
        mysql_host: str,
        mysql_port: str,
        mysql_database: str
    ):
        self.engine = create_engine(
            'mysql+mysqlconnector://{}:{}@{}:{}/{}'.format(
                mysql_user,
                mysql_pass,
                mysql_host,
                mysql_port,
                mysql_database
            )
        )

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
        success = False
        expiration = expiration_time or settings.paste_expiration
        while not success:
            random_id = generate_random_id()
            try:
                with Session(self.engine) as session:
                    now = datetime.now(timezone.utc)
                    expiration = now + timedelta(minutes=20)
                    new_paste = Paste(
                        paste_id=random_id,
                        user_id=user_id,
                        title=title,
                        paste_text=paste_text,
                        creation_date=now,
                        expiration_date=expiration,
                        private=private
                    )
                session.add_all([new_paste])
                session.commit()
            except IntegrityError:
                # maybe log something about the retry here?
                pass
            else:
                success = True

        return random_id

    def get_paste(self, paste_id: str):
        '''
        Returns the indicated paste, without any sort of
        permissions check. The outer layers should check for
        authorization over the paste.
        '''
        try:
            with Session(self.engine) as session:
                paste = session.query(Paste).where(Paste.paste_id == paste_id).one()
                return paste.to_dict()
        except NoResultFound:
            raise PasteNotFoundException(paste_id)

    def get_pastes(self, user_id: str, offset: int = 0) -> List:
        '''
        Returns the pastes posted by the indicated user, without
        any sort of permissions check. The outer layers should check for
        authorization over the pastes.

        :param user_id: str representing the user_id.
        :return list of paste objects.
        '''
        with Session(self.engine) as session:
            s = select(Paste)\
                .where(Paste.user_id == user_id)\
                .order_by(desc(Paste.creation_date))\
                .offset(offset)\
                .limit(10)
            return [p.to_dict() for p in session.scalars(s)]


class PasteNotFoundException(Exception):
    def __init__(self, paste_id: str):
        super().__init__(f'Paste {paste_id} doesn\'t exist')
