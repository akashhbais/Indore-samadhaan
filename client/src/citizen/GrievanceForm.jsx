import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CitizenNavbar from "../components/CitizenNavbar.jsx";
import { AppProvider, useAppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const { backendUrl} = useAppContext(AppProvider);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [form, setForm] = useState({
    description: "",
    user_name: user.name,
    user_mobile: user.phone_number,
    ward_no: user.ward_number,
    address: user.house_number + ", " + user.area + ", " + user.pincode,
    image_urls: ["#"],
  });

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (pos) => {
  //         const { latitude, longitude } = pos.coords;
  //         setLocation({ lat: latitude, lon: longitude });

  //         try {
  //           const response = await axios.get(
  //             `${backendUrl}/get-address?lat=${latitude}&lng=${longitude}`
  //           );
  //           if (response.data.address) {
  //             setForm((prev) => ({ ...prev, address: response.data.address }));
  //           } else {
  //             toast.error("Unable to fetch address, please enter manually.");
  //           }
  //         } catch (error) {
  //           console.error("Error fetching address:", error);
  //           toast.error("Error fetching address, enter manually.");
  //         }
  //       },
  //       () => toast.error("Location permission denied."),
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 10000,
  //         maximumAge: 0,
  //       }
  //     );
  //   }
  // }, [backendUrl]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const payload = {
        email : user.email,
        description: form.description,
        user_name: form.user_name,
        user_mobile: form.user_mobile,
        ward_no: Number(form.ward_no),
        address: form.address,
        image_urls : []
      };


      console.log(payload);
      
      const response = await axios.post(`${backendUrl}/complaints`, payload ,{
        headers: {
          "Content-Type": "application/json",
        },
      
      });
      console.log(response);

      if (response.data.message) {
        toast.success(response.data.message);
        setForm({
          description: "",
          user_name: "",
          user_mobile: "",
          ward_no: "",
          address: "",
          image_urls: [],
        });
        navigate("/citizen/complaints");
      } else {
        toast.error("Failed to submit complaint.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CitizenNavbar />
      <div className="max-w-4xl mx-auto mt-18 p-6">
        {/* Header image */}
        <div className="relative w-full h-48 md:h-64 mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/rajwada-indore-mp-city-hero.jpeg"
            alt="Rajwada Indore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
              FILE A COMPLAINT
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <textarea
            name="description"
            placeholder="Complaint Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-black p-2"
            rows="4"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={form.user_name}
              onChange={handleChange}
              className="w-full border border-black p-2"
              required
            />
            <input
              type="tel"
              name="user_mobile"
              placeholder="Phone Number"
              value={form.user_mobile}
              onChange={handleChange}
              className="w-full border border-black p-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="ward_no"
              placeholder="Ward Number"
              value={form.ward_no}
              onChange={handleChange}
              className="w-full border border-black p-2"
              required
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-black p-2"
            required
          />
          <input
            type="string"
            name="image_urls"
            onChange={handleChange}
            className="text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded w-full"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ComplaintForm;
