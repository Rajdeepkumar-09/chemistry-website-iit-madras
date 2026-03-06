import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Plus, Minus, Home as HomeIcon } from 'lucide-react';
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

// --- Sub-Components ---

const checkIsActiveRoute = (navItem, currentPath) => {
  if (navItem.path && currentPath.startsWith(navItem.path)) return true;
  if (navItem.groups) return navItem.groups.some(group => group.links.some(link => currentPath.startsWith(link.to)));
  return false;
};

const NavButton = ({ title, isActive, isCurrentPage }) => {
  const isVisuallyActive = isActive || isCurrentPage;
  return (
    <button
      className={`relative inline-flex items-center font-medium text-[14px] h-full px-4 border-none bg-transparent cursor-pointer transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-inset rounded-md ${isVisuallyActive ? 'text-orange-700' : 'text-[#4b5563] hover:text-orange-700'}`}
      aria-expanded={isActive} aria-haspopup="menu"
    >
      {title} <ChevronDown size={14} className={`ml-1.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? 'rotate-180 text-orange-700' : 'text-[#9ca3af]'}`} />
      <span className={`absolute bottom-0 left-2 right-2 h-[2px] bg-orange-700 transition-transform duration-300 origin-center rounded-t-sm shadow-[0_-1px_4px_rgba(194,65,12,0.3)] ${isVisuallyActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} aria-hidden="true" />
    </button>
  );
};

const MegaMenu = ({ navItem, isActive, isScrolled, currentPath }) => {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-3xl border border-white/40 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15)] rounded-b-2xl transition-all duration-300 origin-top z-50 overflow-hidden w-max max-w-[95vw] ${isScrolled ? 'top-[64px]' : 'top-[80px]'} ${isActive ? 'opacity-100 visible scale-y-100 translate-y-0' : 'opacity-0 invisible scale-y-95 pointer-events-none -translate-y-2'}`} role="menu">
      <div className="flex flex-wrap gap-x-12 gap-y-10 py-10 px-12 bg-white/50">
        {navItem.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex-1 min-w-[200px] flex flex-col gap-3">
            {group.heading && <div className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1">{group.heading}</div>}
            <ul className="flex flex-col gap-1 m-0 p-0 list-none">
              {group.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link to={link.to} className={`block px-3 py-2 -mx-3 rounded-lg text-[14px] font-medium transition-all duration-200 hover:translate-x-1 whitespace-normal break-words leading-snug focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 ${currentPath === link.to ? 'bg-orange-50 text-orange-800 font-semibold' : 'text-[#4b5563] hover:bg-orange-50 hover:text-orange-800'}`} role="menuitem">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {navItem.path && (
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent border-t border-orange-100/50 px-10 py-4 flex justify-end">
          <Link to={navItem.path} className="text-[13px] font-semibold text-orange-700 hover:text-orange-900 transition-colors flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 rounded-sm">
            Go to {navItem.title} Overview <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
};

const MobileAccordion = ({ navItem, isOpen, toggleMobileAccordion, currentPath, closeMenu }) => {
  const isCurrentPage = checkIsActiveRoute(navItem, currentPath);

  return (
    <div className="border-b border-slate-100">
      <button onClick={() => toggleMobileAccordion(navItem.title)} className={`w-full flex items-center justify-between py-4 px-6 text-left font-semibold focus:outline-none transition-colors ${isOpen || isCurrentPage ? 'text-orange-700' : 'text-[#1f2937]'}`}>
        {navItem.title}
        {isOpen ? <Minus size={18} className="text-orange-700" /> : <Plus size={18} className="text-[#4b5563]" />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} className="overflow-hidden bg-slate-50/50">
            <div className="px-6 space-y-6 pb-6 pt-2">
              {navItem.path && (
                <Link to={navItem.path} onClick={closeMenu} className="block text-orange-700 font-semibold text-sm">
                  {navItem.title} Overview &rarr;
                </Link>
              )}
              {navItem.groups.map((group, index) => (
                <div key={index} className="space-y-3">
                  {group.heading && <div className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider pb-1">{group.heading}</div>}
                  <ul className="space-y-3">
                    {group.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link to={link.to} onClick={closeMenu} className={`block text-sm transition-colors leading-relaxed ${currentPath === link.to ? 'text-orange-700 font-medium' : 'text-[#4b5563] hover:text-orange-700'}`}>
                          {link.label}9
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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

          <div className="hidden lg:flex lg:items-center h-full relative">
            <div className="flex items-center gap-1 h-full">
              <Link to="/" className={`inline-flex items-center justify-center h-10 w-10 mx-1 rounded-lg transition-colors duration-150 focus:outline-none ${location.pathname === '/' ? 'text-orange-700 bg-orange-50' : 'text-[#4b5563] hover:text-orange-700 hover:bg-orange-50'}`}>
                <HomeIcon size={20} />
              </Link>
              {NAVIGATION_DATA.map((navItem) => (
                <div key={navItem.title} className="h-full static group" onMouseEnter={() => handleMouseEnter(navItem.title)} onMouseLeave={handleMouseLeave}>
                  <NavButton title={navItem.title} isActive={activeDropdown === navItem.title} isCurrentPage={checkIsActiveRoute(navItem, location.pathname)} />
                  <MegaMenu navItem={navItem} isActive={activeDropdown === navItem.title} isScrolled={isScrolled} currentPath={location.pathname} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div key="mobile-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] lg:hidden" onClick={closeMobileMenu} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col h-[100dvh] z-[2001] lg:hidden border-l border-slate-200"
          >
            <div className="flex-none flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
              <span className="text-orange-700 font-bold uppercase tracking-widest text-[11px]">Menu</span>
              <button onClick={closeMobileMenu} className="text-[#4b5563] hover:text-orange-700 hover:bg-orange-50 rounded-lg p-1 transition-all duration-300 hover:rotate-90 focus:outline-none">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto w-full bg-white pb-8">
              <Link to="/" onClick={closeMobileMenu} className={`block font-semibold py-4 px-6 border-b border-slate-100 transition-colors ${location.pathname === '/' ? 'text-orange-700 bg-orange-50/50' : 'text-[#1f2937] hover:text-orange-700 hover:bg-orange-50'}`}>
                Home
              </Link>
              {NAVIGATION_DATA.map((navItem) => (
                <MobileAccordion
                  key={navItem.title}
                  navItem={navItem}
                  isOpen={openMobileAccordion === navItem.title}
                  toggleMobileAccordion={(title) => setOpenMobileAccordion(openMobileAccordion === title ? null : title)}
                  currentPath={location.pathname}
                  closeMenu={closeMobileMenu}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;