from pydantic import BaseModel ,Field , EmailStr , field_validator , model_validator
from typing import Annotated , ClassVar , Optional

class User_update(BaseModel):

    INDORE_PINCODES :ClassVar[set[int]] = {
    452001, 452002, 452003, 452004, 452005, 452006, 452007,
    452008, 452009, 452010, 452011, 452012, 452013, 452014,
    452015, 452016, 452018, 453111, 453112, 453115, 453220,
    453331, 453441, 453551, 453661, 453771, 452020, 453001
    }

    name :         Optional[Annotated[str , Field(...,max_length=50 , description='Enter Your Name. ' , examples=['Abhay'])]]
    email :        Optional[Annotated[EmailStr , Field(..., description='Enter Your Email' , examples= ['abcd@gmail.com'])]]
    aadhar :       Optional[Annotated[str , Field(...,description='Enter your Aadhar Number ' , examples=['1234 5678 9012'])]]
    house_number : Optional[Annotated[str  , Field(..., description='Enter Your House Number ' , examples=['A12'])]]
    ward_number :  Optional[Annotated[int , Field(...,description='Enter your ward Number ' , examples=[2])] ]
    area :         Optional[Annotated[str , Field(...,description='Enter your Area ' , examples=['Sudama Nagar , Indore '])]]
    pincode :      Optional[Annotated[int , Field(...,description='Enter your Area Pincode' , examples=[452001])]]
    phone_number : Optional[Annotated[int , Field(...,description='Enter Your phone number ' , examples=[7854623145])]]

    password : str
    re_password :str

    @field_validator('aadhar')
    @classmethod
    def Aadhar_validator(cls , v : str ):
        aadhar_str  = v.replace(" " , "")
        if not aadhar_str.isdigit():
            raise ValueError("Aadhar Number is Not Valid , Please Check Again") 
        if len(aadhar_str) != 12:
            raise ValueError("Please Enter All the Digits of Your Aadhar Card")
        return v 
       
    @field_validator('ward_number')
    @classmethod
    def Ward_Number_validator(cls , v: int ):
        if not ( 1 <= v <= 22):
            raise ValueError("Enter The Correct Ward Number ")
        return v

    @field_validator('pincode')
    @classmethod
    def Pincode_validator(cls , v : int ):

        if v not in cls.INDORE_PINCODES :
            raise ValueError("Pincode is not a valid Pincode for Indore") 
        return v  
    
    @field_validator('phone_number')
    @classmethod
    def phone_number_validator(cls , v : int ):

        if len(str(v)) != 10:
            raise ValueError("Enter Phone Number is not valid")
        return v 
    
    @model_validator(mode = "after")
    def check_password_match(self) -> 'User_update' :
        if self.password != self.re_password:
            raise ValueError('Password do not match')
        return self 
    
    