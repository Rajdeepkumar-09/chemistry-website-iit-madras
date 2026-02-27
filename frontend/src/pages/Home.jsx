import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
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

// --- Dummy Data for Announcements ---
const ANNOUNCEMENTS = [
  { id: 1, date: "Mar 15, 2026", tag: "Admissions", title: "PhD Admissions Open for Fall 2026 Semester", link: "/admissions/phd" },
  { id: 2, date: "Mar 10, 2026", tag: "Event", title: "International Conference on Catalysis & Energy Systems", link: "/seminars/upcoming" },
  { id: 3, date: "Mar 02, 2026", tag: "Research", title: "Prof. Sharma's Lab publishes breakthrough in Nature Chemistry", link: "/research/publications" },
];

// --- Interactive Spotlight Card for Core Domains ---
const DomainCard = ({ icon: Icon, title, description, linkText, linkTo }) => {
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
      // ENHANCED SHADOW: Added shadow-xl shadow-slate-200/60 for a deep, floating base shadow
      className="group cursor-default bg-white/80 backdrop-blur-2xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/60 transition-all duration-300 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(180,83,9,0.15)] hover:border-orange-200"
    >
      {/* Spotlight Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
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

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-[#b45309] transition-all duration-300 group-hover:scale-110 origin-left border border-slate-100 group-hover:border-orange-100 shadow-sm">
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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const rotateReverse = useTransform(smoothProgress, [0, 1], [0, -180]);
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, 90]);
  const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const drawPath = useTransform(smoothProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
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
    </div>
  );
};

export default Home;
