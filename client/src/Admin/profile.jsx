import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import AdminNavbar from '../components/AdminNavbar';

// Profile Card Component
const ProfileCard = () => {
  const { admin } = useAppContext();
  return admin ? (
    <div className="text-center py-5 border-b border-black/10 mb-5">
      <div className="w-30 h-30 rounded-full bg-gradient-to-br from-blue-800 to-indigo-700 mx-auto mb-4 flex items-center justify-center text-5xl text-white relative overflow-hidden shadow-2xl shadow-blue-800/30">
        <i className="fas fa-user"></i>
      </div>
      <div className="text-2xl font-semibold text-blue-800 mb-1">{admin?.name || 'Admin Name'}</div>
      <div className="text-sm text-gray-500 mb-4">{admin?.sector || 'Administrator'}</div>
      <div className="inline-block py-2 px-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl text-xs font-semibold animate-pulse">
        <i className="fas fa-circle text-xs mr-2"></i>
        Online
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

// Quick Stats Component
const QuickStats = () => {
  const [animatedStats, setAnimatedStats] = useState({
    cases: 0,
    successRate: 0,
    responseTime: 0,
    activeWeek: 0
  });

  useEffect(() => {
    const finalStats = {
      cases: 145,
      successRate: 98.5,
      responseTime: 4.2,
      activeWeek: 12
    };

    const animateStats = () => {
      const duration = 1500;
      const steps = 50;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep >= steps) {
          setAnimatedStats(finalStats);
          clearInterval(interval);
        } else {
          setAnimatedStats({
            cases: Math.floor((finalStats.cases / steps) * currentStep),
            successRate: parseFloat(((finalStats.successRate / steps) * currentStep).toFixed(1)),
            responseTime: parseFloat(((finalStats.responseTime / steps) * currentStep).toFixed(1)),
            activeWeek: Math.floor((finalStats.activeWeek / steps) * currentStep)
          });
          currentStep++;
        }
      }, stepDuration);
    };

    animateStats();
  }, []);

  const stats = [
    { number: animatedStats.cases, label: 'Cases Handled' },
    { number: `${animatedStats.successRate}%`, label: 'Success Rate' },
    { number: animatedStats.responseTime, label: 'Avg Response Time' },
    { number: animatedStats.activeWeek, label: 'Active This Week' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-5">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg shadow-blue-800/30">
          <div className="text-xl font-bold mb-1">{stat.number}</div>
          <div className="text-xs opacity-90">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Menu Section Component
const MenuSection = ({ title, items, activeItem, onItemClick }) => {
  return (
    <div className="mb-5">
      <div className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
        {title}
      </div>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            onItemClick(item.id);
          }}
          className={`flex items-center py-3 px-4 mb-1 rounded-lg text-gray-700 no-underline transition-all duration-300 text-sm ${
            activeItem === item.id 
              ? 'bg-gradient-to-r from-blue-800 to-indigo-700 text-white transform translate-x-1' 
              : 'hover:bg-gradient-to-r hover:from-blue-800 hover:to-indigo-700 hover:text-white hover:translate-x-1'
          }`}
        >
          <i className={`${item.icon} w-5 mr-3`}></i>
          {item.text}
        </a>
      ))}
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeMenuItem, onMenuItemClick }) => {
  const profileMenuItems = [
    { id: 'personal-info', href: '#personal-info', icon: 'fas fa-user', text: 'Personal Information' },
    { id: 'account-settings', href: '#account-settings', icon: 'fas fa-cog', text: 'Account Settings' },
    { id: 'activity', href: '#activity', icon: 'fas fa-chart-line', text: 'Activity & Performance' }
  ];

  const securityMenuItems = [
    { id: 'security', href: '#security', icon: 'fas fa-shield-alt', text: 'Security Settings' },
    { id: 'notifications', href: '#notifications', icon: 'fas fa-bell', text: 'Notifications' }
  ];

  return (
    <div className="w-80 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl h-fit sticky top-24">
      <ProfileCard />
      <QuickStats />
      <MenuSection 
        title="Profile" 
        items={profileMenuItems} 
        activeItem={activeMenuItem}
        onItemClick={onMenuItemClick}
      />
      <MenuSection 
        title="Security" 
        items={securityMenuItems} 
        activeItem={activeMenuItem}
        onItemClick={onMenuItemClick}
      />
    </div>
  );
};

