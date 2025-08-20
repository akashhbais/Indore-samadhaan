import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User, FileText, Phone, Mail, Star, Search } from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";

const SeeMyComplaints = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [adminId, setAdminId] = useState("");
  const [wardNo, setWardNo] = useState(""); // NEW: ward search
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleResolve = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/officer/resolve_complaint/${id}`,
        {
          officer_id: adminId,
          notes: `Complaint is resolved by ${adminId}`,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Complaint resolved");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error resolving complaint");
    } finally {
      getComplaints();
    }
  };

  const getComplaints = async () => {
    if (!adminId) {
      toast.error("Please enter Admin ID");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/complaints/admin/${adminId}`
      );
      if (response.data && response.data.length > 0) {
        setComplaints(response.data);
      } else {
        toast.info("No complaints found for this Admin ID");
        setComplaints([]);
      }
    } catch (error) {
      toast.error("Error fetching complaints");
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaints = async () => {
    if (!wardNo) {
      toast.error("Please enter a ward number");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/ward/${wardNo}`);
      setComplaints(res.data);
      if (res.data.length === 0) {
        toast.info("No complaints found for this ward");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const getHead = (level) => {
    if (level === 0) return "Zonal Office";
    if (level === 1) return "Department Head";
    if (level === 2) return "Additional Commissioner";
    if (level === 3) return "Commissioner";
    return "Unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Lodged":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Resolved - Awaiting Feedback":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      default:
        return " ";
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 mt-18 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6" />
          Complaints
        </h3>

        {/* Admin ID Input */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Enter Admin ID"
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={getComplaints}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Search className="w-4 h-4" />
            {loading ? "Loading..." : "Fetch by Admin"}
          </button>
        </div>

        {/* Ward No Input */}
        <div className="flex gap-3 mb-6">
          <input
            type="number"
            value={wardNo}
            onChange={(e) => setWardNo(e.target.value)}
            placeholder="Enter Ward Number"
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <button
            onClick={fetchComplaints}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Search className="w-4 h-4" />
            {loading ? "Loading..." : "Fetch by Ward"}
          </button>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.complaint_id}
              className="border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900">
                      Complaint {complaint.complaint_id}
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
                  <p className="text-sm text-black mb-3 border border-black rounded-lg p-4">
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
                      Complaint Level:{" "}
                      <span className="font-medium text-red-500">
                        {getHead(complaint.escalation_level)}
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

                {complaint.status === "Resolved - Awaiting Feedback" ? (
                  <span className="text-green-500 font-medium">
                    Already Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleResolve(complaint.complaint_id);
                    }}
                    className="w-1/4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition"
                  >
                    Mark as Resolve
                  </button>
                )}
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
    </>
  );
};

export default SeeMyComplaints;
