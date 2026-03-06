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
import AcademicCalendar from './pages/AcademicCalendar';
import TimeTable from './pages/TimeTable';
import Calendar from './pages/Calendar';
import Academics from './pages/Academics';
import Research from './pages/Research';
import Contact from './pages/Contact';
import NewsEvents from './pages/NewsEvents';
import FacultyList from './pages/FacultyList';
import FacultyProfile from './pages/FacultyProfile';
import './App.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<Layout />}>

          {/* Index Route - Home Page */}
          <Route index element={<Home />} />

          {/* About Routes */}
          <Route path="about" element={<Overview />} />
          <Route path="about/overview" element={<Overview />} />
          <Route path="about/message-from-head" element={<MessageFromHead />} />
          <Route path="about/achievements" element={<Achievements />} />
          <Route path="about/rankings" element={<Rankings />} />
          <Route path="about/facilities-equipment" element={<FacilitiesEquipment />} />
          <Route path="about/history" element={<History />} />

          {/* Academics Routes */}
          <Route path="academics" element={<Academics />} />
          <Route path="academics/calendar" element={<AcademicCalendar />} />
          <Route path="academics/timetable" element={<TimeTable />} />

          {/* Research Routes */}
          <Route path="research" element={<Research />} />

          {/* People Routes */}
          <Route path="people" element={<FacultyList />} />
          <Route path="people/faculty" element={<FacultyList />} />
          <Route path="people/faculty/inorganic" element={<FacultyList />} />
          <Route path="people/faculty/organic" element={<FacultyList />} />
          <Route path="people/faculty/physical" element={<FacultyList />} />
          <Route path="people/faculty/emeritus" element={<FacultyList />} />
          <Route path="people/faculty/visiting" element={<FacultyList />} />
          <Route path="people/faculty/:slug" element={<FacultyProfile />} />

          {/* Admissions Routes */}
          <Route path="admissions" element={<BsAdmissions />} />
          <Route path="admissions/bs" element={<BsAdmissions />} />

          {/* Explore Routes */}
          <Route path="explore" element={<NewsEvents />} />
          <Route path="news" element={<NewsEvents />} />

          {/* Contact */}
          <Route path="contact" element={<Contact />} />
          <Route path="contact/contact-us" element={<Contact />} />

          {/* Catch-all route mapping to the elegant Placeholder component */}
          <Route path="*" element={<Placeholder />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
