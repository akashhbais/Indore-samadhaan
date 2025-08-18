from pydantic import BaseModel

class  OTP_verification(BaseModel):
    identifier:str 
    otp : str