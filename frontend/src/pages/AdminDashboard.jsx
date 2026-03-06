import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, UserCheck, UserX, Edit, Filter, X } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // --- NEW: Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', role: 'student', first_name: '', last_name: '', 
    roll_number: '', program: 'BS', title: 'Prof.', designation: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || userRole !== 'admin') {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [navigate, token, userRole]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      setError('Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.map(user => user.id === userId ? { ...user, is_active: data.is_active } : user));
      } else alert(data.error);
    } catch (err) {
      alert('Failed to contact server.');
    }
  };

  // --- NEW: Handle Form Submission ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setIsModalOpen(false); // Close modal
        fetchUsers(); // Refresh the grid to show the new user!
        alert("✅ " + data.message);
        // Reset form
        setFormData({email: '', password: '', role: 'student', first_name: '', last_name: '', roll_number: '', program: 'BS', title: 'Prof.', designation: ''});
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("Failed to create user.");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="p-10 text-center font-bold">Loading Control Room...</div>;

  return (
    <div className="min-h-screen bg-[#f5f6f8] py-10 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1f2937] flex items-center gap-3">
              <Shield className="text-[#b45309]" size={36} />
              System Administration
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage faculty, students, and system access.</p>
          </div>
          {/* NEW: Open Modal Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#b45309] hover:bg-[#92400e] text-white px-6 py-2.5 rounded-sm font-bold shadow-sm transition-colors"
          >
            + Register New User
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 border border-[#e5e7eb] shadow-sm mb-6 flex gap-4 justify-between">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input 
              type="text" placeholder="Search by name or email..." 
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-[#b45309] rounded-sm"
            />
          </div>
          <select 
            value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 p-2 focus:outline-none focus:border-[#b45309] rounded-sm bg-white"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Data Grid */}
        <div className="bg-white border border-[#e5e7eb] shadow-sm overflow-hidden rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1f2937] text-white text-sm uppercase tracking-wider">
                <th className="p-4">User Details</th>
                <th className="p-4">Role</th>
                <th className="p-4">Profile Info</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'faculty' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{user.details}</td>
                  <td className="p-4">
                    {user.is_active ? <span className="flex items-center gap-1 text-green-600 font-semibold text-sm"><UserCheck size={16}/> Active</span> : <span className="flex items-center gap-1 text-red-600 font-semibold text-sm"><UserX size={16}/> Suspended</span>}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-3">
                    <button onClick={() => toggleUserStatus(user.id)} className={`${user.is_active ? 'text-red-500 border-red-500 hover:bg-red-50' : 'text-green-500 border-green-500 hover:bg-green-50'} border font-bold text-sm px-3 py-1 rounded-sm transition-colors`}>
                      {user.is_active ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- NEW: THE REGISTRATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Register New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={24}/></button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                  <input required type="text" className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
                  <input required type="text" className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input required type="email" className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Temporary Password</label>
                  <input required type="password" placeholder="e.g. changeme123" className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Account Role</label>
                  <select className="w-full border p-2 rounded-sm focus:border-[#b45309] focus:outline-none bg-gray-50 font-bold" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Fields: Show only if Student */}
              {formData.role === 'student' && (
                <div className="flex gap-4 bg-gray-50 p-3 border rounded-sm mt-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase">Roll Number</label>
                    <input required type="text" placeholder="e.g. CY26B001" className="w-full border p-1.5 mt-1 text-sm rounded-sm" value={formData.roll_number} onChange={e => setFormData({...formData, roll_number: e.target.value})} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase">Program</label>
                    <select className="w-full border p-1.5 mt-1 text-sm rounded-sm" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
                      <option value="BS">BS Chemistry</option>
                      <option value="MSc">MSc Chemistry</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Dynamic Fields: Show only if Faculty */}
              {formData.role === 'faculty' && (
                <div className="flex gap-4 bg-blue-50 p-3 border border-blue-100 rounded-sm mt-2">
                  <div className="w-1/3">
                    <label className="block text-xs font-bold text-blue-800 uppercase">Title</label>
                    <input required type="text" placeholder="Dr. / Prof." className="w-full border p-1.5 mt-1 text-sm rounded-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-bold text-blue-800 uppercase">Designation</label>
                    <input required type="text" placeholder="e.g. Assistant Professor" className="w-full border p-1.5 mt-1 text-sm rounded-sm" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-[#1f2937] hover:bg-black text-white font-bold py-3 mt-4 rounded-sm transition-colors">
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;