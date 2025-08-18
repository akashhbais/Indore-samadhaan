import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  FileText,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import CitizenFooter from "../components/CitizenFooter";
import CitizenNavbar from "../components/CitizenNavbar";

const SeeComplaints = ({ user }) => {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/complaints/${user.user_id}`
      );
      if (response.data.complaints) {
        setComplaints(response.data.complaints);
      } else {
        toast.error("No complaints found");
      }
    } catch (error) {
      toast.error("Error fetching complaints");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Lodged":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Lodged":
        return "📄";
      case "In Progress":
        return "🔄";
      case "Resolved":
        return "✅";
      case "Rejected":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <>
      <CitizenNavbar />
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 mt-18 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6" />
          See Complaints
        </h3>

        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.complaint_id}
              className="border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900">
                      Complaint #{complaint.complaint_id}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1">{complaint.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {complaint.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-600">
                      Ward:{" "}
                      <span className="font-medium text-blue-600">
                        {complaint.ward_no}
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Address:{" "}
                      <span className="font-medium">{complaint.address}</span>
                    </span>
                    <span className="text-gray-600">
                      Filed:{" "}
                      <span className="font-medium">
                        {new Date(complaint.created_at).toLocaleDateString()}
                      </span>
                    </span>
                    {complaint.sla_deadline && (
                      <span className="text-gray-600">
                        SLA Deadline:{" "}
                        <span className="font-medium text-green-600">
                          {new Date(
                            complaint.sla_deadline
                          ).toLocaleDateString()}
                        </span>
                      </span>
                    )}
                    {complaint.resolved_at && (
                      <span className="text-gray-600">
                        Resolved:{" "}
                        <span className="font-medium text-green-700">
                          {new Date(
                            complaint.resolved_at
                          ).toLocaleDateString()}
                        </span>
                      </span>
                    )}
                    <span className="text-gray-600">
                      Escalation Level:{" "}
                      <span className="font-medium text-red-500">
                        {complaint.escalation_level}
                      </span>
                    </span>
                  </div>
                  {/* Complaint Images */}
                  {complaint.image_urls?.length > 0 && (
                    <div className="mt-4 flex gap-3 flex-wrap">
                      {complaint.image_urls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`complaint-${complaint.complaint_id}-${idx}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side - Officer Info */}
                <div className="lg:w-64 bg-gray-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold text-gray-900">
                      Officer ID: {complaint.assigned_officer_id || "N/A"}
                    </h5>
                    <p className="text-sm text-gray-600">
                      Department ID: {complaint.department_id}
                    </p>
                    <div className="flex justify-center gap-2 mt-3">
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback on Resolved Complaints */}
              {complaint.status === "Resolved" && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium">
                      Please rate your experience:
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-yellow-400 hover:text-yellow-500 transition-colors"
                        >
                          <Star className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <CitizenFooter />
    </>
  );
};

export default SeeComplaints;
