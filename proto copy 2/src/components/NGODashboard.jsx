import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NgoReports = () => {
  const types = ["water", "soil", "air", "noise", "deforestation", "wildlife", "waste", "other"];
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectType, setSelectType] = useState('All');
  const [expandedReport, setExpandedReport] = useState(null);

  const fetchReports = async(latitude, longitude, maxDistance) => {
    console.log('Fetching reports with coordinates:', latitude, longitude);
    if(!latitude || !longitude){
      alert('NGO coordinates are not available');
      return;
    }
    try {
      const res = await axios.get('http://localhost:5000/api/reports/all', {
        params: { 
          lat: latitude,
          lng: longitude,
          maxDistance: maxDistance,
        }
      });
      setReports(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedCoords = localStorage.getItem('ngoCoords');
    if (storedCoords) {
      const { lat, lng } = JSON.parse(storedCoords);
      fetchReports(lat, lng, 50);
    } else {
      setLoading(false);
    }
  }, []);

  const toggleExpandReport = (id) => {
    if (expandedReport === id) {
      setExpandedReport(null);
    } else {
      setExpandedReport(id);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Water': 'from-blue-500 to-blue-600',
      'Soil': 'from-yellow-600 to-yellow-700',
      'Garbage': 'from-green-500 to-green-600',
      'Air': 'from-teal-400 to-teal-500',
      'Other': 'from-purple-500 to-purple-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Water':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'Soil':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        );
      case 'Garbage':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'Air':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        );
    }
  };

  const filteredReports = selectType === 'All' ? reports : reports.filter((report) => report.type === selectType);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now - created;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHr < 24) return `${diffHr} hours ago`;
    return `${diffDay} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
          Pollution Reports Near You
        </h2>
        <p className="text-gray-600 mt-2">
          Monitoring environmental issues in your community
        </p>
      </div>

      {/* Filter Navigation */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectType(type)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              selectType === type
                ? `bg-gradient-to-r ${getTypeColor(type)} text-white shadow-md`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-gray-600">Loading reports...</p>
          </div>
        </div>
      ) : (
        <div>
          {/* No Reports State */}
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <p className="text-xl font-semibold text-gray-700 mb-2">No reports found</p>
              <p className="text-gray-500 max-w-md">
                {selectType === 'All' 
                  ? "There are no pollution reports in your area yet." 
                  : `No ${selectType} pollution reports have been submitted in your area.`}
              </p>
            </div>
          ) : (
            /* Reports Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => {
                const isExpanded = expandedReport === report._id;
                
                return (
                  <div 
                    key={report._id} 
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {report.img && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={report.img}
                          alt={`${report.type} pollution`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className={`absolute top-0 right-0 m-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(report.type)}`}>
                          {report.type}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gradient-to-r ${getTypeColor(report.type)} text-white`}>
                          {getTypeIcon(report.type)}
                        </div>
                        <h3 className="font-semibold text-gray-800">{report.type} Pollution</h3>
                      </div>
                      
                      <div 
                        className={`text-gray-700 mb-3 ${isExpanded ? '' : 'line-clamp-3'}`}
                        onClick={() => toggleExpandReport(report._id)}
                      >
                        {report.desc}
                      </div>
                      
                      {report.desc.length > 120 && (
                        <button 
                          onClick={() => toggleExpandReport(report._id)}
                          className="text-indigo-500 text-sm mb-3 hover:underline"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {report.locationName}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="mr-2">{formatTimeAgo(report.createdAt)}</span>
                        <span className="text-xs">{new Date(report.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NgoReports;