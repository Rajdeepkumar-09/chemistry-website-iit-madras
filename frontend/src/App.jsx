import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import BsAdmissions from './pages/BsAdmissions';
import Overview from './pages/Overview';
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
          <Route path="about/overview" element={<Overview />} />

          {/* Admissions Routes */}
          <Route path="admissions/bs" element={<BsAdmissions />} />

          {/* Catch-all route mapping to the elegant Placeholder component */}
          <Route path="*" element={<Placeholder />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
