from pydantic import BaseModel , Field
from typing import Annotated

class Admin_login(BaseModel):
    identifier : Annotated[str , Field(..., description='Enter your email or Phone_number')]
    password : str 