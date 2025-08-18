import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import AdminNavbar from '../components/AdminNavbar.jsx';
import { useAppContext } from '../context/AppContext'; // Import useAppContext
import axios from 'axios'; // Import axios for API calls

Chart.register(ArcElement, Tooltip, Legend, PieController);

// Reusable Components

const StatCard = ({ value, label }) => (
  <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg">
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-xs opacity-90">{label}</div>
  </div>
);

const NotificationItem = ({ message, borderColor }) => (
  <div className={`bg-white bg-opacity-90 p-4 mb-3 rounded-xl text-sm text-gray-800 shadow-md border-l-4 ${borderColor} transition-all duration-300 hover:translate-x-1 hover:shadow-lg`}>
    <strong>{message}</strong>
  </div>
);

const DashboardCard = ({ icon, value, label }) => (
  <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="text-4xl text-blue-800 mb-4"><i className={icon}></i></div>
    <div className="text-3xl font-bold text-blue-800 mb-2">{value}</div>
    <div className="text-sm text-gray-600 font-medium">{label}</div>
  </div>
);

const ComplaintRow = ({ id, date, status, service, ward }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-gradient-to-r from-red-600 to-red-500 text-white';
      case 'assigned': return 'bg-gradient-to-r from-blue-700 to-blue-600 text-white';
      case 'resolved': return 'bg-gradient-to-r from-green-600 to-green-500 text-white';
      case 'pending': return 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white'; // Added pending status style
      case 'in_progress': return 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'; // Added in_progress status style
      default: return 'bg-gradient-to-r from-gray-600 to-gray-500 text-white';
    }
  };

  return (
    <tr className="transition-all duration-300 hover:bg-indigo-50">
      <td className="p-4 border-b border-gray-100 text-sm bg-white"><strong>#{id}</strong></td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">{date}</td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusStyle(status)}`}>
          {status.replace('_', ' ')} {/* Replace underscore for display */}
        </span>
      </td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">{service}</td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">{ward}</td>
      <td className="p-4 border-b border-gray-100 text-sm bg-white">
        <a href="#" className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-2 px-4 rounded-lg text-xs font-medium transition-all duration-300 inline-flex items-center gap-1 hover:-translate-y-1 hover:shadow-md">
          <i className="fas fa-eye"></i> View
        </a>
      </td>
    </tr>
  );
};

const ActionButton = ({ href, icon, label }) => (
    <a href={href} className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20 text-center transition-all duration-300 cursor-pointer no-underline text-gray-800 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-800 hover:to-indigo-700 hover:text-white group">
      <div className="text-2xl mb-3 text-blue-800 transition-colors duration-300 group-hover:text-white">
        <i className={icon}></i>
      </div>
      <div className="font-semibold text-sm">{label}</div>
    </a>
);


// Child Components for Dashboard

const ProfileCard = () => {
  const { admin } = useAppContext();

  return admin && (
    <div className="text-center py-5 border-b border-black/10 mb-5">
      <div className="w-30 h-30 rounded-full bg-gradient-to-br from-blue-800 to-indigo-700 mx-auto mb-4 flex items-center justify-center text-5xl text-white relative overflow-hidden shadow-2xl shadow-blue-800/30">
        <i className="fas fa-user"></i>
      </div>
      <div className="text-2xl font-semibold text-blue-800 mb-1">{admin.name || 'Admin Name'}</div>
      <div className="text-sm text-gray-500 mb-4">{admin.sector || 'Administrator'}</div>
      <div className="inline-block py-2 px-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl text-xs font-semibold animate-pulse">
        <i className="fas fa-circle text-xs mr-2"></i>
        Online
      </div>
    </div>
  );
};

