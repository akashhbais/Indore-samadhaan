import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend ,PieController} from 'chart.js';
import AdminNavbar from '../components/CitizenNavbar';

Chart.register(ArcElement, Tooltip, Legend ,PieController);

// Stat Card Component
const StatCard = ({ value, label }) => {
  return (
    <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg animate-fadeInUp">
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs opacity-90">{label}</div>
    </div>
  );
};

// Notification Component
const NotificationItem = ({ type, message, borderColor }) => {
  return (
    <div className={`bg-white bg-opacity-90 p-4 mb-3 rounded-xl text-sm text-gray-800 shadow-md border-l-4 ${borderColor} transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden animate-fadeInUp`}>
      <strong>{message}</strong>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ animatedStats }) => {
  const notifications = [
    { type: 'urgent', message: '⚠️ URGENT: Complaint #12345 is crossing SLA deadline!', borderColor: 'border-red-500' },
    { type: 'new', message: '🆕 NEW: New complaint #12346 has been registered.', borderColor: 'border-cyan-400' },
    { type: 'resolved', message: '✅ RESOLVED: Complaint #12344 has been resolved.', borderColor: 'border-green-500' },
    { type: 'critical', message: '🔥 CRITICAL: Road repair needed in Ward 2 - Safety concern!', borderColor: 'border-red-500' }
  ];

  return (
    <div className="w-80 max-xl:w-full bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl h-fit sticky top-28 max-xl:static">
      <div className="grid grid-cols-2 max-xl:grid-cols-4 max-md:grid-cols-2 gap-4 mb-6">
        <StatCard value={animatedStats.activeStat} label="Active Complaints" />
        <StatCard value={animatedStats.pendingStat} label="Pending" />
        <StatCard value={animatedStats.progressStat} label="In Progress" />
        <StatCard value={animatedStats.urgentStat} label="Urgent" />
      </div>

      <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3 animate-fadeInUp">
        <i className="fas fa-bell"></i> Notifications
      </h3>
      
      {notifications.map((notification, index) => (
        <NotificationItem 
          key={index}
          type={notification.type}
          message={notification.message}
          borderColor={notification.borderColor}
        />
      ))}
    </div>
  );
};

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
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-gradient-to-r from-red-600 to-red-500 text-white';
      case 'assigned':
        return 'bg-gradient-to-r from-blue-700 to-blue-600 text-white';
      case 'resolved':
        return 'bg-gradient-to-r from-green-600 to-green-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-500 text-white';
    }
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
const ComplaintsTable = () => {
  const complaints = [
    { id: '23456', date: '27/07/25', status: 'Open', service: 'Road Repair', ward: 'Ward 2' },
    { id: '23457', date: '27/07/25', status: 'Assigned', service: 'Drainage', ward: 'Ward 4' },
    { id: '23458', date: '27/07/25', status: 'Resolved', service: 'Electricity', ward: 'Ward 1' },
    { id: '23459', date: '27/07/25', status: 'Open', service: 'Drainage', ward: 'Ward 1' },
    { id: '23460', date: '27/07/25', status: 'Assigned', service: 'Street Light', ward: 'Ward 3' }
  ];

  return (
    <>
      <h3 className="mb-5 text-blue-800 flex items-center gap-3 animate-fadeInUp">
        <i className="fas fa-list"></i> Latest Complaints
      </h3>

      <div className="overflow-hidden rounded-xl shadow-lg animate-fadeInUp">
        <table className="w-full border-separate border-spacing-0 mb-8 bg-white">
          <thead>
            <tr className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-hashtag"></i> ID
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-calendar"></i> Date
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-flag"></i> Status
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-tools"></i> Service
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-map-marker-alt"></i> Ward
              </th>
              <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                <i className="fas fa-eye"></i> Action
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <ComplaintRow 
                key={index}
                id={complaint.id}
                date={complaint.date}
                status={complaint.status}
                service={complaint.service}
                ward={complaint.ward}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Chart Component
const WardChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'],
          datasets: [{
            data: [12, 8, 15, 5],
            backgroundColor: [
              '#1e40af',
              '#1e3a8a',
              '#3b82f6',
              '#60a5fa'
            ],
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
                font: {
                  size: 14,
                  weight: '500'
                },
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
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart'
          },
          hover: {
            animationDuration: 300
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
  }, []);

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-lg mt-5 border border-white/20 animate-fadeInUp">
      <h3 className="text-xl text-center mb-5 text-blue-800 font-semibold flex items-center justify-center gap-3">
        <i className="fas fa-chart-pie"></i> Complaints by Ward – Zone A
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
        <ActionButton 
          key={index}
          href={action.href}
          icon={action.icon}
          label={action.label}
        />
      ))}
    </div>
  );
};

// Main Content Area Component
const MainContent = ({ animatedStats }) => {
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
          <i className="fas fa-calendar"></i> Last updated: Today, 2:30 PM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {dashboardCards.map((card, index) => (
          <DashboardCard 
            key={index}
            icon={card.icon}
            value={card.value}
            label={card.label}
          />
        ))}
      </div>

      <ComplaintsTable />
      <WardChart />
      <ActionButtonsGrid />
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    activeStat: 0,
    pendingStat: 0,
    progressStat: 0,
    urgentStat: 0,
    totalCard: 0,
    activeCard: 0,
    resolvedCard: 0,
    wardCard: 0
  });

  useEffect(() => {
    // Animate statistics
    const finalValues = {
      activeStat: 25,
      pendingStat: 12,
      progressStat: 8,
      urgentStat: 5,
      totalCard: 40,
      activeCard: 25,
      resolvedCard: 15,
      wardCard: 4
    };

    const animateStats = () => {
      Object.keys(finalValues).forEach(key => {
        const finalValue = finalValues[key];
        let current = 0;
        const increment = finalValue / 30;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalValue) {
            setAnimatedStats(prev => ({ ...prev, [key]: finalValue }));
            clearInterval(timer);
          } else {
            setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, 50);
      });
    };

    animateStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-700 text-gray-800">
      <AdminNavbar />

      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)] max-xl:flex-col">
        <Sidebar animatedStats={animatedStats} />
        <MainContent animatedStats={animatedStats} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;