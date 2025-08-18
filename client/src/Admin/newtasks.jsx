import React, { useState, useEffect } from 'react';

// Navigation Component
const Navigation = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-2xl px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-white/20">
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent flex items-center gap-3">
        <i className="fas fa-tachometer-alt"></i>
        Admin Dashboard
      </div>
      <div className="flex gap-8">
        <a href="dashboard.html" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-indigo-700 hover:text-white hover:-translate-y-0.5 flex items-center gap-2">
          <i className="fas fa-home"></i> Dashboard
        </a>
        <a href="complaints.html" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-indigo-700 hover:text-white hover:-translate-y-0.5 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle"></i> Complaints
        </a>
        <a href="departments.html" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-indigo-700 hover:text-white hover:-translate-y-0.5 flex items-center gap-2">
          <i className="fas fa-building"></i> Departments
        </a>
        <a href="profile.html" className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
          <i className="fas fa-tasks"></i> Assign Tasks
        </a>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="w-80 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl h-fit sticky top-24">
      <h3 className="mb-5 text-xl text-gray-700 flex items-center gap-3">
        <i className="fas fa-chart-bar"></i> Task Statistics
      </h3>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg shadow-blue-800/30">
          <div className="text-2xl opacity-90">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div>
            <div className="text-xl font-bold">24</div>
            <div className="text-xs opacity-90">Pending Tasks</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg shadow-blue-800/30">
          <div className="text-2xl opacity-90">
            <i className="fas fa-user-check"></i>
          </div>
          <div>
            <div className="text-xl font-bold">18</div>
            <div className="text-xs opacity-90">Assigned Today</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-800 to-indigo-700 text-white p-4 rounded-xl flex items-center gap-4 shadow-lg shadow-blue-800/30">
          <div className="text-2xl opacity-90">
            <i className="fas fa-users"></i>
          </div>
          <div>
            <div className="text-xl font-bold">12</div>
            <div className="text-xs opacity-90">Available Staff</div>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
        <h3 className="text-blue-800 mb-5 flex items-center gap-3">
          <i className="fas fa-history"></i> Recent Assignments
        </h3>
        
        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-3 bg-white">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Road Repair - Sector 9</div>
            <div className="text-xs text-gray-500">Assigned to: Raj Sharma • 2 hours ago</div>
          </div>
          <span className="px-2 py-1 rounded-xl text-xs font-semibold uppercase bg-blue-100 text-blue-800">Assigned</span>
        </div>
        
        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-3 bg-white">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Drainage Cleaning</div>
            <div className="text-xs text-gray-500">Assigned to: Priya Yadav • 4 hours ago</div>
          </div>
          <span className="px-2 py-1 rounded-xl text-xs font-semibold uppercase bg-blue-100 text-blue-800">Assigned</span>
        </div>
        
        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-3 bg-white">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Street Light Repair</div>
            <div className="text-xs text-gray-500">Pending assignment • 1 day ago</div>
          </div>
          <span className="px-2 py-1 rounded-xl text-xs font-semibold uppercase bg-yellow-100 text-yellow-800">Pending</span>
        </div>
      </div>
    </div>
  );
};

