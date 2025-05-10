import React, { useState } from "react";
import {
  User,
  FileText,
  PlusCircle,
  LogOut,
  Bell,
  Award,
  MapPin,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Calendar,
  Star,
  Edit,
  ChevronDown,
  Activity,
  Shield
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePollutionContext } from "./PollutionContext";

const UserDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Sample user data
  const userData = {
    name: "Ajay Kumar",
    loginId: "ajay.kumar@example.com",
    password: "••••••••",
    joinDate: "March 15, 2023",
    address: "123 Green Street, Eco City, EC 12345",
    phone: "+1 (555) 123-4567",
    contributions: 38,
    stars: 4.8,
    rating: "Environmental Hero",
    badges: ["Frequent Reporter", "Quick Responder", "Verified User"],
    activity: [
      { date: "May 8, 2025", action: "Reported water pollution at Riverside Park" },
      { date: "May 3, 2025", action: "Issue #24 marked as resolved" },
      { date: "Apr 29, 2025", action: "Reported illegal waste dumping" },
    ]
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlePasswordChange = (e) => {
    setPasswordDetails({
      ...passwordDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = () => {
    console.log("Password change requested:", passwordDetails);
    // Here you would handle the password change
    setShowPasswordForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex justify-between items-center border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.split(' ').map(name => name[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600">Welcome, {userData.name.split(' ')[0]}</h2>
              <p className="text-gray-600">Environmental Champion • {userData.rating}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            {/* <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all shadow hover:shadow-md">
              <LogOut size={18} />
              Logout
            </button> */}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/report" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-lg shadow-lg flex flex-col items-center transition-all transform hover:-translate-y-1"
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <PlusCircle size={28} />
                </div>
                <span className="mt-4 text-lg font-semibold">Report New Issue</span>
              </Link>
              <Link 
                to="/user/reports" 
                className="bg-white hover:shadow-lg p-6 rounded-lg border border-gray-200 flex flex-col items-center transition-all transform hover:-translate-y-1"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <FileText size={28} className="text-green-600" />
                </div>
                <span className="mt-4 text-lg font-semibold">View My Reports</span>
              </Link>
              <div 
                className="bg-white hover:shadow-lg p-6 rounded-lg border border-gray-200 flex flex-col items-center transition-all transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <User size={28} className="text-green-600" />
                </div>
                <span className="mt-4 text-lg font-semibold">My Profile</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <Activity size={20} className="mr-2" />
                Quick Stats
              </h3>
              <div className="grid sm:grid-cols-4 gap-6">
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-blue-700">12</p>
                  <p className="text-gray-600">Total Reports</p>
                </div>
                <div className="text-center bg-yellow-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">4</p>
                  <p className="text-gray-600">Pending</p>
                </div>
                <div className="text-center bg-green-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">8</p>
                  <p className="text-gray-600">Resolved</p>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">3</p>
                  <p className="text-gray-600">Badges</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                <Calendar size={20} className="mr-2" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {userData.activity.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="bg-gray-100 p-2 rounded-full mt-1">
                      <Activity size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">{item.action}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div>
            <div className={`bg-white rounded-lg shadow-lg transition-all duration-500 overflow-hidden ${showProfile ? 'max-h-screen' : 'max-h-20'}`}>
              <div 
                className="p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold flex justify-between items-center cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  <span>My Profile Details</span>
                </div>
                <ChevronDown size={20} className={`transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
              </div>
              
              <div className="p-6">
                {/* Profile Content */}
                <div className="flex flex-col items-center mb-6 pt-2">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {userData.name.split(' ').map(name => name[0]).join('')}
                  </div>
                  <h3 className="text-2xl font-bold">{userData.name}</h3>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(userData.stars) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                    ))}
                    <span className="ml-2 text-gray-700">{userData.stars}/5.0</span>
                  </div>
                  <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {userData.rating}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email/Login ID</p>
                      <p>{userData.loginId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-gray-500" />
                    <div className="flex-grow">
                      <p className="text-sm text-gray-500">Password</p>
                      <div className="flex justify-between items-center">
                        <p>{userData.password}</p>
                        <button 
                          onClick={() => setShowPasswordForm(!showPasswordForm)}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Change Form */}
                  {showPasswordForm && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600 block mb-1">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordDetails.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                              type="button"
                              onClick={handleTogglePasswordVisibility}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600 block mb-1">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordDetails.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                              type="button"
                              onClick={handleToggleNewPasswordVisibility}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600 block mb-1">Confirm Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordDetails.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => setShowPasswordForm(false)}
                            className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handlePasswordSubmit}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{userData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p>{userData.joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Contributions</p>
                      <p>{userData.contributions} reports</p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.badges.map((badge, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-blue-600 transition-all">
                    <Edit size={18} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