const Sidebar = ({ stats, notifications }) => (
  <div className="w-80 max-xl:w-full bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl h-fit sticky top-28 max-xl:static">
    <ProfileCard /> {/* Integrated ProfileCard */}
    <div className="grid grid-cols-2 max-xl:grid-cols-4 max-md:grid-cols-2 gap-4 mb-6">
      <StatCard value={stats.active} label="Active Complaints" />
      <StatCard value={stats.pending} label="Pending" />
      <StatCard value={stats.inProgress} label="In Progress" />
      <StatCard value={stats.urgent} label="Urgent" />
    </div>
    <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3">
      <i className="fas fa-bell"></i> Notifications
    </h3>
    {notifications.map(n => <NotificationItem key={n.id} {...n} />)}
  </div>
);

const ComplaintsTable = ({ complaints }) => (
  <>
    <h3 className="mb-5 text-blue-800 flex items-center gap-3">
      <i className="fas fa-list"></i> Latest Complaints
    </h3>
    <div className="overflow-hidden rounded-xl shadow-lg">
      <table className="w-full border-separate border-spacing-0 mb-8 bg-white">
        <thead className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
          <tr>
            <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-hashtag"></i> ID</th>
            <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-calendar"></i> Date</th>
            <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-flag"></i> Status</th>
            <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-tools"></i> Service</th>
            <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-map-marker-alt"></i> Ward</th>
            <th className="p-4 text-left font-semibold text-sm"><i className="fas fa-eye"></i> Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => <ComplaintRow key={c.id} {...c} />)}
        </tbody>
      </table>
    </div>
  </>
);

const WardChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.data,
            backgroundColor: ['#1e40af', '#1e3a8a', '#3b82f6', '#60a5fa', '#8b5cf6', '#c084fc'], // Added more colors
            borderColor: '#ffffff',
            borderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 20, font: { size: 14 } } },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let total = context.dataset.data.reduce((a, b) => a + b, 0);
                  let percentage = ((context.raw / total) * 100).toFixed(1);
                  return `${context.label}: ${context.raw} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-lg mt-5 border border-white/20">
      <h3 className="text-xl text-center mb-5 text-blue-800 font-semibold flex items-center justify-center gap-3">
        <i className="fas fa-chart-pie"></i> Complaints by Ward
      </h3>
      <div className="relative h-80 mt-5">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

const ActionButtonsGrid = ({ actions }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {actions.map((action, index) => <ActionButton key={index} {...action} />)}
    </div>
);

const MainContent = ({ stats, complaints, wardData, actionButtons }) => (
  <div className="flex-grow bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
    <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
      <h2 className="text-3xl text-gray-800 flex items-center gap-3">
        <i className="fas fa-chart-line"></i> Dashboard Overview
      </h2>
      <div className="text-sm text-gray-600">
        <i className="fas fa-calendar"></i> Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <DashboardCard icon="fas fa-clipboard-list" value={stats.total} label="Total Complaints" />
      <DashboardCard icon="fas fa-clock" value={stats.active} label="Active Cases" />
      <DashboardCard icon="fas fa-check-circle" value={stats.resolvedToday} label="Resolved Today" />
      <DashboardCard icon="fas fa-users" value={stats.activeWards} label="Active Wards" />
    </div>

    <ComplaintsTable complaints={complaints} />
    <WardChart data={wardData} />
    <ActionButtonsGrid actions={actionButtons} />
  </div>
);


// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { backendUrl } = useAppContext(); // Get backendUrl from context

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Optionally set some default/error state
      }
    };

    fetchDashboardData();
  }, [backendUrl]); // Re-fetch if backendUrl changes

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-700 flex items-center justify-center text-white">
        <div className="text-2xl">
            <i className="fas fa-spinner fa-spin mr-3"></i>Loading Dashboard...
        </div>
      </div>
    );
  }

if(!dashboardData){

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-700 text-gray-800">
      <AdminNavbar />
      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)] max-xl:flex-col">
        <Sidebar stats={dashboardData.stats} notifications={dashboardData.notifications} />
        <MainContent 
            stats={dashboardData.stats} 
            complaints={dashboardData.complaints} 
            wardData={dashboardData.wardData}
            actionButtons={dashboardData.actionButtons}
        />
      </div>
    </div>
  );
};
}


export default AdminDashboard;