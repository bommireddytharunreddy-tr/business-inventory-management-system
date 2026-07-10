from pydantic import BaseModel


class RegisterUser(BaseModel):
    username: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str