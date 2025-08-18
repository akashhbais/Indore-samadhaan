import React, { useState, useEffect } from 'react';

// Navigation Component
const Navigation = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <svg className="w-7 h-7 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-indigo-700 bg-clip-text text-transparent">
          Admin Dashboard
        </span>
      </div>
      <div className="flex gap-8">
        <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-indigo-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
          </svg>
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-indigo-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Complaints
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-indigo-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />
          </svg>
          Departments
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gradient-to-r hover:from-blue-900 hover:to-indigo-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Profile
        </a>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = ({ onGenerateExport, exportSettings, setExportSettings }) => {
  const recentExports = [
    { name: "Monthly Report - July", date: "Aug 5, 2025" },
    { name: "Department Analysis", date: "Aug 3, 2025" },
    { name: "Weekly Summary", date: "Aug 1, 2025" }
  ];

  const handleDateRangeChange = (value) => {
    setExportSettings(prev => ({
      ...prev,
      dateRange: value,
      showCustomDates: value === 'custom'
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setExportSettings(prev => ({
      ...prev,
      includeSections: {
        ...prev.includeSections,
        [field]: checked
      }
    }));
  };

  return (
    <div className="w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl h-fit sticky top-24">
      <h3 className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        Export Settings
      </h3>
      
      <div className="bg-white/90 p-5 rounded-xl mb-5 shadow-lg">
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-800 text-sm">Date Range</label>
          <select 
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-3 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
            value={exportSettings.dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        {exportSettings.showCustomDates && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800 text-sm">From Date</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-3 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
              value={exportSettings.fromDate}
              onChange={(e) => setExportSettings(prev => ({ ...prev, fromDate: e.target.value }))}
            />
            <label className="block mb-2 mt-3 font-semibold text-gray-800 text-sm">To Date</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-3 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
              value={exportSettings.toDate}
              onChange={(e) => setExportSettings(prev => ({ ...prev, toDate: e.target.value }))}
            />
          </div>
        )}
        
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-800 text-sm">Format</label>
          <select 
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-3 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
            value={exportSettings.format}
            onChange={(e) => setExportSettings(prev => ({ ...prev, format: e.target.value }))}
          >
            <option value="pdf">PDF Report</option>
            <option value="excel">Excel Spreadsheet</option>
            <option value="csv">CSV File</option>
            <option value="json">JSON Data</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-800 text-sm">Include Sections</label>
          <div className="space-y-2">
            {[
              { key: 'summary', label: 'Summary Statistics' },
              { key: 'details', label: 'Detailed Records' },
              { key: 'charts', label: 'Charts & Graphs' },
              { key: 'departments', label: 'Department Data' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id={key}
                  checked={exportSettings.includeSections[key]}
                  onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                  className="w-4 h-4 text-blue-900 rounded focus:ring-blue-900"
                />
                <label htmlFor={key} className="text-sm font-medium text-gray-700">{label}</label>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={onGenerateExport}
          className="w-full bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-3 px-5 rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
        >
          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Generate Export
        </button>
      </div>

      <h3 className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Recent Exports
      </h3>
      <div className="bg-white/90 p-4 rounded-xl shadow-lg">
        {recentExports.map((export_, index) => (
          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 text-sm">
            <div>
              <div className="font-semibold text-gray-800">{export_.name}</div>
              <div className="text-gray-500 text-xs">{export_.date}</div>
            </div>
            <a href="#" className="text-blue-900 hover:bg-blue-900/10 p-2 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template, onSelect, isSelected }) => {
  const getIconSvg = (templateId) => {
    const iconPaths = {
      summary: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
      detailed: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />,
      department: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
      analytics: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    };
    return iconPaths[templateId] || iconPaths.summary;
  };

  return (
    <div 
      onClick={() => onSelect(template.id)}
      className={`bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden ${
        isSelected ? 'border-2 border-blue-900 bg-gradient-to-br from-blue-900/5 to-indigo-700/5' : 'border border-white/20'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 to-indigo-700"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">{template.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
        </div>
        <div className="bg-blue-900/10 p-3 rounded-lg ml-4">
          <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {getIconSvg(template.id)}
          </svg>
        </div>
      </div>
      
      <div className="mb-4">
        <ul className="space-y-1">
          {template.features.map((feature, index) => (
            <li key={index} className="text-xs text-gray-600 pl-5 relative">
              <span className="absolute left-0 text-green-600 font-bold">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-2 px-3 rounded-lg font-medium text-xs hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          Select Template
        </button>
        <button className="flex-1 bg-blue-900/10 text-blue-900 py-2 px-3 rounded-lg font-medium text-xs hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          Preview
        </button>
      </div>
    </div>
  );
};

// Report Templates Component
const ReportTemplates = ({ onTemplateSelect, selectedTemplate }) => {
  const templates = [
    {
      id: 'summary',
      title: 'Summary Report',
      description: 'Overview of all complaints with key statistics and trends.',
      features: [
        'Total complaints by status',
        'Department performance metrics', 
        'Ward-wise breakdown',
        'Response time analysis'
      ]
    },
    {
      id: 'detailed',
      title: 'Detailed Report',
      description: 'Comprehensive listing of all complaints with full details.',
      features: [
        'Complete complaint records',
        'Resolution details and notes',
        'Staff assignment history', 
        'Timeline tracking'
      ]
    },
    {
      id: 'department',
      title: 'Department Report',
      description: 'Department-specific performance and workload analysis.',
      features: [
        'Department efficiency metrics',
        'Staff utilization data',
        'Service type breakdown',
        'Performance comparisons'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Report', 
      description: 'Advanced analytics with trends, predictions and insights.',
      features: [
        'Trend analysis and patterns',
        'Seasonal complaint variations',
        'Predictive insights',
        'Performance benchmarks'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {templates.map(template => (
        <TemplateCard 
          key={template.id}
          template={template}
          onSelect={onTemplateSelect}
          isSelected={selectedTemplate === template.id}
        />
      ))}
    </div>
  );
};

// Export Preview Component
const ExportPreview = ({ isVisible, progress, status, onDownload, onSchedule, onShare }) => {
  const sampleData = [
    { id: '#23456', date: '27/07/25', type: 'Road Repair', status: 'Open', department: 'Road Maintenance', ward: 'Ward 2' },
    { id: '#23457', date: '27/07/25', type: 'Drainage', status: 'Assigned', department: 'Drainage System', ward: 'Ward 4' },
    { id: '#23458', date: '27/07/25', type: 'Electricity', status: 'Resolved', department: 'Electricity Board', ward: 'Ward 1' },
    { id: '#23459', date: '26/07/25', type: 'Street Light', status: 'Open', department: 'Street Lighting', ward: 'Ward 3' },
    { id: '#23460', date: '26/07/25', type: 'Waste Collection', status: 'Assigned', department: 'Waste Management', ward: 'Ward 1' }
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl mt-6 border border-white/20 animate-fade-in-up">
      <h3 className="flex items-center gap-3 text-xl font-semibold text-blue-900 mb-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
        </svg>
        Report Preview
      </h3>
      
      {progress > 0 && progress < 100 && (
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-5">
          <div 
            className="h-full bg-gradient-to-r from-blue-900 to-indigo-700 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {status && (
        <div className={`text-center p-4 rounded-lg mb-5 font-medium ${
          status.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : status.type === 'error'
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {status.message}
        </div>
      )}
      
      <div className="overflow-hidden rounded-xl shadow-lg bg-white mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white">
              <th className="py-3 px-3 text-left font-semibold text-xs">Complaint ID</th>
              <th className="py-3 px-3 text-left font-semibold text-xs">Date</th>
              <th className="py-3 px-3 text-left font-semibold text-xs">Type</th>
              <th className="py-3 px-3 text-left font-semibold text-xs">Status</th>
              <th className="py-3 px-3 text-left font-semibold text-xs">Department</th>
              <th className="py-3 px-3 text-left font-semibold text-xs">Ward</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                <td className="py-3 px-3">{row.id}</td>
                <td className="py-3 px-3">{row.date}</td>
                <td className="py-3 px-3">{row.type}</td>
                <td className="py-3 px-3">{row.status}</td>
                <td className="py-3 px-3">{row.department}</td>
                <td className="py-3 px-3">{row.ward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex gap-4 justify-center">
        <button 
          onClick={onDownload}
          className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Report
        </button>
        <button 
          onClick={onSchedule}
          className="bg-blue-900/10 text-blue-900 py-3 px-6 rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Schedule Export
        </button>
        <button 
          onClick={onShare}
          className="bg-blue-900/10 text-blue-900 py-3 px-6 rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.25-2.011 2.25 2.25 0 0 0-3.25 2.011Zm0-11.625a2.25 2.25 0 1 0 3.25-2.011 2.25 2.25 0 0 0-3.25 2.011Z" />
          </svg>
          Share Report
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const ExportReportsDashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null);
  const [exportSettings, setExportSettings] = useState({
    dateRange: 'last7',
    showCustomDates: false,
    fromDate: '',
    toDate: '',
    format: 'pdf',
    includeSections: {
      summary: true,
      details: true,
      charts: false,
      departments: true
    }
  });

  useEffect(() => {
    // Set default dates
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    setExportSettings(prev => ({
      ...prev,
      toDate: today.toISOString().split('T')[0],
      fromDate: weekAgo.toISOString().split('T')[0]
    }));
  }, []);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
    setProgress(0);
    setStatus(null);
    
    // Smooth scroll to preview
    setTimeout(() => {
      const previewElement = document.getElementById('preview-section');
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGenerateExport = () => {
    if (!selectedTemplate) {
      alert('Please select a report template first.');
      return;
    }
    
    setProgress(0);
    setStatus({ type: 'info', message: 'Generating report...' });
    
    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(currentProgress);
        
        setTimeout(() => {
          setStatus({ type: 'success', message: 'Report generated successfully!' });
        }, 500);
        
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 200);
  };

  const handleDownloadReport = () => {
    setStatus({ type: 'success', message: `Downloading ${exportSettings.format.toUpperCase()} report...` });
    
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Download completed successfully!' });
    }, 1500);
  };

  const handleScheduleExport = () => {
    alert('Schedule export functionality would open a dialog to set up recurring exports.');
  };

  const handleShareReport = () => {
    alert('Share report functionality would open sharing options (email, link, etc.).');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-indigo-900 text-gray-800">
      <AdminNavbar />
      
      <div className="flex gap-5 m-5 min-h-[calc(100vh-120px)]">
        <Sidebar 
          onGenerateExport={handleGenerateExport}
          exportSettings={exportSettings}
          setExportSettings={setExportSettings}
        />
        
        <div className="flex-1 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export Reports
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              Generate and download custom reports
            </div>
          </div>

          <ReportTemplates 
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
          />

          <div id="preview-section">
            <ExportPreview 
              isVisible={showPreview}
              progress={progress}
              status={status}
              onDownload={handleDownloadReport}
              onSchedule={handleScheduleExport}
              onShare={handleShareReport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReportsDashboard;