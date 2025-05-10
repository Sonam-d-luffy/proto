// // import axios from 'axios';

// // import React, { useContext, useEffect, useState } from 'react';
// // import { usePollutionContext } from '../components/PollutionContext';

// // const ReportCard = () => {
// //     const { currentUser } = usePollutionContext();
// //     const [reports, setReports] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [summary , setSummary] = useState({})

// //     const API_URL = 'http://localhost:5000/api/reports';

// //     const fetchReports = async () => {
// //       if (!currentUser?.id) return;

// //       setLoading(true); // Set loading to true before starting the fetch

// //       try {
// //         console.log('Requesting reports for user ID:', currentUser.id); // Log user id for debugging
// //         const res = await axios.get(API_URL, {
// //           params: { user_id: currentUser.id },
// //         });

// //         if (res.status === 200) {
// //           console.log('Reports received:', res.data); // Log the received reports for debugging
// //           setReports(res.data);
// //       } else {
// //           console.error('Error: Failed to fetch reports');
// //       }
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       } finally {
// //         setLoading(false); // Set loading to false after the fetch is done
// //       }
// //     };

// //     const deleteReport = async (id) => {
// //       if (window.confirm('Are you sure you want to delete the report')) {
// //         try {
// //           await axios.delete(`${API_URL}/${id}`);
// //           setReports(reports.filter((r) => r._id !== id));
// //         } catch (error) {
// //           console.error(error);
// //         }
// //       }
// //     };

// //     const editReports = async (report) => {
// //       const newDesc = prompt('Edit Description', report.desc);
// //       if (newDesc && newDesc !== report.desc) {
// //         try {
// //           const res = await axios.put(`${API_URL}/${report._id}`, { desc: newDesc });
// //           const updatedReport = res.data;
// //           setReports((prev) => prev.map((r) => (r._id === report._id ? updatedReport : r)));
// //         } catch (error) {
// //           console.error(error);
// //         }
// //       }
// //     };

// //     useEffect(() => {
// //       console.log('Current User:', currentUser); // Log the current user for debugging
// //       if (currentUser?.id) {
// //         fetchReports();
// //       }
// //     }, [currentUser]);

// //     useEffect(() => {
// //       console.log('Fetched Reports:', reports); // Log reports after they are updated
// //     }, [reports]);

// //     const timeAgo = (timestamp) => {
// //       const now = new Date();
// //       const created = new Date(timestamp);
// //       const diffMs = now - created;
// //       const diffSec = Math.floor(diffMs / 1000);
// //       const diffMin = Math.floor(diffSec / 60);
// //       const diffHr = Math.floor(diffMin / 60);
// //       const diffDay = Math.floor(diffHr / 24);

// //       if (diffSec < 60) return `${diffSec} seconds ago`;
// //       if (diffMin < 60) return `${diffMin} minutes ago`;
// //       if (diffHr < 24) return `${diffHr} hours ago`;
// //       return `${diffDay} days ago`;
// //     };
// //     // const summarizeReport = async (reportId, description) => {
// //     //   try {
// //     //     const res = await axios.post('http://localhost:5000/api/reports/summarize', {
// //     //       text: description,
// //     //     });
// //     //     setSummary(prev => ({
// //     //       ...prev,
// //     //       [reportId]: res.data.summary,
// //     //     }));
// //     //     console.log("Summary:", res.data.summary);
// //     //   } catch (err) {
// //     //     console.error("Error summarizing:", err);
// //     //   }
// //     // };


    
// //     if (!currentUser) return <div>Please log in to view reports.</div>;
// //     if (loading) return <div>Loading reports...</div>; // Show loading state
// //     if (!reports.length) return <div>No reports found.</div>;

// //     return (
// //       <div className="report-list">
// //         <div className="report-header">
// //           <h2>Reports issued by you</h2>
// //         </div>
// //         {reports.map((report, i) => {
// //           const isOwner = currentUser && currentUser.id === report.user_id;
// //           const timeSinceUpload = report.createdAt ? timeAgo(report.createdAt) : 'Unknown timing';
// //        return (
// //             <div className='reportCard-container' key={i}>
// //               <div className="report-img">
// //               {report.img && (
// //                 <div className="rc-img">
// //                   <img src={report.img} alt="" />
// //                 </div>
// //               )}
// //               </div>
// //               <div className="rpt-info">
// //                 <div className="pollution-type"><strong>Pollution Type :</strong> {report.type}</div>
// //                 <div className="pollution-desc"><strong>Description : </strong>{report.desc}</div>
// //                 <p><strong>Time : </strong>{new Date(report.createdAt).toLocaleString()}</p>
// //                 <div className="pollution-date">⏱️ {timeSinceUpload}</div>

// //                 <div className="pollution-location">📍 {report.locationName}</div>
// //               {isOwner && (
// //                 <div className="rpt-actions">
// //                   <button className='edit' onClick={() => editReports(report)}>Edit</button>
// //                   <button className='delete' onClick={() => deleteReport(report._id)}>Delete</button>
// //                   {summary[report._id] && (
// //   <div className="bg-gray-100 p-2 mt-2 rounded">
// //     <strong>Summary:</strong> {summary[report._id]}
// //   </div>
// // )}
// //                   <button className='summarize' onClick={() => summarizeReport(report._id , report.desc)}>Summarize</button>
// //                 </div>
                
// //               )}
   
// //               </div>

// //             </div>
// //           );
   
// //         })}
// //       </div>
// //     );
// // };

// // export default ReportCard;

// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { usePollutionContext } from '../components/PollutionContext';

// const ReportCard = () => {
//   const { currentUser } = usePollutionContext();
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [summary , setSummary] = useState({})

//   const API_URL = 'http://localhost:5000/api/reports';

//   const fetchReports = async () => {
//     if (!currentUser?.id) return;

//     setLoading(true); // Set loading to true before starting the fetch

//     try {
//       console.log('Requesting reports for user ID:', currentUser.id); // Log user id for debugging
//       const res = await axios.get(API_URL, {
//         params: { user_id: currentUser.id },
//       });

//       if (res.status === 200) {
//         console.log('Reports received:', res.data); // Log the received reports for debugging
//         setReports(res.data);
//     } else {
//         console.error('Error: Failed to fetch reports');
//     }
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     } finally {
//       setLoading(false); // Set loading to false after the fetch is done
//     }
//   };

//   const deleteReport = async (id) => {
//     if (window.confirm('Are you sure you want to delete the report')) {
//       try {
//         await axios.delete(`${API_URL}/${id}`);
//         setReports(reports.filter((r) => r._id !== id));
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const editReports = async (report) => {
//     const newDesc = prompt('Edit Description', report.desc);
//     if (newDesc && newDesc !== report.desc) {
//       try {
//         const res = await axios.put(`${API_URL}/${report._id}`, { desc: newDesc });
//         const updatedReport = res.data;
//         setReports((prev) => prev.map((r) => (r._id === report._id ? updatedReport : r)));
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   useEffect(() => {
//     console.log('Current User:', currentUser); // Log the current user for debugging
//     if (currentUser?.id) {
//       fetchReports();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     console.log('Fetched Reports:', reports); // Log reports after they are updated
//   }, [reports]);

//   const timeAgo = (timestamp) => {
//     const now = new Date();
//     const created = new Date(timestamp);
//     const diffMs = now - created;
//     const diffSec = Math.floor(diffMs / 1000);
//     const diffMin = Math.floor(diffSec / 60);
//     const diffHr = Math.floor(diffMin / 60);
//     const diffDay = Math.floor(diffHr / 24);

//     if (diffSec < 60) return `${diffSec} seconds ago`;
//     if (diffMin < 60) return `${diffMin} minutes ago`;
//     if (diffHr < 24) return `${diffHr} hours ago`;
//     return `${diffDay} days ago`;
//   };
//   // const summarizeReport = async (reportId, description) => {
//   //   try {
//   //     const res = await axios.post('http://localhost:5000/api/reports/summarize', {
//   //       text: description,
//   //     });
//   //     setSummary(prev => ({
//   //       ...prev,
//   //       [reportId]: res.data.summary,
//   //     }));
//   //     console.log("Summary:", res.data.summary);
//   //   } catch (err) {
//   //     console.error("Error summarizing:", err);
//   //   }
//   // };


  

//   if (!currentUser) return <div className="text-center mt-10 text-gray-600">Please log in to view reports.</div>;
//   if (loading) return <div className="text-center mt-10 text-blue-500">Loading reports...</div>;
//   if (!reports.length) return <div className="text-center mt-10 text-gray-500">No reports found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">📋 Reports Issued By You</h2>

//       <div className="grid gap-6">
//         {reports.map((report, i) => {
//           const isOwner = currentUser && currentUser.id === report.user_id;
//           const timeSinceUpload = report.createdAt ? timeAgo(report.createdAt) : 'Unknown timing';

//           return (
//             <div
//               key={i}
//               className="bg-white shadow-md hover:shadow-lg transition duration-300 border rounded-xl overflow-hidden"
//             >
//               {report.img && (
//                 <img
//                   src={report.img}
//                   alt="Report"
//                   className="w-full h-60 object-cover"
//                 />
//               )}

//               <div className="p-4 md:p-6 space-y-2">
//                 <div className="text-lg font-medium text-gray-800">
//                   <strong>Pollution Type:</strong> {report.type}
//                 </div>

//                 <div className="text-gray-700">
//                   <strong>Description:</strong> {report.desc}
//                 </div>

//                 <div className="text-sm text-gray-500">
//                   <strong>Time:</strong> {new Date(report.createdAt).toLocaleString()}
//                 </div>

//                 <div className="text-sm text-gray-500">⏱️ {timeSinceUpload}</div>
//                 <div className="text-sm text-gray-500">📍 {report.locationName}</div>

//                 {isOwner && (
//                   <div className="pt-4 flex flex-wrap gap-3">
//                     <button
//                       onClick={() => editReports(report)}
//                       className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => deleteReport(report._id)}
//                       className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
//                     >
//                       🗑️ Delete
//                     </button>
                  
//                   </div>
//                 )}

             
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ReportCard;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePollutionContext } from '../components/PollutionContext';

const ReportCard = () => {
  const { currentUser } = usePollutionContext();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({});
  const [expandedReport, setExpandedReport] = useState(null);

  const API_URL = 'http://localhost:5000/api/reports';

  const fetchReports = async () => {
    if (!currentUser?.id) return;

    setLoading(true);

    try {
      console.log('Requesting reports for user ID:', currentUser.id);
      const res = await axios.get(API_URL, {
        params: { user_id: currentUser.id },
      });

      if (res.status === 200) {
        console.log('Reports received:', res.data);
        setReports(res.data);
      } else {
        console.error('Error: Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    if (window.confirm('Are you sure you want to delete the report')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setReports(reports.filter((r) => r._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editReports = async (report) => {
    const newDesc = prompt('Edit Description', report.desc);
    if (newDesc && newDesc !== report.desc) {
      try {
        const res = await axios.put(`${API_URL}/${report._id}`, { desc: newDesc });
        const updatedReport = res.data;
        setReports((prev) => prev.map((r) => (r._id === report._id ? updatedReport : r)));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log('Current User:', currentUser);
    if (currentUser?.id) {
      fetchReports();
    }
  }, [currentUser]);

  useEffect(() => {
    console.log('Fetched Reports:', reports);
  }, [reports]);

  const timeAgo = (timestamp) => {
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

  const toggleExpandReport = (id) => {
    if (expandedReport === id) {
      setExpandedReport(null);
    } else {
      setExpandedReport(id);
    }
  };



  if (!currentUser) 
    return (
      <div className="flex items-center justify-center h-64 text-lg font-medium text-gray-600">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Please log in to view your reports
          </div>
        </div>
      </div>
    );
  
  if (loading) 
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  
  if (!reports.length) 
    return (
      <div className="flex flex-col items-center justify-center h-64 text-lg font-medium text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>No reports found. Start reporting pollution incidents!</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Your Pollution Reports
        </h2>
        <p className="text-gray-600 mt-2">
          Track and manage the environmental issues you've reported
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(reports || []).map((report, i) => {
          const isOwner = currentUser && currentUser.id === report.user_id;
          const timeSinceUpload = report.createdAt ? timeAgo(report.createdAt) : 'Unknown timing';
          const isExpanded = expandedReport === report._id;

          return (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {report.img && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={report.img}
                    alt="Pollution report"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 m-2 rounded-full">
                    {report.type}
                  </div>
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-lg font-semibold text-gray-800">
                    {report.type}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeSinceUpload}
                  </div>
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
                    className="text-blue-500 text-sm mb-3 hover:underline"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {report.locationName}
                </div>

                {isOwner && (
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button
                      onClick={() => editReports(report)}
                      className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    
                    <button
                      onClick={() => deleteReport(report._id)}
                      className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}

                {summary[report._id] && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                    <div className="font-medium mb-1">Summary</div>
                    {summary[report._id]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportCard;
