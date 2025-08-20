import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import CitizenSignup from './pages/CitizenSignup.jsx';
import CitizenLogin from './pages/CitizenLogin.jsx';
import GrievanceForm from './citizen/GrievanceForm.jsx';
import Contact from './pages/Contact.jsx';
import CitizenHomepage from './citizen/Dashboard.jsx';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import About from './pages/About.jsx';
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignup from './pages/AdminSignup.jsx';
import SeeComplaints from './citizen/SeeComplaints.jsx'
import AdminDashboard from './Admin/dashboard.jsx';
import { ToastContainer } from "react-toastify";
import CitizenProfile from './citizen/CitizenProfile.jsx';
import SeeMyComplaints from './Admin/SeeMyComplaints.jsx';
import Profile from './Admin/profile.jsx';
import DepartmentsTable from './Admin/DepartmentTable.jsx';
function App() {
  const {isAdmin} = useAppContext(AppProvider);
  // const {isUser} = useAppContext(AppProvider);
  const user = localStorage.getItem("user");
  const isUser = user ? true : false;


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About/>}/>


        <Route path="/login" element={<CitizenLogin />} />
        <Route path="/signup" element={<CitizenSignup />} />
        <Route path="/citizen" element={isUser ? <CitizenHomepage/> : <CitizenLogin/>}/>
        <Route path="/citizen/grievance" element={<GrievanceForm />} />
        <Route path="/citizen/complaints" element={<SeeComplaints />} />
        <Route path='/citizen/profile' element={<CitizenProfile/>}/>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard/> : <AdminLogin/>}/>
        <Route path='/admin/complaints' element={<SeeMyComplaints/>}/>
        <Route path='/admin/profile' element={<Profile/>}/>
        <Route path='/admin/departments' element={<DepartmentsTable/>}/>

      </Routes>
    </>
  )
}

export default App;

