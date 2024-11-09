from datetime import datetime

from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column
)
from sqlalchemy import (
    String,
    Text,
    DateTime,
    Boolean
)
from sqlalchemy_mixins import SerializeMixin


class Base(DeclarativeBase):
    pass


class BaseModel(Base, SerializeMixin):
    __abstract__ = True


class Paste(BaseModel):
    __tablename__ = 'pastes'

    paste_id: Mapped[str] = mapped_column(String(255), primary_key=True, nullable=False)
    user_id: Mapped[str] = mapped_column(String(255), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    paste_text: Mapped[str] = mapped_column(Text(), nullable=False)
    creation_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    expiration_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    private: Mapped[bool] = mapped_column(Boolean(), nullable=False)
