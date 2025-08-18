from pydantic import BaseModel , EmailStr ,model_validator

class AdminResetPasswordRequest(BaseModel):
    email: EmailStr

# Model for an admin password reset confirmation
class AdminResetPasswordConfirm(BaseModel):
    email: EmailStr
    otp: str
    new_password: str
    re_new_password: str

    @model_validator(mode='after')
    def check_password_match(self) -> 'AdminResetPasswordConfirm':
        if len(self.new_password) < 8:
            raise ValueError("New password must be at least 8 characters long")
        if self.new_password != self.re_new_password:
            raise ValueError("New passwords do not match")
        return self