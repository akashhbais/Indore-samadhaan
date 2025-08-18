import React, { useState, useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

const DepartmentsDashboard = () => {
  const [deptType, setDeptType] = useState('all');
  const [status, setStatus] = useState('all');
  const [searchDept, setSearchDept] = useState('');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize Chart.js
    if (chartRef.current && !chartInstanceRef.current) {
      // Register Chart.js components
      Chart.Chart.register(
        Chart.CategoryScale,
        Chart.LinearScale,
        Chart.BarElement,
        Chart.Title,
        Chart.Tooltip,
        Chart.Legend
      );
      
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Road Maintenance', 'Drainage', 'Electricity', 'Street Light', 'Waste Mgmt', 'Water Supply'],
          datasets: [{
            label: 'Active Cases',
            data: [15, 12, 9, 7, 11, 6],
            backgroundColor: 'rgba(30, 58, 138, 0.8)',
            borderColor: '#1e3a8a',
            borderWidth: 2
          }, {
            label: 'Efficiency %',
            data: [95, 88, 92, 90, 85, 96],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                padding: 20,
                font: {
                  size: 14,
                  weight: '500'
                },
                color: '#374151'
              }
            },
            tooltip: {
              backgroundColor: '#1e3a8a',
              titleColor: 'white',
              bodyColor: 'white',
              cornerRadius: 8
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Active Cases',
                color: '#374151',
                font: {
                  weight: '600'
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Efficiency %',
                color: '#374151',
                font: {
                  weight: '600'
                }
              },
              grid: {
                drawOnChartArea: false,
              },
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart'
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  const filterDepartments = () => {
    console.log('Filtering departments...');
  };

  useEffect(() => {
    filterDepartments();
  }, [deptType, status, searchDept]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-700 text-gray-800">
      <AdminNavbar />

      {/* Main Content */}
      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl h-fit sticky top-24">
          <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3">
            <i className="fas fa-filter"></i> Filters
          </h3>
          
          <div className="bg-white/90 p-4 rounded-xl mb-5 shadow-lg">
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800 text-sm">Department Type</label>
              <select 
                id="deptType" 
                value={deptType}
                onChange={(e) => setDeptType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10"
              >
                <option value="all">All Departments</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="utilities">Utilities</option>
                <option value="public-services">Public Services</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800 text-sm">Status</label>
              <select 
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="busy">Busy</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-800 text-sm">Search Department</label>
              <input 
                type="text" 
                id="searchDept" 
                placeholder="Enter department name..."
                value={searchDept}
                onChange={(e) => setSearchDept(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10"
              />
            </div>
          </div>

          <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3">
            <i className="fas fa-chart-bar"></i> Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="bg-gradient-to-br from-blue-800 to-blue-700 text-white p-3 rounded-lg text-center shadow-lg shadow-blue-800/30">
              <div className="text-xl font-bold mb-1">8</div>
              <div className="text-xs opacity-90">Total Depts</div>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-blue-700 text-white p-3 rounded-lg text-center shadow-lg shadow-blue-800/30">
              <div className="text-xl font-bold mb-1">6</div>
              <div className="text-xs opacity-90">Active</div>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-blue-700 text-white p-3 rounded-lg text-center shadow-lg shadow-blue-800/30">
              <div className="text-xl font-bold mb-1">2</div>
              <div className="text-xs opacity-90">Busy</div>
            </div>
            <div className="bg-gradient-to-br from-blue-800 to-blue-700 text-white p-3 rounded-lg text-center shadow-lg shadow-blue-800/30">
              <div className="text-xl font-bold mb-1">92%</div>
              <div className="text-xs opacity-90">Efficiency</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
            <h2 className="text-3xl text-gray-800 flex items-center gap-3">
              <i className="fas fa-building"></i> Departments Management
            </h2>
            <a href="#" className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-6 py-3 rounded-lg no-underline font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-xl">
              <i className="fas fa-plus"></i> Add Department
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {/* Department Cards */}
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-800 before:to-blue-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-blue-800 mb-1">Road Maintenance</h3>
                  <p className="text-gray-600 text-sm">Infrastructure & Transportation</p>
                </div>
                <div className="text-2xl text-blue-800 bg-blue-800/10 p-2 rounded-lg">
                  <i className="fas fa-road"></i>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">15</div>
                  <div className="text-xs text-gray-600 uppercase">Active Cases</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">8</div>
                  <div className="text-xs text-gray-600 uppercase">Staff</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">95%</div>
                  <div className="text-xs text-gray-600 uppercase">Efficiency</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg">View Details</a>
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-lg">Assign Task</a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-800 before:to-blue-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-blue-800 mb-1">Drainage System</h3>
                  <p className="text-gray-600 text-sm">Water Management</p>
                </div>
                <div className="text-2xl text-blue-800 bg-blue-800/10 p-2 rounded-lg">
                  <i className="fas fa-water"></i>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">12</div>
                  <div className="text-xs text-gray-600 uppercase">Active Cases</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">6</div>
                  <div className="text-xs text-gray-600 uppercase">Staff</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">88%</div>
                  <div className="text-xs text-gray-600 uppercase">Efficiency</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg">View Details</a>
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-lg">Assign Task</a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-800 before:to-blue-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-blue-800 mb-1">Electricity Board</h3>
                  <p className="text-gray-600 text-sm">Power & Utilities</p>
                </div>
                <div className="text-2xl text-blue-800 bg-blue-800/10 p-2 rounded-lg">
                  <i className="fas fa-bolt"></i>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">9</div>
                  <div className="text-xs text-gray-600 uppercase">Active Cases</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">12</div>
                  <div className="text-xs text-gray-600 uppercase">Staff</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">92%</div>
                  <div className="text-xs text-gray-600 uppercase">Efficiency</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg">View Details</a>
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-lg">Assign Task</a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-800 before:to-blue-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-blue-800 mb-1">Street Lighting</h3>
                  <p className="text-gray-600 text-sm">Public Safety & Lighting</p>
                </div>
                <div className="text-2xl text-blue-800 bg-blue-800/10 p-2 rounded-lg">
                  <i className="fas fa-lightbulb"></i>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">7</div>
                  <div className="text-xs text-gray-600 uppercase">Active Cases</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">5</div>
                  <div className="text-xs text-gray-600 uppercase">Staff</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">90%</div>
                  <div className="text-xs text-gray-600 uppercase">Efficiency</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg">View Details</a>
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-lg">Assign Task</a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-800 before:to-blue-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-blue-800 mb-1">Waste Management</h3>
                  <p className="text-gray-600 text-sm">Sanitation & Environment</p>
                </div>
                <div className="text-2xl text-blue-800 bg-blue-800/10 p-2 rounded-lg">
                  <i className="fas fa-recycle"></i>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">11</div>
                  <div className="text-xs text-gray-600 uppercase">Active Cases</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">10</div>
                  <div className="text-xs text-gray-600 uppercase">Staff</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">85%</div>
                  <div className="text-xs text-gray-600 uppercase">Efficiency</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg">View Details</a>
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-lg">Assign Task</a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-800 before:to-blue-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-blue-800 mb-1">Water Supply</h3>
                  <p className="text-gray-600 text-sm">Water Distribution</p>
                </div>
                <div className="text-2xl text-blue-800 bg-blue-800/10 p-2 rounded-lg">
                  <i className="fas fa-tint"></i>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">6</div>
                  <div className="text-xs text-gray-600 uppercase">Active Cases</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">7</div>
                  <div className="text-xs text-gray-600 uppercase">Staff</div>
                </div>
                <div className="text-center py-2 bg-blue-800/5 rounded-lg">
                  <div className="text-base font-bold text-blue-800 mb-0.5">96%</div>
                  <div className="text-xs text-gray-600 uppercase">Efficiency</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-lg">View Details</a>
                <a href="#" className="flex-1 px-3 py-2 rounded-lg no-underline font-medium text-sm text-center transition-all duration-300 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-lg">Assign Task</a>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg mt-5">
            <h3 className="text-xl text-center mb-5 text-blue-800 font-semibold flex items-center justify-center gap-3">
              <i className="fas fa-chart-line"></i> Department Performance Overview
            </h3>
            <div className="relative h-80 mt-5">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsDashboard;