import uuid
from datetime import datetime
from typing import Annotated, Literal , Dict , Optional , List

from pydantic import BaseModel, Field, EmailStr, field_validator , HttpUrl

class complain(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    title: Annotated[str, Field(..., max_length=200, description='A Brief Title of Your Complaint')]
    complain_description: Annotated[str, Field(..., min_length=50, max_length=900, description='Justify Your Problem Here')]
    name: Annotated[str, Field(..., description='Enter Your Name')]
    status: Annotated[Literal['PENDING', 'IN_PROGRESS', 'RESOLVED', 'ESCALATED'], Field(default='PENDING')]
    address: Annotated[str, Field(..., description='Enter your current address')]
    email: Annotated[EmailStr, Field(..., max_length=100)]
    phone_number: Annotated[str, Field(..., description='enter your Mobile Number')]
    gender: Annotated[Literal['Male', 'Female', 'other'], Field(..., description='Enter Your Gender')]
    age: Annotated[int, Field(..., description='Enter your age')]
    aadhar_card: Annotated[str, Field(..., description='enter your aadhar card number', examples=['1234 5678 9012'])]
    location : Dict[str , float] = Field(...,description='users loaction corrdinates' )
    photo_urls: Optional[List[HttpUrl]] = Field(None, description='URL of the uploaded photo')

    created_at: datetime = Field(default_factory=datetime.utcnow)
    # deadline is now optional, so it doesn't cause a validation error if not provided
    deadline: datetime | None = None

    @field_validator('aadhar_card')
    @classmethod
    def aadhar_card_validator(cls, v: str):
        aadhar_str = v.replace(' ', '')
        if not aadhar_str.isdigit():
            raise ValueError('Aadhaar number must contain only digits.')
        if len(aadhar_str) != 12:
            raise ValueError('Aadhaar number must be exactly 12 digits long.')
        return v
    
    @field_validator('phone_number')
    @classmethod
    def phone_number_validator(cls, v: str):
        if not v.isdigit():
            raise ValueError('Please provide a valid phone number.')
        if len(v) != 10:
            raise ValueError('Enter a valid 10-digit phone number.')
        return v