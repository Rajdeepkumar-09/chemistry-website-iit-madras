import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Megaphone, Calendar, X, BookOpen, Clock } from 'lucide-react';

const FacultyDashboard = () => {
  const [facultyProfile, setFacultyProfile] = useState({ name: "Loading...", designation: "..." });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UPGRADED: Added deadline to the form state!
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', deadline: '' });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || userRole !== 'faculty') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate, token, userRole]);

  const fetchData = async () => {
    try {
      const profileRes = await fetch('http://127.0.0.1:8000/api/faculty/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (profileRes.ok) setFacultyProfile(await profileRes.json());

      const noticeRes = await fetch('http://127.0.0.1:8000/api/notices');
      if (noticeRes.ok) setNotices(await noticeRes.json());
      
    } catch (err) {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/faculty/publish-notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newNotice)
      });
      
      const data = await response.json();
      if (response.ok) {
        alert("✅ " + data.message);
        setIsModalOpen(false);
        // UPGRADED: Reset the deadline field too
        setNewNotice({ title: '', content: '', deadline: '' });
        fetchData(); 
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("Failed to publish notice.");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-600">Loading Faculty Portal...</div>;

  return (
    <div className="min-h-screen bg-[#f5f6f8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-sm border border-[#e5e7eb] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#b45309] p-4 rounded-full text-white">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1f2937]">Welcome, {facultyProfile.name}</h1>
              <p className="text-gray-500 font-medium">{facultyProfile.designation} | IIT Madras</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1f2937] hover:bg-black text-white px-6 py-2.5 rounded-sm font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <Megaphone size={18} /> Publish Notice
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Active Notices */}
          <div className="bg-white p-6 rounded-sm border border-[#e5e7eb] shadow-sm">
            <h2 className="text-xl font-bold text-[#1f2937] flex items-center gap-2 mb-4">
              <Bell className="text-[#b45309]" size={24} />
              Recent Department Notices
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {notices.map(notice => (
                <div key={notice.id} className="border-l-4 border-[#1f2937] pl-4 py-2 bg-gray-50 relative">
                  <h3 className="font-bold text-gray-800 pr-24">{notice.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notice.content}</p>
                  <div className="flex items-center gap-2 text-xs text-[#b45309] font-bold mt-2">
                    <Calendar size={12} /> {notice.date.split(' ')[0]} • By {notice.author}
                  </div>
                  
                  {/* Show deadline if it exists! */}
                  {notice.deadline && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                      <Clock size={10} /> Due: {notice.deadline.split(' ')[0]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats / Classes Placeholder */}
          <div className="bg-white p-6 rounded-sm border border-[#e5e7eb] shadow-sm">
            <h2 className="text-xl font-bold text-[#1f2937] flex items-center gap-2 mb-4">
              <BookOpen className="text-[#b45309]" size={24} />
              My Assigned Courses
            </h2>
            <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-sm">
              <p className="text-gray-500 font-medium">Course assignment module is currently offline.</p>
            </div>
          </div>

        </div>
      </div>

      {/* PUBLISH NOTICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1f2937] flex items-center gap-2">
                <Megaphone className="text-[#b45309]" /> New Announcement
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={24}/></button>
            </div>
            <form onSubmit={handlePublishNotice} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Notice Title</label>
                <input required type="text" className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} placeholder="e.g., Change in CY1010 Lab Schedule" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Message Content</label>
                <textarea required rows="4" className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} placeholder="Enter the full announcement details here..." />
              </div>
              
              {/* NEW: DEADLINE DATE PICKER */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Deadline Date (Optional)</label>
                <input 
                  type="date" 
                  className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none text-gray-700" 
                  value={newNotice.deadline} 
                  onChange={e => setNewNotice({...newNotice, deadline: e.target.value})} 
                />
              </div>

              <button type="submit" className="w-full bg-[#b45309] hover:bg-[#92400e] text-white font-bold py-3 mt-4 rounded-sm transition-colors">
                Broadcast to Department
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;