// Task Form Component
const TaskForm = () => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('startDate');
    const deadlineInput = document.getElementById('deadline');
    if (startDateInput) startDateInput.setAttribute('min', today);
    if (deadlineInput) deadlineInput.setAttribute('min', today);
  }, []);

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
  };

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleSubmit = () => {
    if (!selectedPriority) {
      alert('Please select a priority level');
      return;
    }
    
    if (!selectedDepartment) {
      alert('Please select a department');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Task assigned successfully!');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="flex-grow bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
      <div className="mb-8 pb-5 border-b-2 border-gray-200">
        <h1 className="text-3xl text-blue-800 flex items-center gap-4 mb-3">
          <i className="fas fa-plus-circle"></i> Assign New Task
        </h1>
        <div className="text-gray-500 text-sm">
          <i className="fas fa-home"></i> Dashboard &gt; <span className="text-blue-800">Assign New Task</span>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 mb-8">
        {/* Task Information Section */}
        <div className="mb-8">
          <h3 className="text-blue-800 mb-5 text-lg flex items-center gap-3">
            <i className="fas fa-info-circle"></i> Task Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="mb-5">
              <label htmlFor="taskTitle" className="block mb-2 font-semibold text-gray-700 text-sm">Task Title *</label>
              <input 
                type="text" 
                id="taskTitle" 
                name="taskTitle" 
                required 
                placeholder="Enter task title"
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="complainId" className="block mb-2 font-semibold text-gray-700 text-sm">Related Complaint ID</label>
              <input 
                type="text" 
                id="complainId" 
                name="complainId" 
                placeholder="e.g., #12345"
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
              />
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="taskDescription" className="block mb-2 font-semibold text-gray-700 text-sm">Task Description *</label>
            <textarea 
              id="taskDescription" 
              name="taskDescription" 
              required 
              placeholder="Provide detailed description of the task..."
              className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white resize-y min-h-24 focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
            />
          </div>
        </div>

        {/* Location Details Section */}
        <div className="mb-8">
          <h3 className="text-blue-800 mb-5 text-lg flex items-center gap-3">
            <i className="fas fa-map-marker-alt"></i> Location Details
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="mb-5">
              <label htmlFor="ward" className="block mb-2 font-semibold text-gray-700 text-sm">Ward *</label>
              <select 
                id="ward" 
                name="ward" 
                required
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
              >
                <option value="">Select Ward</option>
                <option value="ward1">Ward 1</option>
                <option value="ward2">Ward 2</option>
                <option value="ward3">Ward 3</option>
                <option value="ward4">Ward 4</option>
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="zone" className="block mb-2 font-semibold text-gray-700 text-sm">Zone</label>
              <select 
                id="zone" 
                name="zone"
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
              >
                <option value="">Select Zone</option>
                <option value="zoneA">Zone A</option>
                <option value="zoneB">Zone B</option>
                <option value="zoneC">Zone C</option>
              </select>
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="address" className="block mb-2 font-semibold text-gray-700 text-sm">Specific Address</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              placeholder="Enter specific location/address"
              className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
            />
          </div>
        </div>

        {/* Priority Level Section */}
        <div className="mb-8">
          <h3 className="text-blue-800 mb-5 text-lg flex items-center gap-3">
            <i className="fas fa-flag"></i> Priority Level
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div 
              onClick={() => handlePrioritySelect('high')}
              className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 bg-white ${
                selectedPriority === 'high' 
                  ? 'border-red-600 bg-red-600 text-white' 
                  : 'border-red-600 text-red-600 hover:bg-red-50'
              }`}
            >
              <i className="fas fa-exclamation-triangle"></i><br />
              <strong>High</strong><br />
              <small>Urgent</small>
            </div>
            <div 
              onClick={() => handlePrioritySelect('medium')}
              className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 bg-white ${
                selectedPriority === 'medium' 
                  ? 'border-amber-500 bg-amber-500 text-white' 
                  : 'border-amber-500 text-amber-500 hover:bg-amber-50'
              }`}
            >
              <i className="fas fa-exclamation-circle"></i><br />
              <strong>Medium</strong><br />
              <small>Normal</small>
            </div>
            <div 
              onClick={() => handlePrioritySelect('low')}
              className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 bg-white ${
                selectedPriority === 'low' 
                  ? 'border-emerald-600 bg-emerald-600 text-white' 
                  : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <i className="fas fa-info-circle"></i><br />
              <strong>Low</strong><br />
              <small>Can Wait</small>
            </div>
          </div>
        </div>

        {/* Select Department Section */}
        <div className="mb-8">
          <h3 className="text-blue-800 mb-5 text-lg flex items-center gap-3">
            <i className="fas fa-building"></i> Select Department
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              onClick={() => handleDepartmentSelect('electrical')}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedDepartment === 'electrical'
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-800/10'
              }`}
            >
              <div className={`text-2xl mb-3 ${selectedDepartment === 'electrical' ? 'text-white' : 'text-blue-800'}`}>
                <i className="fas fa-bolt"></i>
              </div>
              <div><strong>Electrical</strong></div>
              <small>Power & Lighting</small>
            </div>
            <div 
              onClick={() => handleDepartmentSelect('roads')}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedDepartment === 'roads'
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-800/10'
              }`}
            >
              <div className={`text-2xl mb-3 ${selectedDepartment === 'roads' ? 'text-white' : 'text-blue-800'}`}>
                <i className="fas fa-road"></i>
              </div>
              <div><strong>Roads</strong></div>
              <small>Road Maintenance</small>
            </div>
            <div 
              onClick={() => handleDepartmentSelect('water')}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedDepartment === 'water'
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-800/10'
              }`}
            >
              <div className={`text-2xl mb-3 ${selectedDepartment === 'water' ? 'text-white' : 'text-blue-800'}`}>
                <i className="fas fa-tint"></i>
              </div>
              <div><strong>Water</strong></div>
              <small>Water Supply</small>
            </div>
            <div 
              onClick={() => handleDepartmentSelect('sanitation')}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedDepartment === 'sanitation'
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-800/10'
              }`}
            >
              <div className={`text-2xl mb-3 ${selectedDepartment === 'sanitation' ? 'text-white' : 'text-blue-800'}`}>
                <i className="fas fa-trash"></i>
              </div>
              <div><strong>Sanitation</strong></div>
              <small>Waste Management</small>
            </div>
            <div 
              onClick={() => handleDepartmentSelect('maintenance')}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedDepartment === 'maintenance'
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-800/10'
              }`}
            >
              <div className={`text-2xl mb-3 ${selectedDepartment === 'maintenance' ? 'text-white' : 'text-blue-800'}`}>
                <i className="fas fa-tools"></i>
              </div>
              <div><strong>Maintenance</strong></div>
              <small>General Repairs</small>
            </div>
            <div 
              onClick={() => handleDepartmentSelect('parks')}
              className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                selectedDepartment === 'parks'
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-800 hover:shadow-lg hover:shadow-blue-800/10'
              }`}
            >
              <div className={`text-2xl mb-3 ${selectedDepartment === 'parks' ? 'text-white' : 'text-blue-800'}`}>
                <i className="fas fa-tree"></i>
              </div>
              <div><strong>Parks</strong></div>
              <small>Green Spaces</small>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-8">
          <h3 className="text-blue-800 mb-5 text-lg flex items-center gap-3">
            <i className="fas fa-calendar-alt"></i> Timeline
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="mb-5">
              <label htmlFor="startDate" className="block mb-2 font-semibold text-gray-700 text-sm">Start Date</label>
              <input 
                type="date" 
                id="startDate" 
                name="startDate"
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="deadline" className="block mb-2 font-semibold text-gray-700 text-sm">Deadline *</label>
              <input 
                type="date" 
                id="deadline" 
                name="deadline" 
                required
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 bg-white focus:outline-none focus:border-blue-800 focus:shadow-lg focus:shadow-blue-800/10"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-8 pt-5 border-t-2 border-gray-200">
          <a 
            href="dashboard.html" 
            className="py-3 px-6 border-none rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 no-underline bg-gray-100 text-gray-600 border-2 border-gray-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-400/20"
          >
            <i className="fas fa-times"></i> Cancel
          </a>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="py-3 px-6 border-none rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-800 to-indigo-700 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-800/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><i className="fas fa-spinner fa-spin"></i> Assigning...</>
            ) : (
              <><i className="fas fa-paper-plane"></i> Assign Task</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-blue-800 to-indigo-700 min-h-screen text-gray-700">
      {/* FontAwesome CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet"
      />
      
      <Navigation />
      
      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)] xl:flex-row flex-col">
        <Sidebar />
        <TaskForm />
      </div>
    </div>
  );
};

export default App;