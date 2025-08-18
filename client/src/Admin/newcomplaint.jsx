import React, { useState, useEffect, useRef } from 'react';

const AddComplaintForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    altPhone: '',
    ward: '',
    location: '',
    address: '',
    serviceType: '',
    department: '',
    title: '',
    description: '',
    priority: ''
  });

  // UI state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Please fill in all required fields.');
  const [complaintId, setComplaintId] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Location suggestions data
  const allLocationSuggestions = [
    'Main Street', 'Central Plaza', 'Market Area', 'Hospital Road', 'School Zone',
    'Railway Station', 'Bus Stand', 'Park Avenue', 'Industrial Area', 'Residential Colony'
  ];

  // Department mapping
  const departmentMapping = {
    'road': 'road_maintenance',
    'drainage': 'drainage_system',
    'electricity': 'electricity_board',
    'streetlight': 'street_lighting',
    'waste': 'waste_management',
    'water': 'water_supply'
  };

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('complaintDraft');
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      setFormData(prev => ({ ...prev, ...draftData }));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-assign department based on service type
    if (name === 'serviceType' && departmentMapping[value]) {
      setFormData(prev => ({ ...prev, department: departmentMapping[value] }));
    }
  };

  // Handle location input with suggestions
  const handleLocationInput = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, location: value }));
    
    if (value.length > 0) {
      const filtered = allLocationSuggestions.filter(location => 
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const selectLocation = (location) => {
    setFormData(prev => ({ ...prev, location }));
    setShowLocationSuggestions(false);
  };

  // Template loading functions
  const loadTemplate = (type) => {
    const templates = {
      road: {
        title: 'Road repair needed',
        serviceType: 'road',
        description: 'Road has developed potholes and requires immediate repair.'
      },
      drainage: {
        title: 'Drainage blockage issue',
        serviceType: 'drainage',
        description: 'Drainage system is blocked causing water logging in the area.'
      },
      electricity: {
        title: 'Power outage complaint',
        serviceType: 'electricity',
        description: 'Electricity supply has been disrupted in the area.'
      },
      streetlight: {
        title: 'Street light not working',
        serviceType: 'streetlight',
        description: 'Street light is not functioning properly, creating safety concerns.'
      }
    };

    const template = templates[type];
    if (template) {
      setFormData(prev => ({
        ...prev,
        title: template.title,
        serviceType: template.serviceType,
        description: template.description,
        department: departmentMapping[template.serviceType] || ''
      }));
    }
  };

  // Priority selection
  const selectPriority = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  // File upload handling
  const handleFileUpload = (files) => {
    const newFiles = [];
    
    for (let file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        continue;
      }
      newFiles.push(file);
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <i className="fas fa-image"></i>;
    } else if (fileType === 'application/pdf') {
      return <i className="fas fa-file-pdf"></i>;
    } else if (fileType.includes('word')) {
      return <i className="fas fa-file-word"></i>;
    }
    return <i className="fas fa-file"></i>;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'ward', 'location', 'address', 'serviceType', 'title', 'description'];
    let isValid = true;
    
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        isValid = false;
      }
    }
    
    if (!formData.priority) {
      isValid = false;
      setErrorMessage('Please select a priority level.');
    }
    
    if (!isValid) {
      setShowError(true);
      setShowSuccess(false);
      return;
    }
    
    setShowError(false);
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      const newComplaintId = Math.floor(Math.random() * 90000) + 10000;
      setComplaintId(newComplaintId.toString());
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        fullName: '', phone: '', email: '', altPhone: '',
        ward: '', location: '', address: '', serviceType: '',
        department: '', title: '', description: '', priority: ''
      });
      setUploadedFiles([]);
      setIsSubmitting(false);
    }, 2000);
  };

  // Clear form
  const clearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data?')) {
      setFormData({
        fullName: '', phone: '', email: '', altPhone: '',
        ward: '', location: '', address: '', serviceType: '',
        department: '', title: '', description: '', priority: ''
      });
      setUploadedFiles([]);
      setShowSuccess(false);
      setShowError(false);
    }
  };

  // Save draft
  const saveDraft = () => {
    localStorage.setItem('complaintDraft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(Array.from(files));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-700 text-gray-800">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-white/20">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-700 bg-clip-text text-transparent flex items-center gap-3">
          <i className="fas fa-tachometer-alt"></i>
          Admin Dashboard
        </div>
        <div className="flex gap-8">
          <a href="dashboard.html" className="text-gray-800 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 hover:text-white hover:-translate-y-0.5">
            <i className="fas fa-home"></i> Dashboard
          </a>
          <a href="complaints.html" className="text-gray-800 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 hover:text-white hover:-translate-y-0.5">
            <i className="fas fa-exclamation-triangle"></i> Complaints
          </a>
          <a href="departments.html" className="text-gray-800 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 hover:text-white hover:-translate-y-0.5">
            <i className="fas fa-building"></i> Departments
          </a>
          <a href="profile.html" className="text-gray-800 no-underline font-medium text-base px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700 hover:text-white hover:-translate-y-0.5">
            <i className="fas fa-user"></i> Profile
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex m-5 gap-5 min-h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl h-fit sticky top-24">
          <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3">
            <i className="fas fa-rocket"></i> Quick Actions
          </h3>
          
          <div className="bg-white/90 p-5 rounded-xl mb-5 shadow-lg">
            <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer mb-2 hover:bg-blue-800/10 hover:translate-x-1" onClick={() => loadTemplate('road')}>
              <div className="text-blue-800 w-5 text-center"><i className="fas fa-road"></i></div>
              <div className="text-sm font-medium text-gray-800">Road Repair Template</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer mb-2 hover:bg-blue-800/10 hover:translate-x-1" onClick={() => loadTemplate('drainage')}>
              <div className="text-blue-800 w-5 text-center"><i className="fas fa-water"></i></div>
              <div className="text-sm font-medium text-gray-800">Drainage Issue Template</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer mb-2 hover:bg-blue-800/10 hover:translate-x-1" onClick={() => loadTemplate('electricity')}>
              <div className="text-blue-800 w-5 text-center"><i className="fas fa-bolt"></i></div>
              <div className="text-sm font-medium text-gray-800">Electricity Template</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer mb-2 hover:bg-blue-800/10 hover:translate-x-1" onClick={() => loadTemplate('streetlight')}>
              <div className="text-blue-800 w-5 text-center"><i className="fas fa-lightbulb"></i></div>
              <div className="text-sm font-medium text-gray-800">Street Light Template</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-800/10 hover:translate-x-1" onClick={clearForm}>
              <div className="text-blue-800 w-5 text-center"><i className="fas fa-eraser"></i></div>
              <div className="text-sm font-medium text-gray-800">Clear Form</div>
            </div>
          </div>

          <h3 className="mb-5 text-xl text-gray-800 flex items-center gap-3">
            <i className="fas fa-info-circle"></i> Form Tips
          </h3>
          <div className="bg-white/90 p-4 rounded-xl shadow-lg">
            <div className="text-sm text-gray-600 mb-2 pl-5 relative leading-relaxed before:content-['💡'] before:absolute before:left-0 before:top-0">Provide detailed descriptions for faster resolution</div>
            <div className="text-sm text-gray-600 mb-2 pl-5 relative leading-relaxed before:content-['💡'] before:absolute before:left-0 before:top-0">Include photos or documents when possible</div>
            <div className="text-sm text-gray-600 mb-2 pl-5 relative leading-relaxed before:content-['💡'] before:absolute before:left-0 before:top-0">Set appropriate priority based on urgency</div>
            <div className="text-sm text-gray-600 mb-2 pl-5 relative leading-relaxed before:content-['💡'] before:absolute before:left-0 before:top-0">Verify location details for accurate assignment</div>
            <div className="text-sm text-gray-600 pl-5 relative leading-relaxed before:content-['💡'] before:absolute before:left-0 before:top-0">Contact information helps with follow-ups</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
            <h2 className="text-3xl text-gray-800 flex items-center gap-3">
              <i className="fas fa-plus-circle"></i> Add New Complaint
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-800 to-blue-700 text-white text-xs font-medium">Step 1 of 3</div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-500/10 text-green-600 px-5 py-4 rounded-lg mb-5 border border-green-500/20 flex items-center gap-3">
              <i className="fas fa-check-circle"></i>
              <span>Complaint submitted successfully! ID: #{complaintId}</span>
            </div>
          )}

          {/* Error Message */}
          {showError && (
            <div className="bg-red-500/10 text-red-600 px-5 py-4 rounded-lg mb-5 border border-red-500/20 flex items-center gap-3">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20" onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-3 pb-2 border-b-2 border-blue-800/10">
                <i className="fas fa-user"></i>
                Contact Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm">Alternate Contact</label>
                  <input
                    type="tel"
                    name="altPhone"
                    value={formData.altPhone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-3 pb-2 border-b-2 border-blue-800/10">
                <i className="fas fa-map-marker-alt"></i>
                Location Details
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Ward <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                    required
                  >
                    <option value="">Select Ward</option>
                    <option value="ward1">Ward 1</option>
                    <option value="ward2">Ward 2</option>
                    <option value="ward3">Ward 3</option>
                    <option value="ward4">Ward 4</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Area/Locality <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleLocationInput}
                      placeholder="Start typing area name..."
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5 w-full"
                      required
                    />
                    {showLocationSuggestions && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                        {locationSuggestions.map((location, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 cursor-pointer border-b border-gray-200 transition-colors hover:bg-blue-800/5 last:border-b-0"
                            onClick={() => selectLocation(location)}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Complete Address <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Provide detailed address with landmarks..."
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5 resize-vertical min-h-[120px]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Complaint Details */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-3 pb-2 border-b-2 border-blue-800/10">
                <i className="fas fa-exclamation-triangle"></i>
                Complaint Details
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Service Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                    required
                  >
                    <option value="">Select Service Type</option>
                    <option value="road">Road Repair</option>
                    <option value="drainage">Drainage</option>
                    <option value="electricity">Electricity</option>
                    <option value="streetlight">Street Light</option>
                    <option value="waste">Waste Management</option>
                    <option value="water">Water Supply</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                  >
                    <option value="">Auto-assign based on service type</option>
                    <option value="road_maintenance">Road Maintenance</option>
                    <option value="drainage_system">Drainage System</option>
                    <option value="electricity_board">Electricity Board</option>
                    <option value="street_lighting">Street Lighting</option>
                    <option value="waste_management">Waste Management</option>
                    <option value="water_supply">Water Supply</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Complaint Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief description of the issue"
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Detailed Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed description of the problem, when it started, how it affects you..."
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 focus:-translate-y-0.5 resize-vertical min-h-[120px]"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    Priority Level <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {['low', 'medium', 'high', 'urgent'].map((priority) => (
                      <div
                        key={priority}
                        className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 relative hover:-translate-y-0.5 hover:shadow-lg ${
                          formData.priority === priority 
                            ? `border-4 -translate-y-0.5 shadow-lg ${priority === 'low' ? 'border-green-500 bg-green-500/5' : priority === 'medium' ? 'border-yellow-500 bg-yellow-500/5' : priority === 'high' ? 'border-red-500 bg-red-500/5' : 'border-red-600 bg-red-600/5'}`
                            : `border-gray-300 ${priority === 'low' ? 'hover:border-green-500 hover:bg-green-500/5' : priority === 'medium' ? 'hover:border-yellow-500 hover:bg-yellow-500/5' : priority === 'high' ? 'hover:border-red-500 hover:bg-red-500/5' : 'hover:border-red-600 hover:bg-red-600/5'}`
                        }`}
                        onClick={() => selectPriority(priority)}
                      >
                        <div className="text-xl mb-2">
                          {priority === 'low' && '🟢'}
                          {priority === 'medium' && '🟡'}
                          {priority === 'high' && '🟠'}
                          {priority === 'urgent' && '🔴'}
                        </div>
                        <div className="font-semibold text-xs uppercase">{priority}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="mb-8">
              <div className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-3 pb-2 border-b-2 border-blue-800/10">
                <i className="fas fa-paperclip"></i>
                Attachments (Optional)
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col">
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer relative ${
                      isDragOver 
                        ? 'border-blue-800 bg-blue-800/5 -translate-y-0.5' 
                        : 'border-gray-400 hover:border-blue-800 hover:bg-blue-800/5 hover:-translate-y-0.5'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*,application/pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
                      className="hidden"
                    />
                    <div className="text-5xl text-gray-400 mb-4">
                      <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div className="text-base text-gray-500 mb-1">Click to upload files or drag and drop</div>
                    <div className="text-xs text-gray-400">Images, PDF, Word documents (Max 10MB each)</div>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between px-4 py-2 bg-blue-800/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-blue-800">
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{file.name}</div>
                              <div className="text-xs text-gray-600">{formatFileSize(file.size)}</div>
                            </div>
                          </div>
                          <div
                            className="text-red-600 cursor-pointer p-1 rounded transition-colors hover:bg-red-600/10"
                            onClick={() => removeFile(file.name)}
                          >
                            <i className="fas fa-times"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 mt-8 justify-end pt-5 border-t border-blue-800/10">
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 border-none flex items-center gap-2 bg-red-600/10 text-red-600 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <i className="fas fa-times"></i> Clear Form
              </button>
              <button
                type="button"
                onClick={saveDraft}
                className="px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 border-none flex items-center gap-2 bg-blue-800/10 text-blue-800 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <i className="fas fa-save"></i> Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 border-none flex items-center gap-2 bg-gradient-to-r from-blue-800 to-blue-700 text-white hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Submit Complaint
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComplaintForm;