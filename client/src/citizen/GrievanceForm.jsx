import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppProvider, useAppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import CitizenNavbar from "../components/CitizenNavbar.jsx";
const ComplaintForm = () => {
  const { backendUrl } = useAppContext(AppProvider);
  const [form, setForm] = useState({
    complain_description: "",
    name: "",
    phone_number: "",
    ward: "",
    gender: "",
    address: "",
    photo_upload: [],
  });

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });

        try {
          console.log(latitude, longitude);
          const response = await axios.get(
            `${backendUrl}/get-address?lat=${latitude}&lng=${longitude}`
          );
          if (response.data.address) {
            setForm((prev) => ({ ...prev, address: response.data.address }));
          } else {
            toast.error("Unable to fetch address, please enter manually.");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          toast.error("Error fetching address, enter manually.");
        }
      },
      () => toast.error("Location permission denied."),
      {
        enableHighAccuracy: true, 
        timeout: 10000,           
        maximumAge: 0              
      }
    );
  }
}, [backendUrl]);


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
      if (!location) {
        throw new Error("Location not detected. Please allow location access.");
      }

      const formData = new FormData();
      for (const key in form) {
        if (key === "photo_upload") {
          for (let i = 0; i < form.photo_upload.length; i++) {
            formData.append("photo_upload", form.photo_upload[i]);
          }
        } else {
          formData.append(key, form[key]);
        }
      }
      formData.append("location", JSON.stringify(location));

      const { data } = await axios.post(`${backendUrl}/complaints`, formData);

      if (data.success) {
        toast.success("Complaint submitted successfully!");
        setForm({
          title: "",
          complain_description: "",
          name: "",
          email: "",
          phone_number: "",
          gender: "",
          address: "",
          aadhar_card: "",
          age: "",
          photo_upload: [],
        });
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
          name="complain_description"
          placeholder="Complaint Description"
          value={form.complain_description}
          onChange={handleChange}
          className="w-full border border-black p-2"
          rows="4"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-black p-2"
            required
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleChange}
            className="w-full border border-black p-2"
            required
          />
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="ward"
            placeholder="Ward Number"
            value={form.ward}
            onChange={handleChange}
            className="w-full border border-black p-2"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border border-black p-2"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
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
          type="file"
          name="photo_upload"
          accept="image/*"
          multiple
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
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { AppProvider, useAppContext } from "../context/AppContext.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";
// import CitizenNavbar from "../components/CitizenNavbar.jsx";
// const ComplaintForm = () => {
//   const { backendUrl } = useAppContext(AppProvider);
//   const [form, setForm] = useState({
//     complain_description: "",
//     name: "",
//     phone_number: "",
//     ward: "",
//     gender: "",
//     address: "",
//     photo_upload: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setLocation({ lat: latitude, lon: longitude });

//         try {
//           console.log(latitude, longitude);
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
//         maximumAge: 0              
//       }
//     );
//   }
// }, [backendUrl]);


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setForm((prev) => ({ ...prev, [name]: files }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!location) {
//         throw new Error("Location not detected. Please allow location access.");
//       }

//       const formData = new FormData();
//       for (const key in form) {
//         if (key === "photo_upload") {
//           for (let i = 0; i < form.photo_upload.length; i++) {
//             formData.append("photo_upload", form.photo_upload[i]);
//           }
//         } else {
//           formData.append(key, form[key]);
//         }
//       }
//       formData.append("location", JSON.stringify(location));

//       const { data } = await axios.post(`${backendUrl}/complaints`, formData);

//       if (data.success) {
//         toast.success("Complaint submitted successfully!");
//         setForm({
//           title: "",
//           complain_description: "",
//           name: "",
//           email: "",
//           phone_number: "",
//           gender: "",
//           address: "",
//           aadhar_card: "",
//           age: "",
//           photo_upload: [],
//         });
//       } else {
//         toast.error("Failed to submit complaint.");
//       }
//     } catch (err) {
//       toast.error(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <CitizenNavbar />
//     <div className="max-w-4xl mx-auto mt-18 p-6">
//       {/* Header image */}
//       <div className="relative w-full h-48 md:h-64 mb-8 rounded-lg overflow-hidden shadow-lg">
//         <img
//           src="/rajwada-indore-mp-city-hero.jpeg"
//           alt="Rajwada Indore"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
//             FILE A COMPLAINT
//           </h2>
//         </div>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        
//         <textarea
//           name="complain_description"
//           placeholder="Complaint Description"
//           value={form.complain_description}
//           onChange={handleChange}
//           className="w-full border border-black p-2"
//           rows="4"
//           required
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border border-black p-2"
//             required
//           />
//           <input
//             type="tel"
//             name="phone_number"
//             placeholder="Phone Number"
//             value={form.phone_number}
//             onChange={handleChange}
//             className="w-full border border-black p-2"
//             required
//           />
          
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="ward"
//             placeholder="Ward Number"
//             value={form.ward}
//             onChange={handleChange}
//             className="w-full border border-black p-2"
//             required
//           />
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             className="w-full border border-black p-2"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//         </div>
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={form.address}
//           onChange={handleChange}
//           className="w-full border border-black p-2"
//           required
//         />
       
//         <input
//           type="file"
//           name="photo_upload"
//           accept="image/*"
//           multiple
//           onChange={handleChange}
//           className="text-sm"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded w-full"
//         >
//           {loading ? "Submitting..." : "Submit Complaint"}
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default ComplaintForm;

