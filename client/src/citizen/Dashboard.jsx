import React, { useEffect, useState } from 'react'
import { User, MessageCircle, BarChart3, FileText, Bell, Search, Phone, Mail, MapPin, Calendar, Clock, CheckCircle, AlertCircle, XCircle, Send, Star, ThumbsUp } from 'lucide-react';
import CitizenNavbar from '../components/CitizenNavbar'
import { AppProvider, useAppContext } from '../context/AppContext';
import CitizenFooter from '../components/CitizenFooter';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

const Dashboard = () => {

  const { user, latestNews, backendUrl } = useAppContext(AppProvider);

  const [complaints, setComplaints] = useState(0);
  const [grievances, setGrievances] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getUserComplaints = async () => {
    try {

      const response = await axios.get(`${backendUrl}/complaints/${user._id}`);
      if (response.data.complaints) {
        setGrievances(response.data.complaints),
          setComplaints(response.data.complaints.length);
      } else {
        toast.error("No complaint found")
      }

    } catch (error) {
      toast.error("error fetching complaints");
    }
  }
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
  useEffect(()=>{
    setGrievances([
      {
  "id": 12,
  "title": "Garbage not collected",
  "description": "Garbage not collected from Sector 5",
  "status": "In Progress",
  "date": "2025-08-10T12:00:00Z",
  "expectedCompletion": "2025-08-20T12:00:00Z",
  "handler": "Mr. Sharma",
  "dept": "Sanitation",
  "logs": [
    {
      "log_id": 1,
      "action_taken": "Complaint registered",
      "notes": "Initial submission",
      "timestamp": "2025-08-10T12:05:00Z"
    },
    {
      "log_id": 2,
      "action_taken": "Assigned to sanitation worker",
      "notes": "Worker ID: 123",
      "timestamp": "2025-08-11T09:00:00Z"
    }
  ]
}
    ])
  },[])
  return (
    <>
      <CitizenNavbar />
      {/* hero section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 mt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="container mx-auto px-5 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Welcome back!
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Track your grievances, stay updated with your area statistics, and access all municipal services
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
            <span className="text-yellow-300 font-semibold">🏆 Indore - India's Cleanest City (7 Years Running)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-5 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Complaints</p>
                <p className="text-3xl font-bold text-gray-900">{complaints}</p>
                <p className="text-xs text-blue-600 mt-1">Total Filed</p>
              </div>
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Resolution</p>
                <p className="text-3xl font-bold text-gray-900">7</p>
                <p className="text-xs text-yellow-600 mt-1">Days</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Area Rating</p>
                <p className="text-3xl font-bold text-gray-900">4.2</p>
                <p className="text-xs text-purple-600 mt-1">Citizen Satisfaction</p>
              </div>
              <Star className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tracking Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6" />
            Track Your Grievances
          </h3>

          <div className="space-y-6">
            {grievances && grievances.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-md">

                {/* Complaint Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900">{complaint.title}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1">{complaint.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{complaint.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-gray-600">ID: <span className="font-medium text-blue-600">{complaint.id}</span></span>
                      <span className="text-gray-600">Filed: <span className="font-medium">{new Date(complaint.date).toLocaleDateString()}</span></span>
                      <span className="text-gray-600">Expected: <span className="font-medium text-green-600">{new Date(complaint.expectedCompletion).toLocaleDateString()}</span></span>
                    </div>
                  </div>
                </div>

                {/* Complaint Logs Timeline */}
                <div className="relative border-l-2 border-blue-200 pl-6 space-y-6">
                  {complaint.logs && complaint.logs.length > 0 ? (
                    complaint.logs.map((log) => (
                      <div key={log.log_id} className="relative">
                        <span className="absolute -left-3 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </span>
                        <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                          <h5 className="font-semibold text-blue-900">{log.action_taken}</h5>
                          {log.notes && <p className="text-sm text-gray-700 mt-1">{log.notes}</p>}
                          <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No activity logs available yet.</p>
                  )}
                </div>

                {/* Rating if resolved */}
                {complaint.status === 'Resolved' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Please rate your experience:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} className="text-yellow-400 hover:text-yellow-500 transition-colors">
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


        {/* News and Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              📢 Latest News & Announcements
            </h3>

            <div className="space-y-4">
              {latestNews && latestNews.map((news, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-lg transition-all duration-300 hover:bg-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">{news.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${news.type === 'achievement' ? 'bg-green-100 text-green-800' :
                        news.type === 'development' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                      }`}>
                      {news.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">{news.title}</h4>
                  <p className="text-sm text-gray-700">{news.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              ⭐ Citizen Reviews
            </h3>

            <div className="space-y-4">
              {reviews && reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">{review.name}</div>
                      <div className="text-xs text-gray-600">{review.ward} • {review.date}</div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">"{review.review}"</p>
                  <span className="text-xs text-blue-600 font-medium">#{review.complaintType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <CitizenFooter />

    </>

  )
}

export default Dashboard