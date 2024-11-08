
from pydantic import BaseModel


class Paste(BaseModel):
    title: str = "Untitled"
    paste_text: str
    private: bool = False
