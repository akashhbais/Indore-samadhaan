import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import { AppProvider, useAppContext } from "../context/AppContext";

const CitizenLogin = () => {

  
  const {setUser,setIsUser , backendUrl} = useAppContext(AppProvider);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const citizenlogin = async ()=>{
    try{

      const {data} = await axios.post(`${backendUrl}/login`,{
        identifier:form.email,
        password:form.password
      });
      if(data){
        setIsUser(true);
        setUser(data.data);
        localStorage.setItem("user",JSON.stringify(data.data));
        navigate("/citizen");
        console.log(data);
      }else{
        console.log("error");
      }
      

    }catch(error){
      console.log(error);
    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    citizenlogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 relative" style={{
      backgroundImage: 'url(/rajwada-indore-mp-city-hero.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <div className="relative w-full max-w-md z-10">
        <Link to="/" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-20" title="Close">
          &times;
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Citizen Login</h2>
          <div className="mb-4">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline font-semibold">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CitizenLogin;
