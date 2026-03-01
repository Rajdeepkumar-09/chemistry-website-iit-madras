import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BookOpen, FlaskConical, Users, Globe, ArrowRight, Megaphone, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// --- UPDATED: Interactive Spotlight Card for Core Domains ---
const DomainCard = ({ icon: Icon, title, description, linkText, linkTo }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      variants={slowReveal}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="group cursor-default bg-white/90 backdrop-blur-2xl p-8 border border-slate-200/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(180,83,9,0.25)] hover:border-orange-300"
    >
      {/* High-Intensity Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(180,83,9,0.15), transparent 40%)`,
        }}
      />
      
      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-[#b45309] transition-all duration-300 group-hover:scale-110 origin-left border border-slate-200 group-hover:border-orange-200 shadow-sm">
          <Icon size={26} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-[#1f2937] mb-3">{title}</h3>
        <p className="text-[15px] text-[#4b5563] leading-relaxed font-medium mb-8">{description}</p>
        <Link to={linkTo} className="mt-auto inline-flex items-center gap-2 font-bold text-[14px] text-[#b45309] hover:text-[#1f2937] transition-colors w-max">
          {linkText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative pb-32">
      <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]" />

      {/* --- ADVANCED DYNAMIC BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 to-orange-50/20">
        <div className="absolute inset-0 opacity-[0.3] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] bg-gradient-to-br from-[#b45309]/[0.07] via-orange-400/[0.03] to-transparent rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[25%] right-[-15%] w-[55vw] h-[55vw] bg-gradient-to-bl from-blue-600/[0.04] via-cyan-400/[0.02] to-transparent rounded-full blur-[120px]"
        />

        {/* --- LARGE SVG ATOM (top-left) — scroll-reactive --- */}
        <motion.div
          style={{
            y: panUpSlow,
            rotate: useTransform(smoothProgress, [0, 1], [0, 90]),
          }}
          className="absolute top-[5%] left-[-6%] lg:left-[0%] opacity-[0.07]"
          aria-hidden="true"
        >
          <svg width="500" height="500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="14" fill="#b45309" opacity="0.3" />
            <circle cx="100" cy="100" r="8" fill="#1f2937" />
            <circle cx="100" cy="100" r="5" fill="#b45309" opacity="0.6" />

            <ellipse cx="100" cy="100" rx="85" ry="32" stroke="#1f2937" strokeWidth="1.2" strokeDasharray="4 3" />
            <circle cx="185" cy="100" r="5" fill="#b45309">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="12s" repeatCount="indefinite" />
            </circle>

            <ellipse cx="100" cy="100" rx="70" ry="28" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 4" transform="rotate(60 100 100)" />
            <circle cx="170" cy="100" r="4" fill="#b45309" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="120 100 100" to="480 100 100" dur="16s" repeatCount="indefinite" />
            </circle>

            <ellipse cx="100" cy="100" rx="60" ry="24" stroke="#1f2937" strokeWidth="0.8" strokeDasharray="2 4" transform="rotate(-60 100 100)" />
            <circle cx="160" cy="100" r="3.5" fill="#b45309" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="240 100 100" to="600 100 100" dur="20s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>

        {/* --- SMALLER SVG ATOM (bottom-right) — scroll-reactive --- */}
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ['0%', '-35%']),
            rotate: useTransform(smoothProgress, [0, 1], [0, -60]),
          }}
          className="absolute top-[55%] right-[0%] lg:right-[5%] opacity-[0.05]"
          aria-hidden="true"
        >
          <svg width="320" height="320" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="10" fill="#b45309" opacity="0.3" />
            <circle cx="100" cy="100" r="6" fill="#b45309" />

            <ellipse cx="100" cy="100" rx="75" ry="28" stroke="#b45309" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="175" cy="100" r="4" fill="#1f2937">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="14s" repeatCount="indefinite" />
            </circle>

            <ellipse cx="100" cy="100" rx="65" ry="22" stroke="#b45309" strokeWidth="0.8" strokeDasharray="2 3" transform="rotate(70 100 100)" />
            <circle cx="165" cy="100" r="3" fill="#1f2937" opacity="0.7">
              <animateTransform attributeName="transform" type="rotate" from="180 100 100" to="540 100 100" dur="18s" repeatCount="indefinite" />
            </circle>

            <ellipse cx="100" cy="100" rx="55" ry="18" stroke="#b45309" strokeWidth="0.6" strokeDasharray="2 4" transform="rotate(-55 100 100)" />
          </svg>
        </motion.div>

        {/* --- FLOATING MOLECULAR BONDS (mid-right) --- */}
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ['0%', '-25%']),
            rotate: useTransform(smoothProgress, [0, 1], [0, 30]),
            x: useTransform(smoothProgress, [0, 1], ['0%', '-5%']),
          }}
          className="absolute top-[30%] right-[12%] opacity-[0.08]"
          aria-hidden="true"
        >
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="30" r="6" fill="#1f2937" />
            <circle cx="25" cy="70" r="4.5" fill="#b45309" />
            <circle cx="75" cy="70" r="4.5" fill="#b45309" />
            <line x1="50" y1="36" x2="28" y2="66" stroke="#1f2937" strokeWidth="2" />
            <line x1="50" y1="36" x2="72" y2="66" stroke="#1f2937" strokeWidth="2" />
            <line x1="50" y1="30" x2="50" y2="10" stroke="#1f2937" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="25" y1="70" x2="8" y2="82" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="75" y1="70" x2="92" y2="82" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          </svg>
        </motion.div>

        {/* --- SMALL BENZENE RING (floating) --- */}
        <motion.div
          style={{
            y: useTransform(smoothProgress, [0, 1], ['0%', '-50%']),
            rotate: useTransform(smoothProgress, [0, 1], [0, 45]),
          }}
          className="absolute top-[70%] left-[10%] opacity-[0.05]"
          aria-hidden="true"
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" stroke="#1f2937" strokeWidth="1.5" />
            <polygon points="50,25 70,37.5 70,62.5 50,75 30,62.5 30,37.5" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="50" cy="15" r="3" fill="#b45309" opacity="0.6" />
            <circle cx="80" cy="32.5" r="2.5" fill="#b45309" opacity="0.5" />
            <circle cx="80" cy="67.5" r="2.5" fill="#b45309" opacity="0.5" />
            <circle cx="50" cy="85" r="3" fill="#b45309" opacity="0.6" />
            <circle cx="20" cy="67.5" r="2.5" fill="#b45309" opacity="0.5" />
            <circle cx="20" cy="32.5" r="2.5" fill="#b45309" opacity="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container relative z-20 mx-auto px-6 pt-28 md:pt-32 pb-16 max-w-7xl">
        <header className="mb-20 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          <div className="lg:col-span-7 relative z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
                <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                EST. 1959
              </span>
              <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">IIT Madras</span>
            </motion.div>

            <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-8 uppercase text-shadow-sm">
              DEPARTMENT <br /> OF <span className="text-[#b45309] relative inline-block">CHEMISTRY</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed mb-10 drop-shadow-sm">
              Pioneering research, world-class education, and interdisciplinary innovation in chemical sciences at India's premier institute.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="flex flex-col sm:flex-row gap-4">
              <Link to="/about/overview" className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#1f2937] text-white font-semibold rounded-xl border border-[#1f2937] shadow-lg hover:bg-white hover:text-[#b45309] hover:border-[#b45309] hover:shadow-[0_8px_25px_rgba(180,83,9,0.25)] transition-all duration-300 overflow-hidden text-[15px] min-w-[180px]">
                <div className="flex items-center transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-3">
                  <div className="w-2 h-2 rounded-full bg-white mr-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:scale-0 group-hover:-translate-x-3" />
                  <span>Discover More</span>
                </div>
                <div className="absolute right-6 opacity-0 -translate-x-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight size={18} />
                </div>
              </Link>

              <Link to="/academics" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-xl border border-slate-200 text-[#1f2937] font-semibold rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:bg-[#1f2937] hover:border-[#1f2937] hover:text-white hover:shadow-[0_8px_25px_rgba(31,41,55,0.25)] transition-all duration-300 overflow-hidden text-[15px] min-w-[200px]">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full aspect-[4/5] lg:aspect-[3/4] max-w-md mx-auto lg:ml-auto"
          >
            <div className="absolute inset-0 bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden p-2 flex flex-col pointer-events-none">
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
              <div className="h-12 w-full flex items-center justify-between px-6 z-10 bg-white/60 backdrop-blur-md">
                <div className="flex gap-2.5 items-center pointer-events-auto">
                  {HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${idx === currentSlide ? 'bg-[#b45309] w-6' : 'bg-slate-300 w-2 hover:bg-slate-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="relative">
          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 lg:divide-x lg:divide-slate-200/80">

              {/* === LEFT: UPDATES WIDGET === */}
              <div className="lg:col-span-4 flex flex-col lg:pr-12">
                <motion.div variants={slowReveal} className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b45309] to-[#d97706] flex items-center justify-center shadow-[0_8px_20px_rgba(180,83,9,0.35)]">
                    <Megaphone size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-[#1f2937] uppercase tracking-tight">Latest Updates</h2>
                </motion.div>

                <motion.div variants={slowReveal} className="bg-gradient-to-b from-white/95 to-orange-50/40 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col flex-1">
                  {ANNOUNCEMENTS.map((announcement, idx) => (
                    <Link to={announcement.link} key={announcement.id} className={`group block p-5 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-transparent hover:border-orange-200/80 ${idx !== ANNOUNCEMENTS.length - 1 ? 'mb-1' : ''}`}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider bg-orange-50 px-2 py-1 rounded-md border border-orange-100/50">{announcement.tag}</span>
                          <span className="text-slate-500 font-semibold text-xs">{announcement.date}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-[15px] font-bold text-[#1f2937] group-hover:text-[#b45309] transition-colors leading-snug">{announcement.title}</h3>
                          <ArrowRight size={18} className="text-slate-300 group-hover:text-[#b45309] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </div>
                    </Link>
                  ))}

                  <div className="px-5 pt-4 pb-2 border-t border-slate-200/80 mt-2">
                    <Link to="/announcements" className="text-[#1f2937] font-bold text-sm flex items-center gap-2 hover:text-[#b45309] transition-colors group w-max border-b-2 border-transparent hover:border-[#b45309] pb-1">
                      View All Announcements <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* === RIGHT: CORE DOMAINS === */}
              <div className="lg:col-span-8 flex flex-col lg:pl-12">
                <motion.div variants={slowReveal} className="flex items-center gap-4 mb-8 mt-16 lg:mt-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#334155] flex items-center justify-center shadow-[0_8px_20px_rgba(31,41,55,0.3)]">
                    <Layers size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-[#1f2937] uppercase tracking-tight">Core Domains</h2>
                  <span className="h-[1px] bg-slate-200 flex-grow ml-2 hidden sm:block"></span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full bg-gradient-to-br from-transparent via-slate-50/50 to-orange-50/30 rounded-3xl p-1">
                  <DomainCard icon={BookOpen} title="Academic Programs" description="BS, Dual Degree, MSc, and PhD programs designed to forge the next generation of scientists." linkText="View Curriculum" linkTo="/academics" />
                  <DomainCard icon={FlaskConical} title="Research Facilities" description="State-of-the-art facilities ranging from theoretical catalysis to advanced materials and energy storage." linkText="Explore Research" linkTo="/research" />
                  <DomainCard icon={Users} title="Community" description="A diverse and vibrant community of globally recognized faculty, brilliant students, and notable alumni." linkText="Meet the Team" linkTo="/people" />
                  <DomainCard icon={Globe} title="Global Collaborations" description="Fostering strong partnerships with national and international universities and industry alliances." linkText="View Partnerships" linkTo="/collaborations/international" />
                </div>
              </div>

            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Home;