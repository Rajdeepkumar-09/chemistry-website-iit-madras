import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Plus, Minus, Home as HomeIcon } from 'lucide-react';
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
      { heading: 'Faculty', links: [{ label: 'Faculty Directory', to: '/people' }] },
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
  const [isScrolled, setIsScrolled] = useState(false);
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin';
    if (role === 'faculty') return '/faculty-dashboard';
    if (role === 'student') return '/student-dashboard';
    return '/login'; 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
    window.location.reload(); 
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setOpenMobileAccordion(null);
  }, [location]);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); 
  };

  // --- Mobile Accordion Component ---
  const MobileAccordion = ({ navItem }) => {
    const isOpen = openMobileAccordion === navItem.title;
    return (
      <div className="border-b border-[#e5e7eb]">
        <button onClick={() => setOpenMobileAccordion(isOpen ? null : navItem.title)} className="w-full flex items-center justify-between py-4 px-6 text-left text-[#1f2937] font-semibold focus:outline-none">
          {navItem.title}
          {isOpen ? <Minus size={18} className="text-[#4b5563]" /> : <Plus size={18} className="text-[#4b5563]" />}
        </button>
        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
           <div className="overflow-hidden">
             <div className="px-6 space-y-6 pb-5 pt-1">
               {navItem.path && <Link to={navItem.path} className="block text-[#b45309] font-semibold text-sm">{navItem.title} Overview &rarr;</Link>}
               {navItem.groups.map((group, index) => (
                  <div key={index} className="space-y-3">
                    {group.heading && <div className="text-xs font-bold text-[#4b5563] uppercase tracking-wider pb-1">{group.heading}</div>}
                    <ul className="space-y-4">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}><Link to={link.to} className="block text-[#4b5563] text-sm hover:text-[#b45309] transition-colors">{link.label}</Link></li>
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
    // HARDCODED Z-INDEX to violently override any dashboard tables underneath it
    <nav style={{ zIndex: 99999 }} className={`fixed w-full top-0 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-transparent' : 'bg-white/90 backdrop-blur-sm border-b border-black/5'}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group focus:outline-none">
            <img src={logo} alt="IIT Madras Chemistry Department" className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[42px]' : 'h-[52px]'}`} />
            <div className="flex-col justify-center hidden sm:flex">
              <span className="text-[17px] font-bold text-[#1f2937] group-hover:text-orange-700 transition-colors leading-tight tracking-tight">Department of Chemistry</span>
              <span className="text-[13px] font-semibold text-[#4b5563] leading-tight tracking-wide uppercase mt-0.5">IIT Madras</span>
            </div>
          </Link>

          {/* Mobile Hamburger */}
          <button type="button" className="lg:hidden p-2 text-[#4b5563] hover:text-orange-700" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>

          {/* Desktop Links & Auth Container */}
          <div className="hidden xl:flex xl:items-center h-full">
            <Link to="/" className="inline-flex items-center justify-center h-full px-3 text-[#4b5563] hover:text-[#b45309] transition-colors">
              <HomeIcon size={20} />
            </Link>

            {/* Loop through JSON to build Nav */}
            {NAVIGATION_DATA.map((navItem, index) => {
              const isActive = activeDropdown === navItem.title;
              // Smart alignment: Push the last 2 menus to the left so they don't fall off the screen!
              const isRightAligned = index >= NAVIGATION_DATA.length - 2;

              return (
                <div key={navItem.title} className="h-full relative group flex items-center" onMouseEnter={() => handleMouseEnter(navItem.title)} onMouseLeave={handleMouseLeave}>
                  
                  {/* The Button */}
                  <button className={`relative h-full px-4 flex items-center font-medium text-[15px] transition-colors duration-150 ${isActive ? 'text-[#b45309]' : 'text-[#1f2937] hover:text-[#b45309]'}`}>
                    {navItem.title}
                    <ChevronDown size={14} className={`ml-1.5 transition-transform duration-200 ${isActive ? 'rotate-180 text-[#b45309]' : 'text-[#4b5563]'}`} />
                    {/* Fixed Orange Border: Now properly constrained to just the button! */}
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#b45309]" aria-hidden="true" />}
                  </button>

                  {/* The Dropdown Menu */}
                  <div className={`absolute top-full ${isRightAligned ? 'right-0' : 'left-1/2 -translate-x-1/2'} bg-white border border-[#e5e7eb] shadow-2xl rounded-b-md transition-all duration-200 origin-top overflow-hidden w-max max-w-[calc(100vw-2rem)] ${isActive ? 'opacity-100 visible scale-y-100 translate-y-0' : 'opacity-0 invisible scale-y-95 pointer-events-none -translate-y-2'}`} style={{ zIndex: 100000 }}>
                    <div className="flex p-8 gap-10">
                      {navItem.groups.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex flex-col gap-3 min-w-[150px]">
                          {group.heading && <div className="text-xs font-bold text-[#4b5563] uppercase tracking-wider mb-1">{group.heading}</div>}
                          <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                            {group.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link to={link.to} className="block text-[#4b5563] text-[15px] hover:text-[#b45309] transition-colors py-1">{link.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {navItem.path && (
                       <div className="bg-[#f5f6f8] border-t border-[#e5e7eb] px-8 py-4 flex justify-end">
                         <Link to={navItem.path} className="text-[14px] font-semibold text-[#1f2937] hover:text-[#b45309] transition-colors flex items-center gap-1">
                           Go to {navItem.title} Overview <span aria-hidden="true">&rarr;</span>
                         </Link>
                       </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300 h-8">
              {token ? (
                <>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded">{role}</span>
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
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Hidden on Desktop) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100000] xl:hidden">
           <div className="fixed inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}></div>
           <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#f5f6f8] shadow-2xl flex flex-col h-full overflow-hidden">
             <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb] bg-white">
               <span className="text-[#1f2937] font-bold uppercase tracking-widest text-sm">Menu</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#4b5563] hover:text-[#1f2937] p-1"><X size={24} /></button>
             </div>
             <div className="flex-1 overflow-y-auto w-full bg-white flex flex-col">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#1f2937] font-semibold py-4 px-6 border-b border-[#e5e7eb]">Home</Link>
               {NAVIGATION_DATA.map((navItem) => <MobileAccordion key={navItem.title} navItem={navItem} />)}
               <div className="p-6 mt-auto bg-gray-50 border-t border-gray-200">
                  {token ? (
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Logged in as: {role}</span>
                      <Link to={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-[#1f2937] text-white font-bold py-3 rounded-sm">Go to My Dashboard</Link>
                      <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-sm">Logout</button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-[#1f2937] text-white text-center font-bold py-3 rounded-sm">Portal Login</Link>
                  )}
               </div>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;