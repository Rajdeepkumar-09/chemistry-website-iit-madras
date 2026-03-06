<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BookOpen, FlaskConical, Users, ArrowRight, Globe, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
=======
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { BookOpen, FlaskConical, Users, Globe, ArrowRight, Megaphone, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
>>>>>>> 7b0d645cc12212bf36403d8233d3aeda1b5756ff

// --- Shared Animation Variants ---
const slowReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const mechanicalReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

// --- Images for the Auto-Slider ---
const HERO_IMAGES = [
<<<<<<< HEAD
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [notices, setNotices] = useState([]);
  
  // ADDED: Check who is currently logged in by looking at the browser's memory
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
=======
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80"
];

// --- Data for Announcements ---
const ANNOUNCEMENTS = [
  { id: 1, date: "Mar 15, 2026", tag: "Admissions", title: "PhD Admissions Open for Fall 2026 Semester", link: "/admissions/phd" },
  { id: 2, date: "Mar 10, 2026", tag: "Event", title: "International Conference on Catalysis & Energy Systems", link: "/seminars/upcoming" },
  { id: 3, date: "Mar 02, 2026", tag: "Research", title: "Prof. Sharma's Lab publishes breakthrough in Nature Chemistry", link: "/research/publications" },
  { id: 4, date: "Feb 25, 2026", tag: "Workshop", title: "Hands-on Workshop: Advanced NMR Techniques for Organic Chemists", link: "/seminars/upcoming" },
  { id: 5, date: "Feb 18, 2026", tag: "Achievement", title: "Department ranks #1 in NIRF Chemistry Rankings 2026", link: "/about/overview" },
  { id: 6, date: "Feb 10, 2026", tag: "Seminar", title: "Distinguished Lecture Series: Nobel Laureate Prof. Ben Feringa", link: "/seminars/upcoming" },
];

// --- Interactive Spotlight Card for Core Domains ---
const DomainCard = ({ icon: Icon, title, description, linkText, linkTo, useHoverButton = false }) => {
  const divRef = useRef(null);
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      variants={slowReveal}
      onMouseMove={handleMouseMove}
      className="group/card cursor-default bg-white/80 backdrop-blur-2xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/60 transition-all duration-300 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(180,83,9,0.15)] hover:border-orange-200"
    >
      {/* Spotlight Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(180, 83, 9, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover/card:bg-orange-50 group-hover/card:text-[#b45309] transition-all duration-300 group-hover/card:scale-110 origin-left border border-slate-100 group-hover/card:border-orange-100 shadow-sm">
          <Icon size={26} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-[#1f2937] mb-3">{title}</h3>
        <p className="text-[15px] text-[#4b5563] leading-relaxed font-medium mb-8">{description}</p>

        {useHoverButton ? (
          <div className="mt-auto">
            <InteractiveHoverButton
              text={linkText}
              onClick={() => navigate(linkTo)}
              className="w-44 border-[#b45309]/30 text-[#b45309] text-[14px] font-bold"
            />
          </div>
        ) : (
          <Link to={linkTo} className="mt-auto inline-flex items-center gap-2 font-bold text-[14px] text-[#b45309] hover:text-[#1f2937] transition-colors w-max">
            {linkText} <ArrowRight size={16} className="group-hover/card:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const rotateReverse = useTransform(smoothProgress, [0, 1], [0, -180]);
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, 90]);
  const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const drawPath = useTransform(smoothProgress, [0, 1], [0, 1]);
>>>>>>> 7b0d645cc12212bf36403d8233d3aeda1b5756ff

  useEffect(() => {
<<<<<<< HEAD
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); 
    return () => clearInterval(interval);
=======
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
>>>>>>> 7b0d645cc12212bf36403d8233d3aeda1b5756ff
  }, []);

  // Fetch notices on load (This is a public route, so no token needed here)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/notices')
      .then(response => response.json())
      .then(data => setNotices(data))
      .catch(error => console.error("Error fetching notices:", error));
  }, []);

  // ADDED: Logic to determine if the user is allowed to post notices
  const canPostNotice = userRole === 'admin' || userRole === 'faculty' || userRole === 'lab_manager';

  return (
<<<<<<< HEAD
    <div className="w-full flex-grow flex flex-col bg-white">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden text-white pt-28 pb-32 px-6 text-center border-b border-[#1f2937]">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#1f2937]/30"></div>

        <div className="relative z-10 container mx-auto max-w-5xl flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white drop-shadow-md">
              Department of Chemistry
              <span className="block text-gray-200 mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">
                Indian Institute of Technology Madras
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative pb-32">

      <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]" />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-[0] pointer-events-none">
        <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Soft Ambient Glows */}
      <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#b45309]/[0.06] rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/[0.04] rounded-full blur-[140px]"></div>
      </div>

      {/* Large Background Chemistry Hexagons */}
      <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="fixed top-[10%] left-[-5%] z-[1] opacity-[0.05] pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
          <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" />
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeDasharray="2 2" />
        </svg>
      </motion.div>

      {/* Content Layer */}
      <div className="container relative z-20 mx-auto px-6 pt-28 md:pt-32 pb-16 max-w-7xl">

        {/* Hero Section */}
        <header className="mb-20 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          <div className="lg:col-span-7 relative z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
                <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                EST. 1959
>>>>>>> 7b0d645cc12212bf36403d8233d3aeda1b5756ff
              </span>
              <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">IIT Madras</span>
            </motion.div>

            <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-8 uppercase text-slate-950 text-shadow-sm">
              DEPARTMENT <br /> OF <span className="text-[#b45309] relative inline-block">CHEMISTRY</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed mb-10 drop-shadow-sm">
              Pioneering research, world-class education, and interdisciplinary innovation in chemical sciences at India's premier institute.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="flex flex-col sm:flex-row gap-4">
              {/* Animated Primary Button */}
              <Link to="/about/overview" className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#1f2937] text-white font-semibold rounded-xl border border-[#1f2937] shadow-lg shadow-slate-300/50 hover:bg-white hover:text-[#b45309] hover:border-[#b45309] hover:shadow-[0_8px_20px_rgba(180,83,9,0.15)] transition-all duration-300 overflow-hidden text-[15px] min-w-[180px]">
                <div className="flex items-center transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-3">
                  <div className="w-2 h-2 rounded-full bg-white mr-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:scale-0 group-hover:-translate-x-3" />
                  <span>Discover More</span>
                </div>
                <div className="absolute right-6 opacity-0 -translate-x-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight size={18} />
                </div>
              </Link>

              {/* Animated Secondary Button */}
              <Link to="/academics" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-xl border border-slate-200 text-[#1f2937] font-semibold rounded-xl shadow-lg shadow-slate-200/50 hover:bg-[#1f2937] hover:border-[#1f2937] hover:text-white hover:shadow-[0_8px_20px_rgba(31,41,55,0.15)] transition-all duration-300 overflow-hidden text-[15px] min-w-[200px]">
                <div className="flex items-center transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#b45309] mr-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:scale-0 group-hover:-translate-x-3" />
                  <span>Academic Programs</span>
                </div>
                <div className="absolute right-6 opacity-0 -translate-x-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Glass Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full aspect-[4/5] lg:aspect-[3/4] max-w-md mx-auto lg:ml-auto"
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-slate-300/40 rounded-3xl overflow-hidden p-2 flex flex-col pointer-events-none">
              <div className="flex-1 w-full rounded-2xl overflow-hidden relative isolate">
                {HERO_IMAGES.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${img})` }}
                  >
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
                  </div>
                ))}
              </div>
              <div className="h-12 w-full flex items-center justify-between px-6 z-10 bg-white/40 backdrop-blur-md">
                <div className="flex gap-2.5 items-center pointer-events-auto">
                  {HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${idx === currentSlide ? 'bg-[#b45309] w-6' : 'bg-slate-100 w-2'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
<<<<<<< HEAD
        </div>
      </section>

      {/* Overview Metric Banner */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-black/5">
          <div className="lg:w-1/3 p-10 flex flex-col justify-center bg-[#f5f6f8] border-b lg:border-b-0 lg:border-r border-[#e5e7eb]">
             <h2 className="text-2xl font-bold text-[#1f2937] tracking-tight">At a Glance</h2>
             <div className="w-10 h-1 bg-[#b45309] mt-4 mb-4"></div>
             <p className="text-[#4b5563] font-medium leading-relaxed">A leading institutional hub for chemical research, rigorous education, and global scientific discovery.</p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e7eb]">
             <div className="p-10 flex flex-col justify-center items-center text-center group">
               <div className="text-5xl font-extrabold text-[#1f2937] group-hover:text-[#b45309] transition-colors duration-300">50+</div>
               <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mt-4">Faculty Members</div>
             </div>
             <div className="p-10 flex flex-col justify-center items-center text-center group bg-[#fafafa]">
               <div className="text-5xl font-extrabold text-[#1f2937] group-hover:text-[#b45309] transition-colors duration-300">4</div>
               <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mt-4">Research Centers</div>
             </div>
             <div className="p-10 flex flex-col justify-center items-center text-center group">
               <div className="text-5xl font-extrabold text-[#1f2937] group-hover:text-[#b45309] transition-colors duration-300">100s</div>
               <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mt-4">Yearly Publications</div>
             </div>
          </div>
        </div>
      </section>

      {/*ADDED by rajdeep  Notice Board Section */}
      <section className="w-full py-12 px-6 bg-[#f9fafb] border-y border-[#e5e7eb]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Bell className="text-[#b45309]" size={28} />
            <div>
              <h2 className="text-3xl font-bold text-[#1f2937]">Department Notices</h2>
              <div className="w-16 h-[3px] bg-[#b45309] mt-3"></div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDE: The Notices List */}
            {/* If they CANNOT post (like a student), this takes up the full width (w-full). Otherwise, 2/3 width. */}
            <div className={`${canPostNotice ? 'lg:w-2/3' : 'w-full'} grid grid-cols-1 md:grid-cols-2 gap-6 h-fit`}>
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <div key={notice.id} className="bg-white p-6 border-l-4 border-[#b45309] shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#1f2937] mb-3">{notice.title}</h3>
                    <p className="text-[#4b5563] mb-4 leading-relaxed">{notice.content}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500 font-semibold bg-gray-100 inline-block px-3 py-1 rounded">
                        {notice.author}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{notice.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500 italic bg-white border border-dashed border-gray-300">
                  No notices available at this time.
                </div>
              )}
            </div>

            {/* RIGHT SIDE: The Submission Form (ONLY SHOWS IF AUTHORIZED) */}
            {canPostNotice && (
              <div className="lg:w-1/3 bg-white p-8 border border-[#e5e7eb] shadow-sm rounded-sm h-fit">
                <h3 className="text-xl font-bold text-[#1f2937] mb-6">Post a New Notice</h3>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newNotice = {
                      title: formData.get('title'),
                      content: formData.get('content'),
                      // ADDED: Deadline payload
                      deadline: formData.get('deadline') 
                      // REMOVED: author is no longer here, backend handles it!
                    };

                    const token = localStorage.getItem('token');

                    try {
                      const res = await fetch('http://127.0.0.1:8000/api/notices', {
                        method: 'POST',
                        headers: { 
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}` 
                        },
                        body: JSON.stringify(newNotice)
                      });

                      if (res.ok) {
                        const data = await res.json();
                        setNotices([data, ...notices]); 
                        e.target.reset(); 
                        alert("Notice published successfully!");
                      } else {
                        const errorData = await res.json();
                        alert(`The Server Bouncer says: ${errorData.msg || errorData.error}`);
                      }
                    } catch (err) {
                      console.error("Failed to post notice:", err);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notice Title</label>
                    <input name="title" required type="text" className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-[#b45309]" placeholder="e.g. Lab Closure" />
                  </div>
                  
                  {/* MODIFIED: Replaced Author Name with Expiration Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Expiration Deadline</label>
                    <input name="deadline" type="datetime-local" className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-[#b45309]" />
                    <p className="text-xs text-gray-500 mt-1">Leave blank for permanent notice.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Details</label>
                    <textarea name="content" required rows="4" className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-[#b45309]" placeholder="Enter notice details here..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#1f2937] hover:bg-black text-white font-bold py-3 mt-2 transition-colors">
                    Publish Notice
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="w-full py-20 px-6 bg-[#ffffff]">
        {/* ... (Pillars section remains exactly the same) ... */}
        <div className="container mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-[#1f2937] mb-4">Focus Areas</h2>
            <div className="w-16 h-[3px] bg-[#b45309]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <BookOpen size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Academic Programs</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">BS, Dual Degree, MSc, and PhD programs designed to forge the next generation of scientists.</p>
              <Link to="/academics" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                View Curriculum <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <FlaskConical size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Research Facilities</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">State-of-the-art facilities ranging from theoretical catalysis to advanced materials and energy storage.</p>
              <Link to="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                Explore Research <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <Users size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Our Community</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">A diverse and vibrant community of globally recognized faculty, brilliant students, and notable alumni.</p>
              <Link to="/people" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>
            
             <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <Globe size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Global Collaborations</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">Fostering strong partnerships with national and international universities and industry alliances.</p>
              <Link to="/collaborations/international" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                View Partnerships <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
=======
          </motion.div>
        </header>

        {/* --- HIGHLY POLISHED SEPARABLE LAYOUT --- */}
        <div className="relative">
          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 lg:divide-x lg:divide-slate-200/80 border-t lg:border-t-0 lg:border-l border-slate-200/80">

              {/* === LEFT: UPDATES WIDGET (4 Columns) === */}
              <div className="lg:col-span-4 flex flex-col lg:pr-12">
                <motion.h2 variants={slowReveal} className="text-2xl font-black mb-8 flex items-center gap-4 text-[#1f2937] uppercase tracking-tight relative">
                  <span className="bg-[#b45309] text-white px-5 py-2.5 text-[15px] rounded-xl shadow-[0_8px_20px_rgba(180,83,9,0.3)] flex items-center gap-2">
                    <Megaphone size={18} /> Latest Updates
                  </span>
                </motion.h2>

                {/* ENHANCED SHADOW: Deep shadow-2xl behind the unified updates panel */}
                <motion.div variants={slowReveal} className="bg-white/80 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] p-3 shadow-2xl shadow-slate-200/60 flex flex-col">
                  {ANNOUNCEMENTS.map((announcement, idx) => (
                    <Link to={announcement.link} key={announcement.id} className={`group block p-5 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-transparent hover:border-orange-200/50 ${idx !== ANNOUNCEMENTS.length - 1 ? 'mb-1' : ''}`}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider bg-orange-50 px-2 py-1 rounded-md">{announcement.tag}</span>
                          <span className="text-slate-400 font-semibold text-xs">{announcement.date}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-[15px] font-bold text-[#1f2937] group-hover:text-[#b45309] transition-colors leading-snug">{announcement.title}</h3>
                          <ArrowRight size={18} className="text-slate-300 group-hover:text-[#b45309] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </div>
                    </Link>
                  ))}

                  <div className="px-5 pt-4 pb-2 border-t border-slate-200/60 mt-2">
                    <Link to="/announcements" className="text-[#1f2937] font-bold text-sm flex items-center gap-2 hover:text-[#b45309] transition-colors group w-max border-b-2 border-transparent hover:border-[#b45309] pb-1">
                      View All Announcements <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* === RIGHT: CORE DOMAINS (8 Columns) === */}
              <div className="lg:col-span-8 flex flex-col lg:pl-12">
                <motion.h2 variants={slowReveal} className="text-2xl font-black mb-8 flex items-center gap-4 text-[#1f2937] uppercase tracking-tight relative">
                  <span className="bg-[#1f2937] text-white px-5 py-2.5 text-[15px] rounded-xl shadow-[0_8px_20px_rgba(31,41,55,0.25)] flex items-center gap-2">
                    <Layers size={18} /> Core Domains
                  </span>
                  <span className="h-[1px] bg-slate-200 flex-grow ml-2 hidden sm:block"></span>
                </motion.h2>

                {/* Interactive Spotlight Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  <DomainCard
                    icon={BookOpen}
                    title="Academic Programs"
                    description="BS, Dual Degree, MSc, and PhD programs designed to forge the next generation of scientists."
                    linkText="View Curriculum"
                    linkTo="/academics"
                  />
                  <DomainCard
                    icon={FlaskConical}
                    title="Research Facilities"
                    description="State-of-the-art facilities ranging from theoretical catalysis to advanced materials and energy storage."
                    linkText="Explore Research"
                    linkTo="/research"
                    useHoverButton={true}
                  />
                  <DomainCard
                    icon={Users}
                    title="Community"
                    description="A diverse and vibrant community of globally recognized faculty, brilliant students, and notable alumni."
                    linkText="Meet the Team"
                    linkTo="/people"
                  />
                  <DomainCard
                    icon={Globe}
                    title="Global Collaborations"
                    description="Fostering strong partnerships with national and international universities and industry alliances."
                    linkText="View Partnerships"
                    linkTo="/collaborations/international"
                  />
                </div>
              </div>

            </div>
          </motion.section>

        </div>
      </div>
>>>>>>> 7b0d645cc12212bf36403d8233d3aeda1b5756ff
    </div>
  );
};

export default Home;