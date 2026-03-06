import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Plus, Minus, Home as HomeIcon, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo/IITM_LOGO.png';

// --- Structured Navigation Data Configuration ---
const NAVIGATION_DATA = [
  {
    title: 'About',
    path: '/about',
    groups: [
      { heading: null, links: [{ label: 'Overview', to: '/about/overview' }, { label: 'Message From Head', to: '/about/message-from-head' }, { label: 'Achievements', to: '/about/achievements' }, { label: 'Rankings', to: '/about/rankings' }, { label: 'Facilities & Equipment', to: '/about/facilities-equipment' }, { label: 'History', to: '/about/history' }] },
      { heading: 'Administration', links: [{ label: 'Advisory Board', to: '/about/advisory-board' }, { label: 'Committees', to: '/about/committees' }, { label: 'Annual Reports', to: '/about/annual-reports' }] },
      { heading: 'IITM Specific', links: [{ label: 'Industry Partnerships', to: '/about/industry-partnerships' }, { label: 'Research Park Link', to: '/about/research-park-link' }] }
    ]
  },
  {
    title: 'Academics',
    path: '/academics',
    groups: [
      { heading: 'Undergraduate', links: [{ label: 'BS+MS Dual Degree', to: '/academics/undergraduate/bs-ms-dual' }, { label: 'Curriculum', to: '/academics/undergraduate/curriculum' }, { label: 'Course Structure', to: '/academics/undergraduate/course-structure' }, { label: 'Minor in Chemistry', to: '/academics/undergraduate/minor' }] },
      { heading: 'Postgraduate', links: [{ label: 'MSc Program', to: '/academics/postgraduate/msc' }, { label: 'PhD Program', to: '/academics/postgraduate/phd' }] },
      { heading: 'Courses', links: [{ label: 'Core Courses', to: '/academics/courses/core' }, { label: 'Elective Courses', to: '/academics/courses/elective' }, { label: 'Lab Courses', to: '/academics/courses/lab' }, { label: 'Course Catalog', to: '/academics/courses/catalog' }] },
      { heading: 'Resources', links: [{ label: 'Academic Calendar', to: '/academics/calendar' }, { label: 'Timetable', to: '/academics/timetable' }, { label: 'Regulations', to: '/academics/regulations' }] }
    ]
  },
  {
    title: 'Research',
    path: '/research',
    groups: [
      { heading: 'Overview & Output', links: [{ label: 'Publications', to: '/research/publications' }, { label: 'Patents', to: '/research/patents' }, { label: 'Funded Projects', to: '/research/facilities' }, { label: 'Research Facilities', to: '/research/facilities' }, { label: 'Industry Collaboration', to: '/research/industry-collaboration' }] },
      { heading: 'Research Areas', links: [{ label: 'Inorganic', to: '/research/areas/inorganic' }, { label: 'Organic', to: '/research/areas/organic' }, { label: 'Physical', to: '/research/areas/physical' }, { label: 'Theoretical', to: '/research/areas/theoretical' }, { label: 'Materials Chemistry', to: '/research/areas/materials' }] },
      { heading: 'Specialized Fields', links: [{ label: 'Catalysis', to: '/research/areas/catalysis' }, { label: 'Energy Storage', to: '/research/areas/energy-storage' }, { label: 'Computational Chemistry', to: '/research/areas/computational' }, { label: 'Nanoscience', to: '/research/areas/nanoscience' }] },
      { heading: 'Centers', links: [{ label: 'Energy Center', to: '/research/centers/energy' }, { label: 'Materials Center', to: '/research/centers/materials' }, { label: 'Sustainability Center', to: '/research/centers/sustainability' }] }
    ]
  },
  {
    title: 'People',
    path: '/people',
    groups: [
      { heading: 'Faculty', links: [{ label: 'Inorganic', to: '/people/faculty/inorganic' }, { label: 'Organic', to: '/people/faculty/organic' }, { label: 'Physical', to: '/people/faculty/physical' }, { label: 'Emeritus', to: '/people/faculty/emeritus' }, { label: 'Visiting', to: '/people/faculty/visiting' }] },
      { heading: 'Staff & Postdocs', links: [{ label: 'Staff', to: '/people/staff' }, { label: 'Postdocs', to: '/people/postdocs' }] },
      { heading: 'Students', links: [{ label: 'BS Students', to: '/people/students/bs' }, { label: 'MSc Students', to: '/people/students/msc' }, { label: 'PhD Students', to: '/people/students/phd' }, { label: 'Project Students', to: '/people/students/project' }] },
      { heading: 'Alumni', links: [{ label: 'Alumni Directory', to: '/people/alumni' }] }
    ]
  },
  {
    title: 'Admissions',
    path: '/admissions',
    groups: [
      { heading: 'Programs', links: [{ label: 'BS Admission', to: '/admissions/bs' }, { label: 'MSc Admission', to: '/admissions/msc' }, { label: 'PhD Admission', to: '/admissions/phd' }, { label: 'International Admission', to: '/admissions/international' }] },
      { heading: 'Information', links: [{ label: 'FAQ', to: '/admissions/faq' }, { label: 'Brochure', to: '/admissions/brochure' }] }
    ]
  },
  {
    title: 'Explore',
    path: '/explore',
    groups: [
      { heading: 'Seminars & Events', links: [{ label: 'Upcoming', to: '/seminars/upcoming' }, { label: 'Past', to: '/seminars/past' }, { label: 'Distinguished Lectures', to: '/seminars/distinguished' }] },
      { heading: 'Facilities', links: [{ label: 'Teaching Labs', to: '/facilities/teaching-labs' }, { label: 'Research Labs', to: '/facilities/research-labs' }] },
      { heading: 'Placements & Outreach', links: [{ label: 'Placement Statistics', to: '/placements/statistics' }, { label: 'Internships', to: '/placements/internships' }, { label: 'School Programs', to: '/outreach/school-programs' }, { label: 'Workshops', to: '/outreach/workshops' }] },
      { heading: 'Contact', links: [{ label: 'Contact Us', to: '/contact/contact-us' }] }
    ]
  }
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const timeoutRef = useRef(null);
  
  // FIX: Added the missing isScrolled state!
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Security State
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  // FIX: Added the scroll listener to update isScrolled when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smart Dashboard Routing Logic
  const getDashboardLink = () => {
    if (role === 'admin') return '/admin';
    if (role === 'faculty') return '/faculty-dashboard';
    if (role === 'student') return '/student-dashboard';
    return '/login'; // Fallback
  };

  // Logout Logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
    window.location.reload(); 
  };

  // Close menus on route change
  useEffect(() => {
    const t = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
      setOpenMobileAccordion(null);
    }, 0);
    return () => clearTimeout(t);
  }, [location]);

  // Handle Desktop Hover Dynamics
  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); 
  };

  const toggleMobileAccordion = (title) => {
    setOpenMobileAccordion(openMobileAccordion === title ? null : title);
  };

  // === Desktop Components ===
  const NavButton = ({ title, isActive }) => (
    <button className={`relative inline-flex items-center font-medium text-[15px] py-7 px-4 border-none bg-transparent cursor-pointer transition-colors duration-150 ${isActive ? 'text-[#b45309]' : 'text-[#1f2937] hover:text-[#b45309]'}`}>
      {title} 
      <ChevronDown size={14} className={`ml-1.5 transition-transform duration-200 ${isActive ? 'rotate-180 text-[#b45309]' : 'text-[#4b5563]'}`} />
      {isActive && (
        <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#b45309]" aria-hidden="true" />
      )}
    </button>
  );

  const MegaMenu = ({ navItem, isActive }) => {
    const colCount = Math.min(navItem.groups.length, 4);
    return (
      <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 bg-white border border-[#e5e7eb] shadow-lg rounded-b-md transition-all duration-200 origin-top z-50 overflow-hidden w-full max-w-max sm:max-w-[calc(100vw-3rem)] ${isActive ? 'opacity-100 visible scale-y-100 translate-y-0' : 'opacity-0 invisible scale-y-95 pointer-events-none -translate-y-2'}`}>
        <div className="grid gap-x-8 gap-y-8 py-8 px-10" style={{ gridTemplateColumns: `repeat(${colCount}, minmax(180px, 1fr))` }}>
          {navItem.groups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-3">
              {group.heading && (
                <div className="text-xs font-bold text-[#4b5563] uppercase tracking-wider mb-1">{group.heading}</div>
              )}
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.to} className="block text-[#4b5563] text-[15px] hover:text-[#b45309] transition-colors duration-200 break-words leading-snug py-1">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {navItem.path && (
           <div className="bg-[#f5f6f8] border-t border-[#e5e7eb] px-10 py-4 flex justify-end">
             <Link to={navItem.path} className="text-[14px] font-semibold text-[#1f2937] hover:text-[#b45309] transition-colors flex items-center gap-1">
               Go to {navItem.title} Overview <span aria-hidden="true">&rarr;</span>
             </Link>
           </div>
        )}
      </div>
    );
  };

  // === Mobile Components ===
  const MobileAccordion = ({ navItem }) => {
    const isOpen = openMobileAccordion === navItem.title;
    return (
      <div className="border-b border-[#e5e7eb]">
        <button onClick={() => toggleMobileAccordion(navItem.title)} className="w-full flex items-center justify-between py-4 px-6 text-left text-[#1f2937] font-semibold focus:outline-none">
          {navItem.title}
          {isOpen ? <Minus size={18} className="text-[#4b5563]" /> : <Plus size={18} className="text-[#4b5563]" />}
        </button>
        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
           <div className="overflow-hidden">
             <div className="px-6 space-y-6 pb-5 pt-1">
               {navItem.path && (
                 <Link to={navItem.path} className="block text-[#b45309] font-semibold text-sm">{navItem.title} Overview &rarr;</Link>
               )}
               {navItem.groups.map((group, index) => (
                  <div key={index} className="space-y-3">
                    {group.heading && (
                      <div className="text-xs font-bold text-[#4b5563] uppercase tracking-wider pb-1">{group.heading}</div>
                    )}
                    <ul className="space-y-4">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link to={link.to} className="block text-[#4b5563] text-sm hover:text-[#b45309] transition-colors leading-relaxed">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <nav className={`fixed w-full top-0 z-[1000] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-transparent' : 'bg-white/80 backdrop-blur-sm border-b border-black/5'}`}>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link to="/" className="flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded-lg">
            <img src={logo} alt="IIT Madras Chemistry Department" className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[42px]' : 'h-[52px]'}`} />
            <div className="flex-col justify-center hidden sm:flex">
              <span className="text-[17px] font-bold text-[#1f2937] group-hover:text-orange-700 transition-colors leading-tight tracking-tight">Department of Chemistry</span>
              <span className="text-[13px] font-semibold text-[#4b5563] leading-tight tracking-wide uppercase mt-0.5">IIT Madras</span>
            </div>
          </Link>

          <button
            type="button"
            className="lg:hidden p-2 text-[#4b5563] hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open primary menu"
          >
            <Menu size={28} />
          </button>

          {/* Desktop Navigation Links & Auth Container */}
          <div className="hidden xl:flex xl:items-center xl:gap-2 h-full relative">
            <Link to="/" className="inline-flex items-center justify-center h-10 w-10 rounded text-[#4b5563] hover:text-[#b45309] hover:bg-[#f5f6f8] transition-colors duration-150">
              <HomeIcon size={20} />
            </Link>

            {/* Loop through strictly structured JSON to build Nav */}
            {NAVIGATION_DATA.map((navItem) => {
              const isActive = activeDropdown === navItem.title;
              return (
                <div key={navItem.title} className="h-full static group" onMouseEnter={() => handleMouseEnter(navItem.title)} onMouseLeave={handleMouseLeave}>
                  <NavButton title={navItem.title} isActive={isActive} />
                  <MegaMenu navItem={navItem} isActive={isActive} />
                </div>
              )}) }
            </div>

            {/* UPGRADED: The Authentication Buttons (Desktop) */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300 hidden xl:flex">
              {token ? (
                <>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                    {role}
                  </span>
                  {/* Smart Dashboard Link */}
                  <Link to={getDashboardLink()} className="font-semibold text-sm text-[#b45309] hover:text-[#92400e] transition-colors whitespace-nowrap">
                    My Dashboard
                  </Link>
                  <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-sm text-sm font-bold transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-[#1f2937] hover:bg-black text-white px-4 py-2 rounded-sm text-sm font-bold transition-colors shadow-sm whitespace-nowrap">
                  Portal Login
                </Link>
              )}
            </div>
            {/* End of Desktop Auth Buttons */}

          </div>
        </div>

      {/* --- Mobile Drawer Navigation --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] xl:hidden">
           <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
           
           <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#f5f6f8] shadow-2xl flex flex-col h-full transform transition-transform duration-300 translate-x-0 overflow-hidden">
             
             <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb] bg-white">
               <span className="text-[#1f2937] font-bold uppercase tracking-widest text-sm">Menu</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#4b5563] hover:text-[#1f2937] p-1 transition-colors">
                 <X size={24} />
               </button>
             </div>

             <div className="flex-1 overflow-y-auto w-full bg-white flex flex-col">
               <Link to="/" className="block text-[#1f2937] font-semibold py-4 px-6 border-b border-[#e5e7eb]">
                 Home
               </Link>

               {NAVIGATION_DATA.map((navItem) => (
                 <MobileAccordion key={navItem.title} navItem={navItem} />
               ))}
               
               {/* UPGRADED: The Authentication Buttons (Mobile) */}
               <div className="p-6 mt-auto bg-gray-50 border-t border-gray-200">
                  {token ? (
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Logged in as: {role}
                      </span>
                      {/* Smart Dashboard Link */}
                      <Link to={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-[#1f2937] text-white font-bold py-3 rounded-sm hover:bg-black transition-colors shadow-sm">
                        Go to My Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-sm transition-colors shadow-sm">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-[#1f2937] hover:bg-black text-white text-center font-bold py-3 rounded-sm transition-colors shadow-sm">
                      Portal Login
                    </Link>
                  )}
               </div>
               {/* End of Mobile Auth Buttons */}

             </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
