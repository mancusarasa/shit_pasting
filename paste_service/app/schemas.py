from pydantic import BaseModel


class Paste(BaseModel):
    paste_text: str
    private: bool = False