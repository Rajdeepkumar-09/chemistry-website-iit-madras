import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import BsAdmissions from './pages/BsAdmissions';
import Overview from './pages/Overview';
import MessageFromHead from './pages/MessageFromHead';
import Achievements from './pages/Achievements';

import Rankings from './pages/Rankings';
import FacilitiesEquipment from './pages/FacilitiesEquipment';
import History from './pages/History';
import Calendar from './pages/Calendar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      
      {/* Our Secure Portal Navbar (It automatically hides on /login and /) */}
      <Navbar />

      <Routes>
        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<Layout />}>

          {/* Index Route - Home Page */}
          <Route index element={<Home />} />

          {/* About Routes */}
          <Route path="about/overview" element={<Overview />} />
          <Route path="about/message-from-head" element={<MessageFromHead />} />
          <Route path="about/achievements" element={<Achievements />} />

          <Route path="about/rankings" element={<Rankings />} />
          <Route path="about/facilities-equipment" element={<FacilitiesEquipment />} />
          <Route path="about/history" element={<History />} />

          {/* Admissions Routes */}
          <Route path="admissions/bs" element={<BsAdmissions />} />

          {/* Academics Routes */}
          <Route path="academics/calendar" element={<Calendar />} />

          {/* Catch-all route mapping to the elegant Placeholder component */}
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