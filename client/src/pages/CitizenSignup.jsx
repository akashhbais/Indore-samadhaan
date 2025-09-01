import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppProvider, useAppContext } from "../context/AppContext";

const CitizenSignup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    aadhar: "",
    house_number: "",
    ward_number: "",
    area: "",
    pincode: "",
    phone_number: "",
    password: "",
    re_password: "",
    otp: ""
  });
  const [otp, setOtp] = useState("");

  const { setUser, setIsUser, backendUrl } = useAppContext(AppProvider);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const CitizenSignupRequest = async () => {
    try {
      const payload = {
        name: form.name,
        email: form.email,
        aadhar: form.aadhar,
        house_number: form.house_number,
        ward_number: (form.ward_number),
        area: form.area,
        pincode: parseInt(form.pincode),
        phone_number: parseInt(form.phone_number),
        password: form.password,
        re_password: form.re_password
      };
      const { data } = await axios.post(`${backendUrl}/user/request-signup-otp`, payload);

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
    CitizenSignupRequest();
  };

  const handleOtpVerification = async () => {
    if (!form.email || !otp.trim()) {
      alert("Email and OTP are required.");
      return;
    }
    try {
      const payload = {
        identifier: form.email,
        otp: otp.trim(),
      };
      const response = await axios.post(`${backendUrl}/user/verify-signup-otp`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);
      console.log(response.data);
      const data = response.data;
      if (data.user) {
        setIsUser(true);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/citizen');
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
          onSubmit={step === 1 ? handleNext : handleSubmit}
          className="bg-white p-10 rounded-lg shadow-md w-full"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Citizen Signup</h2>

          {step === 1 && (
            <>
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
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
                    value={form.email}
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
                    value={form.aadhar}
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
                    value={form.house_number}
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
                    value={form.ward_number}
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
                    value={form.area}
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
                    value={form.pincode}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8">
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={form.phone_number}
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
                  value={form.password}
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
                  value={form.re_password}
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
                  onClick={handleSubmit}
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
                  value={form.email}
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

export default CitizenSignup;
