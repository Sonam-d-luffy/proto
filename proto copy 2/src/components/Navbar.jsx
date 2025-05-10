
import React from "react";
import { NavLink , Link} from "react-router-dom";


const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-200 font-semibold"
      : "hover:text-green-200";

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Site Name */}
        <NavLink to="/" className="text-2xl font-bold text-white">
          Pollution Reporter
        </NavLink>

        {/* Nav Links */}
        <div className="space-x-4 hidden md:flex">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/UserDashboard" className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/ngo/dashboard" className={linkClass}>NGO</NavLink>
                    <NavLink to="/login" className={linkClass}>User Login</NavLink>
                    <NavLink to="/NGOLogin" className={linkClass}>NGO Login</NavLink>
                    <Link to="/report" className="hover:text-green-200">Report Issue</Link>
                    <NavLink to="/about" className={linkClass}>About</NavLink>
                </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          {/* Future mobile menu */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
