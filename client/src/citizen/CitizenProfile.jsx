import React, { useEffect } from 'react'
import { AppProvider, useAppContext } from '../context/AppContext'
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import { useNavigate } from 'react-router-dom';

const CitizenProfile = () => {
    const { backendUrl } = useAppContext(AppProvider);
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));

    const handleLogout =()=>{
        navigate("/");
        localStorage.removeItem("user");

    }

   useEffect(()=>{
    console.log(user);
   },[])

    return (
        <>
            <CitizenNavbar />
            <div className="flex justify-center items-center py-10 px-4 bg-gray-100 min-h-screen mt-15">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                    
                    {/* Profile Header */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <img 
                            src="/profile.jpg" 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full shadow-md border-2 border-gray-300"
                        />
                        <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>

                    {/* Personal Details */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Personal Details</h3>
                        <p className="text-gray-700"><span className="font-medium">Phone:</span> {user.phone_number}</p>
                        <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
                    </div>

                    {/* Address Details */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Address</h3>
                        <span>{user.house_number}, {user.area}, {user.pincode}</span>
                        <p className='text-lg font-semibold text-gray-800 mb-3 border-b pb-2'>Ward No : {user.ward_number}</p>
                    </div>

                   

                    {/* Buttons */}
                    <div className="flex justify-between gap-4">
                        <button className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition">
                            Reset Password
                        </button>
                        <button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition">
                            Update Profile
                        </button>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button onClick={handleLogout} className='w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition'>Logout</button>
                    </div>
                </div>
            </div>
            <CitizenFooter />
        </>
    )
}

export default CitizenProfile
