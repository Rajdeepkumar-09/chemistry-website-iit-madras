import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Plus, Minus, Home as HomeIcon } from 'lucide-react';
import logo from '../assets/logo/IITM_LOGO.png';

// Structured Navigation Data Configuration
const NAVIGATION_DATA = [
  {
    title: 'About',
    path: null,
    groups: [
       {
         heading: null,
         links: [
           { label: 'Overview', to: '/about/overview' },
           { label: 'Message From Head', to: '/about/message-from-head' },
           { label: 'Vision & Mission', to: '/about/vision-mission' },
           { label: 'Achievements', to: '/about/achievements' },
           { label: 'Rankings', to: '/about/rankings' },
           { label: 'History', to: '/about/history' },
         ]
       },
       {
         heading: 'Administration',
         links: [
           { label: 'Advisory Board', to: '/about/advisory-board' },
           { label: 'Committees', to: '/about/committees' },
           { label: 'Annual Reports', to: '/about/annual-reports' },
         ]
       },
       {
         heading: 'IITM Specific',
         links: [
           { label: 'Industry Partnerships', to: '/about/industry-partnerships' },
           { label: 'Research Park Link', to: '/about/research-park-link' },
         ]
       }
    ]
  },
  {
    title: 'Academics',
    path: '/academics',
    groups: [
      {
        heading: 'Undergraduate',
        links: [
          { label: 'BS Chemistry', to: '/academics/undergraduate/bs-chemistry' },
          { label: 'Dual Degree', to: '/academics/undergraduate/dual-degree' },
          { label: 'Curriculum', to: '/academics/undergraduate/curriculum' },
          { label: 'Course Structure', to: '/academics/undergraduate/course-structure' },
          { label: 'Minor in Chemistry', to: '/academics/undergraduate/minor' },
        ]
      },
      {
        heading: 'Postgraduate',
        links: [
           { label: 'MSc Program', to: '/academics/postgraduate/msc' },
           { label: 'PhD Program', to: '/academics/postgraduate/phd' },
           { label: 'Eligibility', to: '/academics/postgraduate/eligibility' },
           { label: 'Handbook', to: '/academics/postgraduate/handbook' },
        ]
      },
      {
        heading: 'Courses',
        links: [
           { label: 'Core Courses', to: '/academics/courses/core' },
           { label: 'Elective Courses', to: '/academics/courses/elective' },
           { label: 'Lab Courses', to: '/academics/courses/lab' },
           { label: 'Course Catalog', to: '/academics/courses/catalog' },
        ]
      },
      {
        heading: 'Interdisciplinary',
        links: [
           { label: 'Chemistry + AI', to: '/academics/interdisciplinary/ai' },
           { label: 'Chemistry + Materials', to: '/academics/interdisciplinary/materials' },
           { label: 'Chemistry + Energy', to: '/academics/interdisciplinary/energy' },
           { label: 'Chemistry + Bio', to: '/academics/interdisciplinary/bio' },
        ]
      },
      {
        heading: 'Resources',
        links: [
           { label: 'Academic Calendar', to: '/academics/calendar' },
           { label: 'Timetable', to: '/academics/timetable' },
           { label: 'Regulations', to: '/academics/regulations' },
        ]
      }
    ]
  },
  {
    title: 'Research',
    path: '/research',
    groups: [
      {
         heading: 'Overview & Output',
         links: [
           { label: 'Publications', to: '/research/publications' },
           { label: 'Patents', to: '/research/patents' },
           { label: 'Funded Projects', to: '/research/funded-projects' },
           { label: 'Research Facilities', to: '/research/facilities' },
           { label: 'Industry Collaboration', to: '/research/industry-collaboration' },
         ]
      },
      {
         heading: 'Research Areas',
         links: [
           { label: 'Inorganic', to: '/research/areas/inorganic' },
           { label: 'Organic', to: '/research/areas/organic' },
           { label: 'Physical', to: '/research/areas/physical' },
           { label: 'Theoretical', to: '/research/areas/theoretical' },
           { label: 'Materials Chemistry', to: '/research/areas/materials' },
         ]
      },
      {
         heading: 'Specialized Fields',
         links: [
           { label: 'Catalysis', to: '/research/areas/catalysis' },
           { label: 'Energy Storage', to: '/research/areas/energy-storage' },
           { label: 'Computational Chemistry', to: '/research/areas/computational' },
           { label: 'Nanoscience', to: '/research/areas/nanoscience' },
         ]
      },
      {
         heading: 'Centers',
         links: [
           { label: 'Energy Center', to: '/research/centers/energy' },
           { label: 'Materials Center', to: '/research/centers/materials' },
           { label: 'Sustainability Center', to: '/research/centers/sustainability' },
         ]
      }
    ]
  },
  {
    title: 'People',
    path: null,
    groups: [
      {
        heading: 'Faculty',
        links: [
           { label: 'Inorganic', to: '/people/faculty/inorganic' },
           { label: 'Organic', to: '/people/faculty/organic' },
           { label: 'Physical', to: '/people/faculty/physical' },
           { label: 'Emeritus', to: '/people/faculty/emeritus' },
           { label: 'Visiting', to: '/people/faculty/visiting' },
        ]
      },
      {
        heading: 'Staff & Postdocs',
        links: [
           { label: 'Staff', to: '/people/staff' },
           { label: 'Postdocs', to: '/people/postdocs' },
        ]
      },
      {
         heading: 'Students',
         links: [
           { label: 'BS Students', to: '/people/students/bs' },
           { label: 'MSc Students', to: '/people/students/msc' },
           { label: 'PhD Students', to: '/people/students/phd' },
           { label: 'Project Students', to: '/people/students/project' },
         ]
      },
      {
         heading: 'Alumni',
         links: [
           { label: 'Alumni Directory', to: '/people/alumni' },
         ]
      }
    ]
  },
  {
    title: 'Admissions',
    path: null,
    groups: [
      {
         heading: 'Programs',
         links: [
           { label: 'BS Admission', to: '/admissions/bs' },
           { label: 'MSc Admission', to: '/admissions/msc' },
           { label: 'PhD Admission', to: '/admissions/phd' },
           { label: 'International Admission', to: '/admissions/international' },
         ]
      },
      {
         heading: 'Information',
         links: [
           { label: 'FAQ', to: '/admissions/faq' },
           { label: 'Brochure', to: '/admissions/brochure' },
         ]
      }
    ]
  },
  {
    title: 'Explore More',
    path: null,
    groups: [
      {
        heading: 'Seminars & Events',
        links: [
           { label: 'Upcoming', to: '/seminars/upcoming' },
           { label: 'Past', to: '/seminars/past' },
           { label: 'Distinguished Lectures', to: '/seminars/distinguished' },
        ]
      },
      {
        heading: 'Facilities',
        links: [
           { label: 'Teaching Labs', to: '/facilities/teaching-labs' },
           { label: 'Research Labs', to: '/facilities/research-labs' },
        ]
      },
      {
         heading: 'Placements & Outreach',
         links: [
           { label: 'Placement Statistics', to: '/placements/statistics' },
           { label: 'Internships', to: '/placements/internships' },
           { label: 'School Programs', to: '/outreach/school-programs' },
           { label: 'Workshops', to: '/outreach/workshops' },
         ]
      },
      {
         heading: 'Contact',
         links: [
           { label: 'Contact Us / Directory', to: '/contact/contact-us' },
         ]
      }
    ]
  }
];

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setOpenMobileAccordion(null);
  }, [location]);

  // Handle Desktop Hover Dynamics
  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // slight delay to make moving to dropdowns easier
  };

  // Handle Mobile Accordion toggle
  const toggleMobileAccordion = (title) => {
    setOpenMobileAccordion(openMobileAccordion === title ? null : title);
  };

  // === Desktop Components ===
  const NavButton = ({ title, isActive }) => (
    <button className={`relative inline-flex items-center font-medium text-[14px] py-7 px-4 border-none bg-transparent cursor-pointer transition-colors duration-200 ${isActive ? 'text-[#1f2937]' : 'text-[#4b5563] hover:text-[#1f2937]'}`}>
      {title} 
      <ChevronDown size={14} className={`ml-1.5 transition-transform duration-200 ${isActive ? 'rotate-180 text-[#1f2937]' : 'text-[#9ca3af]'}`} />
      {/* Active State Bottom Border Indicator */}
      {isActive && (
        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#1f2937] rounded-t-sm" aria-hidden="true" />
      )}
    </button>
  );

  const MegaMenu = ({ navItem, isActive }) => {
    // Determine dynamic column count based on number of groups. Max width constraints ensure elegant wrapping.
    const colCount = Math.min(navItem.groups.length, 4);
    
    return (
      <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-3xl border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-b-2xl transition-all duration-300 origin-top z-50 overflow-hidden w-max max-w-[95vw] ${isActive ? 'opacity-100 visible scale-y-100 translate-y-0' : 'opacity-0 invisible scale-y-95 pointer-events-none -translate-y-2'}`}>
        
        {/* Foolproof Flex Layout for Safe Academic Content Wrapping */}
        <div className="flex flex-wrap gap-x-12 gap-y-10 py-10 px-12">
          {navItem.groups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex-1 min-w-[200px] flex flex-col gap-3">
              {group.heading && (
                <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1">
                  {group.heading}
                </div>
              )}
              <ul className="flex flex-col gap-1 m-0 p-0 list-none">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.to} 
                      className="block px-3 py-2 -mx-3 rounded-lg text-[#4b5563] text-[14px] font-medium hover:bg-black/[0.03] hover:text-[#1f2937] transition-colors duration-200 whitespace-normal break-words leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Optional Main Link Ribbon */}
        {navItem.path && (
           <div className="bg-[#fafafa]/80 border-t border-black/5 px-10 py-4 flex justify-end">
             <Link to={navItem.path} className="text-[13px] font-semibold text-[#4b5563] hover:text-[#1f2937] transition-colors flex items-center gap-1">
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
      <div className="border-b border-black/[0.04]">
        <button 
          onClick={() => toggleMobileAccordion(navItem.title)}
          className="w-full flex items-center justify-between py-4 px-6 text-left text-[#1f2937] font-semibold focus:outline-none"
        >
          {navItem.title}
          {isOpen ? <Minus size={18} className="text-[#4b5563]" /> : <Plus size={18} className="text-[#4b5563]" />}
        </button>
        
        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
           <div className="overflow-hidden">
             <div className="px-6 space-y-6 pb-5 pt-1">
               {navItem.path && (
                 <Link to={navItem.path} className="block text-[#1f2937] font-semibold text-sm">
                   {navItem.title} Overview &rarr;
                 </Link>
               )}
               
               {navItem.groups.map((group, index) => (
                  <div key={index} className="space-y-3">
                    {group.heading && (
                      <div className="text-xs font-bold text-[#4b5563] uppercase tracking-wider pb-1">
                        {group.heading}
                      </div>
                    )}
                    <ul className="space-y-4">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link to={link.to} className="block text-[#4b5563] text-sm hover:text-[#1f2937] transition-colors leading-relaxed">
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
    <nav className="bg-white/95 backdrop-blur-2xl sticky top-0 border-b border-black/5 relative z-[1000]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between h-20">
           {/* Logo Image & Text */}
           <Link to="/" className="flex items-center gap-4">
             <img 
               src={logo} 
               alt="IIT Madras Chemistry Department"
               className="h-[52px] w-auto object-contain"
             />
             <div className="flex flex-col justify-center hidden sm:flex">
               <span className="text-[17px] font-bold text-[#1f2937] leading-tight tracking-tight">Department of Chemistry</span>
               <span className="text-[13px] font-semibold text-[#4b5563] leading-tight tracking-wide uppercase mt-0.5">IIT Madras</span>
             </div>
           </Link>
           
           {/* Mobile Menu Toggle Button */}
           <button 
            type="button"
            className="lg:hidden p-2 text-[#4b5563] hover:text-[#1f2937] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open primary menu"
          >
            <Menu size={28} />
          </button>

          {/* Desktop Navigation Links Container */}
          <div className="hidden lg:flex lg:items-center lg:gap-3 h-full relative">
            
            <Link 
              to="/" 
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-[#4b5563] hover:text-[#1f2937] hover:bg-black/[0.03] transition-colors duration-150"
              aria-label="Home"
            >
              <HomeIcon size={20} />
            </Link>

            {/* Loop through strictly structured JSON to build Nav */}
            {NAVIGATION_DATA.map((navItem) => {
              const isActive = activeDropdown === navItem.title;
              return (
                <div 
                  key={navItem.title}
                  className="h-full static group" /* Static always to center mega menu against viewport properly */
                  onMouseEnter={() => handleMouseEnter(navItem.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavButton title={navItem.title} isActive={isActive} />
                  <MegaMenu navItem={navItem} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Mobile Drawer Navigation (Architecturally Isolated) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] lg:hidden">
           {/* Backdrop Overlay */}
           <div 
             className="fixed inset-0 bg-black/[0.15] backdrop-blur-sm transition-opacity" 
             onClick={() => setIsMobileMenuOpen(false)}
             aria-hidden="true"
           ></div>
           
           {/* Slider Drawer */}
           <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white/98 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.1)] flex flex-col h-full transform transition-transform duration-300 translate-x-0 overflow-hidden border-l border-white/50">
             
             {/* Mobile Drawer Header */}
             <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.04] bg-transparent">
               <span className="text-[#1f2937] font-semibold uppercase tracking-widest text-[11px]">Menu</span>
               <button 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="text-[#4b5563] hover:text-[#1f2937] p-1 transition-colors"
               >
                 <X size={24} strokeWidth={1.5} />
               </button>
             </div>

             {/* Scrollable Accordion Content */}
             <div className="flex-1 overflow-y-auto w-full bg-transparent">
               <Link 
                 to="/" 
                 className="block text-[#1f2937] font-semibold py-4 px-6 border-b border-black/[0.04]"
               >
                 Home
               </Link>

               {NAVIGATION_DATA.map((navItem) => (
                 <MobileAccordion key={navItem.title} navItem={navItem} />
               ))}
               
             </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
