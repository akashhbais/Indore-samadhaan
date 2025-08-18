import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const AdminSignup = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aadhar: '',
    house_number: '',
    ward_number: '',
    area: '',
    pincode: '',
    phone_number: '',
    sector: '',
    password: '',
    re_password: '',
  });
  const { setAdmin, setIsAdmin, backendUrl, setUser, setIsUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.name && formData.email && formData.aadhar && formData.house_number && formData.ward_number && formData.area && formData.pincode && formData.phone_number && formData.sector) {
        setStep(2);
      } else {
        alert('Please fill all the fields');
      }
    } else if (step === 2) {
      if (formData.password && formData.re_password) {
        if (formData.password === formData.re_password) {
          AdminSignupRequest();
        } else {
          alert('Passwords do not match');
        }
      } else {
        alert('Please fill all the fields');
      }
    }
  };

  const AdminSignupRequest = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        aadhar: formData.aadhar,
        house_number: formData.house_number,
        ward_number: parseInt(formData.ward_number),
        area: formData.area,
        pincode: parseInt(formData.pincode),
        phone_number: parseInt(formData.phone_number),
        sector: formData.sector,
        password: formData.password,
        re_password: formData.re_password
      };
      const { data } = await axios.post(`${backendUrl}/admin/request-signup-otp`, payload);

      if (data) {
        setStep(3);
        console.log("Signup request response:", data);
      } else {
        console.log("Signup request error");
      }
    } catch (error) {
      console.log("Signup request error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext(e);
  };

  const handleOtpVerification = async () => {
    if (!formData.email || !otp.trim()) {
      alert("Email and OTP are required.");
      return;
    }
    try {
      const payload = {
        identifier: formData.email,
        otp: otp.trim(),
      };
      const { data } = await axios.post(`${backendUrl}/admin/verify-signup-otp`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (data) {
        setIsAdmin(true);
        setAdmin(data.data);
        navigate('/admin/dashboard');
        console.log("OTP verified:", data);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("OTP verification error:", error);
      alert("OTP verification failed.");
    }
  };
  return (
    <div
          className="min-h-screen flex items-center justify-center bg-blue-50 relative"
          style={{
            backgroundImage: 'url(/rajwada-indore-mp-city-hero.jpeg)',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
          <div className="relative w-full max-w-3xl z-10">
            <Link
              to="/"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-20"
              title="Close"
            >
              &times;
            </Link>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-10 rounded-lg shadow-md w-full"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Admin Signup</h2>
    
              {step === 1 && (
                <>
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-1 font-medium">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
    
                  {/* Aadhar & House No */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-1 font-medium">Aadhar</label>
                      <input
                        type="text"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleChange}
                        required
                        maxLength={12}
                        pattern="\d{12}"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">House Number</label>
                      <input
                        type="text"
                        name="house_number"
                        value={formData.house_number}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
    
                  {/* Ward No, Area, Pincode */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block mb-1 font-medium">Ward Number</label>
                      <input
                        type="number"
                        name="ward_number"
                        value={formData.ward_number}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Area</label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        maxLength={6}
                        pattern="\d{6}"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  {/* Deoartment */}
                  <div className="col-span-2">
                <label className="block mb-1 font-medium">Sector</label>
                <select name="sector" value={formData.sector} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                  <option value="">Select Sector</option>
                  <option value="Public Department">Public Department</option>
                  <option value="Water & Drainage / Sewerage Department">Water & Drainage / Sewerage Department</option>
                  <option value="Health Establishment/Department">Health Establishment/Department</option>
                  <option value="Electrical & Mechanical Department">Electrical & Mechanical Department</option>
                  <option value="Revenue Department">Revenue Department</option>
                  <option value="Garden/Parks Department">Garden/Parks Department</option>
                  <option value="Planning & Information Tech Department">Planning & Information Tech Department</option>
                  <option value="Traffic & transport Department">Traffic & transport Department</option>
                  <option value="Housing & Environmental Department / Colony Cell">Housing & Environmental Department / Colony Cell</option>
                  <option value="Fire Department">Fire Department</option>
                </select>
              </div>
    
                  {/* Phone */}
                  <div className="mb-8">
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      maxLength={10}
                      pattern="\d{10}"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
    
                  {/* Next Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded text-lg hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </>
              )}
    
              {step === 2 && (
                <>
                  {/* Password & Re-Password */}
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block mb-1 font-medium">Re-enter Password</label>
                    <input
                      type="password"
                      name="re_password"
                      value={formData.re_password}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
    
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      type="button"
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
    
              {step === 3 && (
                <>
                  <div className="mb-6">
                    <label className="block mb-1 font-medium">Verification Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <h1>OTP is sent on Email. Check Spam if not found in Inbox</h1>
                  <div className="mb-8">
                    <label className="block mb-1 font-medium">Enter OTP </label>
                    <input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
    
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleOtpVerification}
                      type="button"
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
  );
};

export default AdminSignup;
