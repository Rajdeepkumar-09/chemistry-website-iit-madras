import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import Login from './pages/Login';                    
import AdminDashboard from './pages/AdminDashboard';  
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Navbar from './components/Navbar'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      
      {/* Our Secure Portal Navbar (It automatically hides on /login and /) */}
      <Navbar />

      <Routes>
        
        {/* ==========================================
            ZONE 1: PUBLIC WEBSITE (Uses Layout) 
            ========================================== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Placeholder />} />
        </Route>

        {/* ==========================================
            ZONE 2: SECURE PORTAL (No Layout Wrapper!) 
            ========================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;