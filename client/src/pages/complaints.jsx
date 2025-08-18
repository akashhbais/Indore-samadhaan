import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminComplaintsDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-700 text-gray-800">
      <AdminNavbar />

      {/* Main Content */}
      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)] max-xl:flex-col">
        {/* Sidebar */}
        <div className="w-80 max-xl:w-full bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl h-fit sticky top-28 max-xl:static">
          <div className="grid grid-cols-2 max-xl:grid-cols-4 max-md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg">
              <div className="text-2xl font-bold mb-1">13</div>
              <div className="text-xs opacity-90">Total Complaints</div>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg">
              <div className="text-2xl font-bold mb-1">8</div>
              <div className="text-xs opacity-90">New</div>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg">
              <div className="text-2xl font-bold mb-1">5</div>
              <div className="text-xs opacity-90">Assigned</div>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl text-center shadow-lg">
              <div className="text-2xl font-bold mb-1">3</div>
              <div className="text-xs opacity-90">Urgent</div>
            </div>
          </div>

          <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3">
            <i className="fas fa-bell"></i> Notifications
          </h3>
          
          <div className="bg-white bg-opacity-90 p-4 mb-3 rounded-xl text-sm text-gray-800 shadow-md border-l-4 border-red-500 transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden">
            <strong>⚠️ URGENT:</strong> Complaint #12345 is crossing SLA deadline!
          </div>
          <div className="bg-white bg-opacity-90 p-4 mb-3 rounded-xl text-sm text-gray-800 shadow-md border-l-4 border-cyan-400 transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden">
            <strong>🆕 NEW:</strong> New complaint #12346 has been registered.
          </div>
          <div className="bg-white bg-opacity-90 p-4 mb-3 rounded-xl text-sm text-gray-800 shadow-md border-l-4 border-green-500 transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden">
            <strong>✅ RESOLVED:</strong> Complaint #12344 has been resolved.
          </div>
          <div className="bg-white bg-opacity-90 p-4 mb-3 rounded-xl text-sm text-gray-800 shadow-md border-l-4 border-red-500 transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden">
            <strong>🔥 CRITICAL:</strong> 3 complaints due today need immediate attention!
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
            <h2 className="text-3xl text-gray-800 flex items-center gap-3">
              <i className="fas fa-list-alt"></i> Complaints Management
            </h2>
            <div className="flex gap-4 items-center flex-wrap max-md:justify-center">
              <input 
                type="text" 
                className="w-60 py-2 px-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm bg-white" 
                placeholder="🔍 Search complaints..." 
              />
              <select className="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                <option>All Status</option>
                <option>New</option>
                <option>Assigned</option>
                <option>Resolved</option>
              </select>
              <select className="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white">
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-hashtag"></i> ID
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-exclamation-circle"></i> Complaint
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-flag"></i> Priority
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-tasks"></i> Status
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-user-plus"></i> Assign
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-user-tie"></i> Assigned Head
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-calendar-alt"></i> Deadline
                  </th>
                  <th className="p-4 text-left font-semibold text-sm sticky top-0 z-10">
                    <i className="fas fa-cogs"></i> Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>101</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Street light not working in Sector 9
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Street light not working in Sector 9 - Reported by residents, affecting night visibility
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-yellow-500 shadow-md"></span>Medium
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="raj">Raj Sharma - Electrical</option>
                      <option value="priya">Priya Yadav - Maintenance</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-08</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>102</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Drainage overflow in Zone 3
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Drainage overflow in Zone 3 - Causing waterlogging and health hazards
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-red-500 shadow-md animate-pulse"></span>High
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-blue-600 text-white">Assigned</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">—</td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    <strong className="text-blue-800">Name:</strong> Priya Yadav<br/>
                    <strong className="text-blue-800">Dept:</strong> Maintenance<br/>
                    <strong className="text-blue-800">Phone:</strong> +91-9876543210
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white text-red-500 font-bold animate-pulse">2025-08-07</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>103</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Broken road near park
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Broken road near park - Large potholes causing vehicle damage
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-yellow-500 shadow-md"></span>Medium
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="raj">Raj Sharma - Civil</option>
                      <option value="deepak">Deepak Joshi - Infra</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-10</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>104</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Water leakage in Shastri Nagar
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Water leakage in Shastri Nagar - Main pipeline burst, affecting multiple households
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-red-500 shadow-md animate-pulse"></span>High
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="anita">Anita Verma - Water</option>
                      <option value="rakesh">Rakesh Mehta - Plumbing</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-09</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>105</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Garbage collection delay in Zone 5
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Garbage collection delay in Zone 5 - Accumulated waste causing hygiene issues
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-yellow-500 shadow-md"></span>Medium
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-blue-600 text-white">Assigned</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">—</td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    <strong className="text-blue-800">Name:</strong> Anita Verma<br/>
                    <strong className="text-blue-800">Dept:</strong> Waste Management<br/>
                    <strong className="text-blue-800">Phone:</strong> +91-9834567890
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white text-red-500 font-bold animate-pulse">2025-08-06</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>106</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      No water supply in Jawahar Colony
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        No water supply in Jawahar Colony - Complete supply cut for 2 days
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-red-500 shadow-md animate-pulse"></span>High
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="anita">Anita Verma - Water</option>
                      <option value="rahul">Rahul Deshmukh - Public Works</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-12</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>107</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Open manhole in Sector 4
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Open manhole in Sector 4 - Safety hazard, cover missing
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-red-500 shadow-md animate-pulse"></span>High
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-blue-600 text-white">Assigned</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">—</td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    <strong className="text-blue-800">Name:</strong> Rakesh Mehta<br/>
                    <strong className="text-blue-800">Dept:</strong> Plumbing<br/>
                    <strong className="text-blue-800">Phone:</strong> +91-9911223344
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white text-red-500 font-bold animate-pulse">2025-08-05</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>108</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Traffic signal not working near school
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Traffic signal not working near school - Creating safety risk for children
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-red-500 shadow-md animate-pulse"></span>High
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="manish">Manish Tiwari - Traffic</option>
                      <option value="raj">Raj Sharma - Electrical</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-09</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>109</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Tree fallen blocking road in Zone 1
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Tree fallen blocking road in Zone 1 - Complete road blockage after storm
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-red-500 shadow-md animate-pulse"></span>High
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="ravi">Ravi Patel - Disaster Response</option>
                      <option value="deepak">Deepak Joshi - Infra</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-11</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>110</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Street flooding during rains
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Street flooding during rains - Poor drainage causing property damage
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-yellow-500 shadow-md"></span>Medium
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-blue-600 text-white">Assigned</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">—</td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    <strong className="text-blue-800">Name:</strong> Rahul Deshmukh<br/>
                    <strong className="text-blue-800">Dept:</strong> Public Works<br/>
                    <strong className="text-blue-800">Phone:</strong> +91-9988776655
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-07</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>111</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Broken benches in public park
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Broken benches in public park - Multiple benches damaged, affecting visitors
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-green-500 shadow-md"></span>Low
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="deepak">Deepak Joshi - Infra</option>
                      <option value="priya">Priya Yadav - Maintenance</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-10</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>112</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Noise complaints from industrial unit
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Noise complaints from industrial unit - Exceeding permitted noise levels
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-yellow-500 shadow-md"></span>Medium
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-800 to-indigo-700 text-white">New</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <select className="py-1 px-2 border-2 border-gray-200 rounded text-xs bg-white cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-800 focus:shadow-sm">
                      <option>Select Head</option>
                      <option value="manish">Manish Tiwari - Pollution Control</option>
                      <option value="ravi">Ravi Patel - Zonal Admin</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    Not assigned
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-08</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="transition-all duration-300 hover:bg-indigo-50 hover:scale-105">
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <strong>113</strong>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap cursor-help relative group hover:text-blue-800">
                      Unauthorized construction near Zone 7
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white p-2 rounded text-xs whitespace-nowrap z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        Unauthorized construction near Zone 7 - Building without proper permits
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="w-2 h-2 rounded-full inline-block mr-2 bg-yellow-500 shadow-md"></span>Medium
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-700 to-blue-600 text-white">Assigned</span>
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">—</td>
                  <td className="p-4 border-b border-gray-100 text-xs bg-white leading-relaxed">
                    <strong className="text-blue-800">Name:</strong> Ravi Patel<br/>
                    <strong className="text-blue-800">Dept:</strong> Zonal Admin<br/>
                    <strong className="text-blue-800">Phone:</strong> +91-9765432100
                  </td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">2025-08-06</td>
                  <td className="p-4 border-b border-gray-100 text-sm bg-white">
                    <div className="flex gap-1">
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="py-1 px-3 border-none rounded cursor-pointer text-xs transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-green-700 to-green-600 text-white hover:-translate-y-1 hover:shadow-md">
                        <i className="fas fa-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintsDashboard