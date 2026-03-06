import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FlaskConical, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Hide the Navbar if the user is on the Login screen!
  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  // 2. Read the current user's role
  const role = localStorage.getItem('userRole') || 'User';

  // 3. The 1-Click Logout Function
  const handleLogout = () => {
    // Shred the security token
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Kick them back to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-[#1f2937] text-white shadow-md border-b-4 border-[#b45309]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: IITM Chemistry Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="bg-[#b45309] p-2 rounded-sm shadow-inner">
              <FlaskConical size={24} color="white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wide block leading-none">
                IIT Madras
              </span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Department of Chemistry
              </span>
            </div>
          </div>

          {/* Right Side: Role Badge & Logout Button */}
          <div className="flex items-center gap-6">
            
            {/* The Role Badge */}
            <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-300 bg-gray-800 px-3 py-1.5 rounded-sm border border-gray-700">
              <User size={16} className="text-[#b45309]" />
              <span className="uppercase tracking-wider">{role} PORTAL</span>
            </div>
            
            {/* The Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm font-bold transition-colors text-sm shadow-sm"
            >
              <LogOut size={16} />
              Sign Out
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;