// Content Header Component
const ContentHeader = ({ isEditing, onToggleEdit }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
      <h2 className="text-3xl text-gray-700 flex items-center gap-3">
        <i className="fas fa-user-circle"></i> Profile Management
      </h2>
      <button 
        onClick={onToggleEdit}
        className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-3 px-5 rounded-full no-underline font-medium transition-all duration-300 flex items-center gap-2 border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-800/40"
      >
        <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'}`}></i>
        {isEditing ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  );
};

// Personal Information Section Component
const PersonalInformationSection = () => {
  const personalInfo = [
    { label: 'Full Name', value: 'Rajesh Kumar Singh' },
    { label: 'Employee ID', value: 'ADM-2024-001' },
    { label: 'Email Address', value: 'rajesh.kumar@citycouncil.gov' },
    { label: 'Phone Number', value: '+91 98765 43210' },
    { label: 'Department', value: 'Public Grievance Cell' },
    { label: 'Designation', value: 'Senior Administrator' },
    { label: 'Join Date', value: 'March 15, 2022' },
    { label: 'Office Location', value: 'Zone A, Municipal Building' }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20" id="personal-info">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-200">
        <i className="fas fa-user text-blue-800"></i>
        <h3 className="text-xl text-blue-800 font-semibold">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {personalInfo.map((info, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-800">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
              {info.label}
            </div>
            <div className="text-base text-gray-700 font-medium">
              {info.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ active, onToggle }) => {
  return (
    <div 
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${
        active ? 'bg-gradient-to-r from-blue-800 to-indigo-700' : 'bg-gray-300'
      }`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${
        active ? 'translate-x-6' : 'translate-x-0.5'
      }`}></div>
    </div>
  );
};

// Account Settings Section Component
const AccountSettingsSection = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: true,
    darkMode: false,
    twoFactorAuth: true
  });

  const handleToggle = (settingKey) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  const settingItems = [
    {
      key: 'emailNotifications',
      icon: 'fas fa-envelope',
      name: 'Email Notifications',
      desc: 'Receive updates via email',
      active: settings.emailNotifications
    },
    {
      key: 'smsAlerts',
      icon: 'fas fa-mobile-alt',
      name: 'SMS Alerts',
      desc: 'Get urgent alerts via SMS',
      active: settings.smsAlerts
    },
    {
      key: 'darkMode',
      icon: 'fas fa-moon',
      name: 'Dark Mode',
      desc: 'Switch to dark theme',
      active: settings.darkMode
    },
    {
      key: 'twoFactorAuth',
      icon: 'fas fa-shield-alt',
      name: 'Two-Factor Auth',
      desc: 'Enhanced security',
      active: settings.twoFactorAuth
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20" id="account-settings">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-200">
        <i className="fas fa-cog text-blue-800"></i>
        <h3 className="text-xl text-blue-800 font-semibold">Account Settings</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {settingItems.map((setting, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-800 to-indigo-700 text-white flex items-center justify-center text-sm">
                <i className={setting.icon}></i>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-gray-700 text-sm">
                  {setting.name}
                </div>
                <div className="text-xs text-gray-500">
                  {setting.desc}
                </div>
              </div>
            </div>
            <ToggleSwitch 
              active={setting.active} 
              onToggle={() => handleToggle(setting.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity Section Component
const ActivitySection = () => {
  const activities = [
    {
      icon: 'fas fa-check',
      text: 'Resolved complaint #23460 - Street Light repair in Ward 3',
      time: '2 hours ago'
    },
    {
      icon: 'fas fa-user-plus',
      text: 'Assigned technician to complaint #23459 - Drainage issue',
      time: '4 hours ago'
    },
    {
      icon: 'fas fa-file-alt',
      text: 'Generated monthly report for Zone A',
      time: '1 day ago'
    },
    {
      icon: 'fas fa-plus',
      text: 'Created new complaint #23461 - Road repair request',
      time: '2 days ago'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20" id="activity">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-200">
        <i className="fas fa-chart-line text-blue-800"></i>
        <h3 className="text-xl text-blue-800 font-semibold">Recent Activity</h3>
      </div>
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg mb-3 transition-all duration-300 hover:translate-x-1 hover:shadow-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-800 to-indigo-700 text-white flex items-center justify-center mr-4 flex-shrink-0">
            <i className={activity.icon}></i>
          </div>
          <div className="flex-grow">
            <div className="text-sm text-gray-700 mb-1">
              {activity.text}
            </div>
            <div className="text-xs text-gray-500">
              {activity.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Performance Metrics Section Component
const PerformanceMetricsSection = () => {
  const [animatedProgress, setAnimatedProgress] = useState({
    resolution: 0,
    response: 0,
    satisfaction: 0,
    target: 0
  });

  useEffect(() => {
    const finalValues = {
      resolution: 98.5,
      response: 92,
      satisfaction: 96,
      target: 87
    };

    setTimeout(() => {
      const animateProgress = () => {
        const duration = 1000;
        const steps = 50;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
          if (currentStep >= steps) {
            setAnimatedProgress(finalValues);
            clearInterval(interval);
          } else {
            setAnimatedProgress({
              resolution: (finalValues.resolution / steps) * currentStep,
              response: (finalValues.response / steps) * currentStep,
              satisfaction: (finalValues.satisfaction / steps) * currentStep,
              target: (finalValues.target / steps) * currentStep
            });
            currentStep++;
          }
        }, stepDuration);
      };
      animateProgress();
    }, 500);
  }, []);

  const metrics = [
    { name: 'Resolution Rate', value: 98.5, animated: animatedProgress.resolution },
    { name: 'Response Time', value: 92, animated: animatedProgress.response },
    { name: 'Customer Satisfaction', value: 96, animated: animatedProgress.satisfaction },
    { name: 'Monthly Target', value: 87, animated: animatedProgress.target }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-200">
        <i className="fas fa-trophy text-blue-800"></i>
        <h3 className="text-xl text-blue-800 font-semibold">Performance Metrics</h3>
      </div>
      {metrics.map((metric, index) => (
        <div key={index} className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700 text-sm">
              {metric.name}
            </span>
            <span className="font-semibold text-blue-800 text-sm">
              {metric.value}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-800 to-indigo-700 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${metric.animated}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 py-4 px-5 rounded-lg font-medium z-50 animate-in slide-in-from-right-full ${
      type === 'success' 
        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
        : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
    }`}>
      {message}
    </div>
  );
};

// Main Content Area Component
const ContentArea = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggleEdit = () => {
    if (isEditing) {
      setShowToast(true);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex-grow bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
      <ContentHeader isEditing={isEditing} onToggleEdit={handleToggleEdit} />
      
      <div className="grid gap-6">
        <PersonalInformationSection />
        <AccountSettingsSection />
        <ActivitySection />
        <PerformanceMetricsSection />
      </div>

      {showToast && (
        <Toast 
          message="Profile updated successfully!" 
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

// Main App Component
const AdminProfile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('personal-info');

  const handleMenuItemClick = (itemId) => {
    setActiveMenuItem(itemId);
    const element = document.getElementById(itemId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-blue-800 to-indigo-700 min-h-screen text-gray-700">
      {/* FontAwesome CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet"
      />
      
      <AdminNavbar />
      
      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)] xl:flex-row flex-col">
        <Sidebar 
          activeMenuItem={activeMenuItem} 
          onMenuItemClick={handleMenuItemClick} 
        />
        <ContentArea />
      </div>
    </div>
  );
};

export default AdminProfile;
