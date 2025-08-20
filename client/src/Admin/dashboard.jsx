import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';
import { AppProvider, useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

Chart.register(ArcElement, Tooltip, Legend, PieController);

// Dashboard Card Component
const DashboardCard = ({ icon, value, label }) => {
  return (
    <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp">
      <div className="text-4xl text-blue-800 mb-4">
        <i className={icon}></i>
      </div>
      <div className="text-3xl font-bold text-blue-800 mb-2">{value}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
};

// Table Row Component
const ComplaintRow = ({ id, date, status, service, ward }) => {
  const getStatusStyle = (status) => {
    status = status.toLowerCase();
    if (status.includes("open")) return 'bg-gradient-to-r from-red-600 to-red-500 text-white';
    if (status.includes("assigned")) return 'bg-gradient-to-r from-blue-700 to-blue-600 text-white';
    if (status.includes("resolved")) return 'bg-gradient-to-r from-green-600 to-green-500 text-white';
    return 'bg-gradient-to-r from-gray-600 to-gray-500 text-white';
  };

  return (
    <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        <strong>#{id}</strong>
      </td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">{date}</td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusStyle(status)}`}>
          {status}
        </span>
      </td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">{service}</td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">{ward}</td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        <a href="#" className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-2 px-4 rounded-lg text-xs font-medium transition-all duration-300 inline-flex items-center gap-1 hover:-translate-y-1 hover:shadow-md hover:from-blue-700 hover:to-blue-600">
          <i className="fas fa-eye"></i> View
        </a>
      </td>
    </tr>
  );
};

// Complaints Table Component
const ComplaintsTable = ({ complaints }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const toggleComplaintDetails = (complaint) => {
    if (selectedComplaint?.complaint_id === complaint.complaint_id) {
      setSelectedComplaint(null); // close if already open
    } else {
      setSelectedComplaint(complaint);
    }
  };

  return (
    <>
      <h3 className="mb-5 text-blue-800 flex items-center gap-3 animate-fadeInUp">
        <i className="fas fa-list"></i> Latest Complaints
      </h3>

      <div className="overflow-hidden rounded-xl shadow-lg animate-fadeInUp">
        <table className="w-full border-separate border-spacing-0 mb-8 bg-white">
          <thead>
            <tr className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
              <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-hashtag"></i> ID</th>
              <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-calendar"></i> Deadline</th>
              <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-flag"></i> Status</th>
              <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-tools"></i> Description</th>
              <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-map-marker-alt"></i> Ward</th>
              <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-eye"></i> Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <React.Fragment key={complaint.complaint_id}>
                  <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                    <td className="p-4 border-b border-gray-100 text-sm bg-white"><strong>#{complaint.complaint_id}</strong></td>
                    <td className="p-4 border-b border-gray-100 text-sm bg-white">{new Date(complaint.sla_deadline).toLocaleDateString()}</td>
                    <td className="p-4 border-b border-gray-100 text-sm bg-white">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        complaint.status.toLowerCase().includes("open") ? 'bg-red-600 text-white' :
                        complaint.status.toLowerCase().includes("assigned") ? 'bg-blue-600 text-white' :
                        complaint.status.toLowerCase().includes("resolved") ? 'bg-green-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-100 text-sm bg-white">
                      {complaint.description.length > 25 ? complaint.description.slice(0, 25) + "..." : complaint.description}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-sm bg-white">Ward {complaint.ward_no}</td>
                    <td className="p-4 border-b border-gray-100 text-sm bg-white">
                      <button 
                        onClick={() => toggleComplaintDetails(complaint)}
                        className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-2 px-4 rounded-lg text-xs font-medium transition-all duration-300 inline-flex items-center gap-1 hover:-translate-y-1 hover:shadow-md"
                      >
                        <i className="fas fa-eye"></i> {selectedComplaint?.complaint_id === complaint.complaint_id ? "Close" : "View"}
                      </button>
                    </td>
                  </tr>

                  {/* Expandable Details Row */}
                  {selectedComplaint?.complaint_id === complaint.complaint_id && (
                    <tr>
                      <td colSpan="6" className="bg-gray-50 p-6">
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 animate-fadeInUp">
                          <h4 className="text-lg font-semibold text-blue-800 mb-3">Complaint Details</h4>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li><strong>ID:</strong> {complaint.complaint_id}</li>
                            <li><strong>Status:</strong> {complaint.status}</li>
                            <li><strong>Deadline:</strong> {new Date(complaint.sla_deadline).toLocaleString()}</li>
                            <li><strong>Created At:</strong> {new Date(complaint.created_at).toLocaleString()}</li>
                            <li><strong>Ward:</strong> {complaint.ward_no}</li>
                            <li><strong>Address:</strong> {complaint.address}</li>
                            <li><strong>Assigned Officer:</strong> {complaint.assigned_officer_id}</li>
                            <li><strong>Email:</strong> {complaint.email}</li>
                            <li><strong>Description:</strong> {complaint.description}</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">No complaints available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Chart Component
const WardChart = ({ complaints }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (complaints.length === 0) return;

    // Count complaints per ward
    const wardCounts = complaints.reduce((acc, c) => {
      acc[c.ward_no] = (acc[c.ward_no] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(wardCounts).map(w => `Ward ${w}`);
    const data = Object.values(wardCounts);

    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: ['#1e40af', '#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#2563eb'],
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverBorderWidth: 4,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: { size: 14, weight: '500' },
                color: '#374151',
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: '#1e3a8a',
              titleColor: 'white',
              bodyColor: 'white',
              cornerRadius: 8,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  let value = context.raw || 0;
                  let total = context.dataset.data.reduce((a, b) => a + b, 0);
                  let percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} complaints (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }, [complaints]);

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-lg mt-5 border border-white/20 animate-fadeInUp">
      <h3 className="text-xl text-center mb-5 text-blue-800 font-semibold flex items-center justify-center gap-3">
        <i className="fas fa-chart-pie"></i> Complaints by Ward
      </h3>
      <div className="relative h-80 mt-5">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

// Action Button Component
const ActionButton = ({ href, icon, label }) => {
  return (
    <a href={href} className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20 text-center transition-all duration-300 cursor-pointer no-underline text-gray-800 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-800 hover:to-indigo-700 hover:text-white group animate-fadeInUp">
      <div className="text-2xl mb-3 text-blue-800 transition-colors duration-300 group-hover:text-white">
        <i className={icon}></i>
      </div>
      <div className="font-semibold text-sm">{label}</div>
    </a>
  );
};

// Action Buttons Grid Component
const ActionButtonsGrid = () => {
  const actions = [
    { href: 'newcomplaint.html', icon: 'fas fa-plus-circle', label: 'Add New Complaint' },
    { href: 'reports.html', icon: 'fas fa-download', label: 'Export Reports' },
    { href: 'newtasks.html', icon: 'fas fa-user-plus', label: 'Assign Tasks' },
    { href: '#', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {actions.map((action, index) => (
        <ActionButton key={index} href={action.href} icon={action.icon} label={action.label} />
      ))}
    </div>
  );
};

// Main Content Area Component
const MainContent = ({ animatedStats, complaints }) => {
  const dashboardCards = [
    { icon: 'fas fa-clipboard-list', value: animatedStats.totalCard, label: 'Total Complaints' },
    { icon: 'fas fa-clock', value: animatedStats.activeCard, label: 'Active Cases' },
    { icon: 'fas fa-check-circle', value: animatedStats.resolvedCard, label: 'Resolved Today' },
    { icon: 'fas fa-users', value: animatedStats.wardCard, label: 'Active Wards' }
  ];

  return (
    <div className="flex-grow bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-5 animate-fadeInUp">
        <h2 className="text-3xl text-gray-800 flex items-center gap-3">
          <i className="fas fa-chart-line"></i> Dashboard Overview
        </h2>
        <div className="text-sm text-gray-600">
          <i className="fas fa-calendar"></i> Last updated: Today
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} icon={card.icon} value={card.value} label={card.label} />
        ))}
      </div>

      <ComplaintsTable complaints={complaints} />
      <WardChart complaints={complaints} />
      <ActionButtonsGrid />
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const { backendUrl } = useAppContext(AppProvider);
  const [complaints, setComplaints] = useState([]);
  const [animatedStats, setAnimatedStats] = useState({
    totalCard: 0,
    activeCard: 0,
    resolvedCard: 0,
    wardCard: 0
  });

  const getAllComplaints = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/all-complaints`);
      if (response.data) {
        setComplaints(response.data);

        // Stats calculation
        const total = response.data.length;
        const active = response.data.filter(c => c.status.toLowerCase().includes("open") || c.status.toLowerCase().includes("assigned")).length;
        const resolved = response.data.filter(c => c.status.toLowerCase().includes("resolved")).length;
        const wards = new Set(response.data.map(c => c.ward_no)).size;

        setAnimatedStats({
          totalCard: total,
          activeCard: active,
          resolvedCard: resolved,
          wardCard: wards
        });
      } else {
        toast.error("Error in fetching All complaints");
      }
    } catch (error) {
      toast.error("Error in fetching All complaints");
    }
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-700 text-gray-800 mt-19">
      <AdminNavbar />

      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)] mt-20 max-xl:flex-col ">
        <MainContent animatedStats={animatedStats} complaints={complaints} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
