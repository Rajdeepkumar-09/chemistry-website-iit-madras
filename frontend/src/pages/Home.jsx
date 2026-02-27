import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BookOpen, FlaskConical, Users, Globe, ArrowRight } from 'lucide-react';
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

// --- Decorative Background Components ---
const AtomParticle = ({ progress, index }) => {
  const y = useTransform(progress, [0, 1], ['0%', `${(index + 1) * 80}%`]);
  return (
    <motion.div
      style={{ y, left: `${(index * 15) + 10}%`, opacity: 0.03 }}
      className="fixed top-[5%] z-[2] pointer-events-none"
    >
      <div className="w-24 h-24 border border-[#1f2937] rounded-full flex items-center justify-center relative">
        <div className="w-2 h-2 bg-[#b45309] rounded-full" />
        {/* Electron Orbit rings */}
        <div className="absolute inset-0 border border-[#1f2937]/50 rounded-full transform rotate-45 scale-75"></div>
        <div className="absolute inset-0 border border-[#1f2937]/50 rounded-full transform -rotate-45 scale-75"></div>
      </div>
    </motion.div>
  );
};

// --- Sub-Components ---
const MetricCard = ({ number, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-10px" }}
    transition={{ duration: 0.6, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    className="border border-black/[0.04] rounded-2xl bg-white/70 backdrop-blur-2xl p-6 md:p-8 flex flex-col justify-center items-center group cursor-default shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(180,83,9,0.1)] transition-all duration-300 relative z-20 hover:-translate-y-1"
  >
    <div className="text-4xl md:text-5xl font-black text-[#1f2937] tracking-tighter group-hover:text-[#b45309] transition-colors">{number}</div>
    <div className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-widest mt-3">
      {label}
    </div>
  </motion.div>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Translation Hooks
  const rotateFast = useTransform(smoothProgress, [0, 1], [0, 720]);
  const rotateReverse = useTransform(smoothProgress, [0, 1], [0, -360]);
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, 180]);
  const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const scanLineY = useTransform(smoothProgress, [0, 1], ["0vh", "100vh"]);
  const drawPath = useTransform(smoothProgress, [0, 1], [0, 1.2]);


  const contentRef = useRef(null);
  const { scrollYProgress: contentScroll } = useScroll({
    target: contentRef,
    offset: ["start center", "end end"]
  });

  // Slider automated progression
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative pb-32">
      
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]"
      />

      {/* --- LAYER 1: BASE GRIDS --- */}
      <motion.div style={{ y: panUpSlow }} className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
      </motion.div>
      <div className="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#f3f4f6_120%)]"></div>

      {/* --- LAYER 2: HIGH-DENSITY INTERACTIVE SCROLL ELEMENTS --- */}
      {[...Array(6)].map((_, i) => (
        <AtomParticle key={i} progress={smoothProgress} index={i} />
      ))}

      {/* Vertical Data Stream (Right Side) */}
      <div className="fixed top-0 right-8 h-full w-[1px] bg-black/[0.04] z-[3] hidden xl:block pointer-events-none">
        <motion.div
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-transparent via-[#b45309] to-[#b45309] origin-top"
        />
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-4 h-[1px] bg-black/[0.1] right-0" style={{ top: `${i * 10}%` }}>
          </div>
        ))}
      </div>




      {/* Molecular Structures Parallax */}
      <motion.div
        style={{ y: panUpSlow, rotate: rotateReverse }}
        className="fixed top-[20%] right-[5%] z-[3] pointer-events-none opacity-[0.04] hidden lg:block hover:opacity-10 transition-opacity"
      >
        {/* Hexagonal Benzene Ring styling */}
        <svg width="250" height="250" viewBox="0 0 100 100">
           <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" stroke="#1f2937" strokeWidth="1" fill="none" />
           <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
           <motion.circle
             style={{ pathLength: drawPath }}
             cx="50" cy="55" r="30" stroke="#b45309" strokeWidth="1.5" fill="none"
           />
        </svg>
      </motion.div>

      <motion.div className="fixed top-[60%] left-[2%] z-[3] pointer-events-none opacity-[0.03] flex items-center hover:opacity-10 transition-opacity">
        <motion.svg style={{ rotate: rotateSlow }} width="150" height="150" viewBox="0 0 100 100">
          <polygon points="50,5 90,27 90,72 50,95 10,72 10,27" stroke="#1f2937" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="#b45309" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        </motion.svg>
      </motion.div>


      {/* --- CONTENT LAYER --- */}
      <div className="container relative z-20 mx-auto px-6 pt-4 pb-16 max-w-7xl">

        {/* --- Hero Section Hybrid --- */}
        <header className="mb-16 md:mb-24 mt-2 md:mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          
          {/* Typography Panel (Left) */}
          <div className="lg:col-span-7 relative z-10">

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-black/[0.04] shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
                <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                EST. 1959
              </span>
              <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">IIT Madras</span>
            </motion.div>

            <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-8 uppercase">
              DEPARTMENT <br /> OF <span className="text-[#b45309] relative inline-block">CHEMISTRY</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed mb-10">
              Pioneering research, world-class education, and interdisciplinary innovation in chemical sciences at India's premier institute.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }} className="flex flex-col sm:flex-row gap-4">
               <Link to="/about/overview" className="bg-[#1f2937] text-white font-semibold py-4 px-8 rounded-xl shadow-[0_8px_20px_rgba(31,41,55,0.15)] hover:bg-[#111827] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-[15px]">
                 Discover More <ArrowRight size={18} />
               </Link>
               <Link to="/academics" className="bg-white/70 backdrop-blur-xl border border-black/[0.08] text-[#1f2937] font-semibold py-4 px-8 rounded-xl shadow-sm hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center text-[15px]">
                 Academic Programs
               </Link>
            </motion.div>
          </div>

          {/* Precision Image Slider Panel (Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full aspect-[4/5] lg:aspect-[3/4] max-w-md mx-auto lg:ml-auto"
          >
            {/* The "Glass" Housing */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden p-2 flex flex-col pointer-events-none">
              <div className="flex-1 w-full rounded-2xl overflow-hidden relative isolate">
                
                {/* Image Tracks */}
                {HERO_IMAGES.map((img, idx) => (
                   <div 
                     key={idx}
                     className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                     style={{ backgroundImage: `url(${img})` }}
                   >
                     {/* Overlay for structural tone */}
                     <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
                   </div>
                ))}

              </div>
              
              {/* Technical Indicator Footer */}
              <div className="h-12 w-full flex items-center justify-between px-6 z-10 bg-white/40 backdrop-blur-md">
                <div className="flex gap-2.5 items-center pointer-events-auto">
                  {HERO_IMAGES.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${idx === currentSlide ? 'bg-[#b45309] w-6' : 'bg-black/[0.1] hover:bg-black/[0.2] w-2'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Context HUD elements outside the slider */}
            <motion.div style={{ rotate: rotateSlow }} className="absolute -top-6 -right-6 z-0 mix-blend-multiply opacity-10">
              <FlaskConical size={80} />
            </motion.div>

          </motion.div>

        </header>

        {/* Narrative Flow Segment */}
        <div className="relative max-w-5xl mx-auto" ref={contentRef}>
          {/* Main timeline axis shadow */}
          <motion.div
            style={{ scaleY: contentScroll, transformOrigin: "top" }}
            className="absolute left-[15px] md:left-[-40px] top-2 bottom-0 w-[1px] bg-black/[0.08] hidden md:block z-0 rounded-full"
          />

          <div className="space-y-16 md:space-y-24 relative z-10 pl-0 md:pl-0 lg:pl-6">

            {/* --- At a Glance Metrics --- */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="relative">
              <div className="hidden md:flex absolute left-[-45px] top-2 w-3 h-3 bg-white/80 backdrop-blur-sm border border-black/[0.08] rounded-full items-center justify-center z-10 shadow-sm">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#b45309] rounded-full" />
              </div>

              <motion.div variants={slowReveal} className="mb-8 bg-white/70 backdrop-blur-2xl p-6 md:p-10 border border-black/[0.04] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(180,83,9,0.05),transparent)]"></div>
                <h2 className="text-2xl lg:text-3xl font-black text-[#1f2937] uppercase tracking-tight mb-3 flex items-center gap-4">
                  Institutional Scope
                  <div className="h-1 w-10 bg-[#b45309] rounded-full"></div>
                </h2>
                <p className="text-[#4b5563] font-medium text-base md:text-lg leading-relaxed max-w-3xl">
                  A leading institutional hub for chemical research, rigorous education, and global scientific discovery, backed by world-class infrastructure.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard number="50+" label="Faculty Members" delay={0.2} />
                <MetricCard number="4" label="Research Centers" delay={0.3} />
                <MetricCard number="100s" label="Yearly Publications" delay={0.4} />
              </div>
            </motion.section>

            {/* --- Focus Areas --- */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="relative">
              <div className="hidden md:flex absolute left-[-45px] top-2 w-3 h-3 bg-[#b45309] rounded-full items-center justify-center z-10 shadow-sm"></div>

              <motion.h2 variants={slowReveal} className="text-2xl md:text-3xl font-black mb-8 flex items-center gap-4 text-[#1f2937] uppercase tracking-tight relative">
                <span className="bg-[#1f2937] text-white px-5 py-2 text-xl rounded-xl shadow-[0_4px_12px_rgba(31,41,55,0.1)]">Strategic Pillars</span>
                <span className="h-[1px] bg-black/[0.08] flex-grow ml-2"></span>
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-5">
                
                {/* Pillar 1 */}
                <motion.div variants={slowReveal} className="group cursor-default bg-white/70 backdrop-blur-2xl p-8 border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(180,83,9,0.08)] transition-all duration-300 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1">
                  <div className="mb-5 inline-block text-black/[0.08] group-hover:text-[#b45309] transition-all duration-300 group-hover:scale-110 origin-left">
                    <BookOpen size={30} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-2">Academic Programs</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed font-medium mb-6">BS, Dual Degree, MSc, and PhD programs designed to forge the next generation of scientists.</p>
                  <Link to="/academics" className="mt-auto inline-flex items-center gap-2 font-semibold text-[14px] text-[#b45309] hover:text-[#1f2937] transition-colors">
                    View Curriculum <ArrowRight size={16} />
                  </Link>
                </motion.div>

                {/* Pillar 2 */}
                <motion.div variants={slowReveal} className="group cursor-default bg-white/70 backdrop-blur-2xl p-8 border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(180,83,9,0.08)] transition-all duration-300 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1">
                  <div className="mb-5 inline-block text-black/[0.08] group-hover:text-[#b45309] transition-all duration-300 group-hover:scale-110 origin-left">
                    <FlaskConical size={30} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-2">Research Facilities</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed font-medium mb-6">State-of-the-art facilities ranging from theoretical catalysis to advanced materials and energy storage.</p>
                  <Link to="/research" className="mt-auto inline-flex items-center gap-2 font-semibold text-[14px] text-[#b45309] hover:text-[#1f2937] transition-colors">
                    Explore Research <ArrowRight size={16} />
                  </Link>
                </motion.div>

                {/* Pillar 3 */}
                <motion.div variants={slowReveal} className="group cursor-default bg-white/70 backdrop-blur-2xl p-8 border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(180,83,9,0.08)] transition-all duration-300 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1">
                  <div className="mb-5 inline-block text-black/[0.08] group-hover:text-[#b45309] transition-all duration-300 group-hover:scale-110 origin-left">
                    <Users size={30} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-2">Community</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed font-medium mb-6">A diverse and vibrant community of globally recognized faculty, brilliant students, and notable alumni.</p>
                  <Link to="/people" className="mt-auto inline-flex items-center gap-2 font-semibold text-[14px] text-[#b45309] hover:text-[#1f2937] transition-colors">
                    Meet the Team <ArrowRight size={16} />
                  </Link>
                </motion.div>
                
                 {/* Pillar 4 */}
                 <motion.div variants={slowReveal} className="group cursor-default bg-white/70 backdrop-blur-2xl p-8 border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(180,83,9,0.08)] transition-all duration-300 flex flex-col h-full rounded-3xl relative overflow-hidden hover:-translate-y-1">
                  <div className="mb-5 inline-block text-black/[0.08] group-hover:text-[#b45309] transition-all duration-300 group-hover:scale-110 origin-left">
                    <Globe size={30} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-2">Global Collaborations</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed font-medium mb-6">Fostering strong partnerships with national and international universities and industry alliances.</p>
                  <Link to="/collaborations/international" className="mt-auto inline-flex items-center gap-2 font-semibold text-[14px] text-[#b45309] hover:text-[#1f2937] transition-colors">
                    View Partnerships <ArrowRight size={16} />
                  </Link>
                </motion.div>

              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
