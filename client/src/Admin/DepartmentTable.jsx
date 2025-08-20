import React from "react";
import { Building } from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";

const departments = [
  "Education Department",
  "Electrical & Mechanical Department",
  "Encroachment Removal Department",
  "Fire Department",
  "Garden, Parks & Recreation Department",
  "Housing & Slum Development Department",
  "Information Technology (IT) Department",
  "Miscellaneous / Out-of-Scope",
  "Public Works Department (PWD)",
  "Revenue & Taxation Department",
  "Solid Waste Management & Health Department",
  "Town Planning & Building Permission Department",
  "Traffic Management & Transport Department",
  "Water Supply & Sewerage Department",
  "department"
];

const DepartmentRow = ({ id, name }) => {
  return (
    <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
      <td className="p-4 border-b border-gray-100 text-sm bg-white font-semibold">
        #{id}
      </td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        {name}
      </td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        <a
          href="#"
          className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-2 px-4 rounded-lg text-xs font-medium transition-all duration-300 inline-flex items-center gap-1 hover:-translate-y-1 hover:shadow-md hover:from-blue-700 hover:to-blue-600"
        >
          <i className="fas fa-eye"></i> View
        </a>
      </td>
    </tr>
  );
};

const DepartmentsTable = () => {
  return (
    <>
    <AdminNavbar/>
      <h3 className="m-5 mt-25 text-blue-800 text-2xl font-bold flex items-center gap-3 animate-fadeInUp">
        <Building className="w-6 h-5 text-blue-800"/> Departments List
      </h3>

      <div className="overflow-hidden rounded-xl shadow-lg animate-fadeInUp">
        <table className="w-full border-separate border-spacing-0 m-8 bg-white">
          <thead>
            <tr className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-hashtag"></i> ID
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-building"></i> Department Name
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-eye"></i> Action
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept, index) => (
                <DepartmentRow key={index} id={index} name={dept} />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No departments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DepartmentsTable;
