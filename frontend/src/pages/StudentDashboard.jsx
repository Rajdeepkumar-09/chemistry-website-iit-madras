import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bell, User, Calendar, FlaskConical } from 'lucide-react';

const StudentDashboard = () => {
  const [notices, setNotices] = useState([]);
  
  // 1. DYNAMIC STATE: We replaced the hardcoded dictionary with this!
  const [studentProfile, setStudentProfile] = useState({
    name: "Loading...",
    rollNumber: "...", 
    program: "...",
    semester: "-"
  });
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    // 1. Traffic Cop Security Check
    if (!token || userRole !== 'student') {
      navigate('/login');
      return;
    }

    // 2. Fetch the REAL profile data from our new API
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/student/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStudentProfile(data); // Overwrites the "Loading..." text!
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };

    // 3. Fetch Live Notices
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/notices');
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        }
      } catch (err) {
        console.error("Failed to fetch notices");
      }
    };

    // Fire both API calls at the same time and stop loading when done
    Promise.all([fetchProfile(), fetchNotices()]).then(() => setLoading(false));
    
  }, [navigate, token, userRole]);

  if (loading) return <div className="p-10 text-center font-bold text-gray-600">Loading Student Portal...</div>;

  return (
    <div className="min-h-screen bg-[#f5f6f8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-sm border border-[#e5e7eb] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#1f2937] p-4 rounded-full text-white">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1f2937]">Welcome, {studentProfile.name}</h1>
              <p className="text-gray-500 font-medium">IIT Madras Chemistry Department</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Academic Profile</div>
            <div className="text-[#b45309] font-bold text-lg">{studentProfile.rollNumber} | {studentProfile.program}</div>
            <div className="text-sm text-gray-600">Semester {studentProfile.semester}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: My Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#e5e7eb] shadow-sm">
              <h2 className="text-xl font-bold text-[#1f2937] flex items-center gap-2 mb-4">
                <BookOpen className="text-[#b45309]" size={24} />
                Current Semester Courses
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mocked Course Cards */}
                <div className="border border-gray-200 p-4 rounded-sm hover:border-[#b45309] transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-sm">CY1010</span>
                    <FlaskConical size={18} className="text-gray-400" />
                  </div>
                  <h3 className="font-bold text-gray-800">Organic Chemistry Practice</h3>
                  <p className="text-sm text-gray-500 mt-1">Prof. Exampleson</p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-sm hover:border-[#b45309] transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-sm">CS1100</span>
                    <BookOpen size={18} className="text-gray-400" />
                  </div>
                  <h3 className="font-bold text-gray-800">Intro to Python & Data Science</h3>
                  <p className="text-sm text-gray-500 mt-1">Prof. Tech</p>
                </div>
              </div>
              <button className="mt-4 text-sm font-bold text-[#b45309] hover:underline">View All Courses & Materials &rarr;</button>
            </div>
          </div>

          {/* Right Column: Live Notice Board */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#e5e7eb] shadow-sm">
              <h2 className="text-xl font-bold text-[#1f2937] flex items-center gap-2 mb-4">
                <Bell className="text-[#b45309]" size={24} />
                Department Notices
              </h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {notices.length > 0 ? (
                  notices.map(notice => (
                    <div key={notice.id} className="border-l-4 border-[#b45309] pl-4 py-2">
                      <h3 className="font-bold text-gray-800 text-sm">{notice.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Calendar size={12} />
                        <span>{notice.date.split(' ')[0]}</span>
                        <span>•</span>
                        <span>{notice.author}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">No active notices at this time.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;