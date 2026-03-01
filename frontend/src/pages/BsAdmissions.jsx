import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Download, FlaskConical,
  Microscope, Atom, BookOpen, Check,
  CalendarDays, Ruler, GraduationCap, 
  Network, DoorOpen, Activity, Layers, Cpu
} from 'lucide-react';

// --- Extracted Data ---
const overviewHighlights = [
  {
    icon: <Microscope size={28} strokeWidth={1.5} />,
    title: "Instrumentation Access",
    desc: "Undergraduate access to NMR spectrometers, X-ray diffractometers, and HPC clusters right from year one."
  },
  {
    icon: <Atom size={28} strokeWidth={1.5} />,
    title: "Applied Research",
    desc: "Join specialized faculty-led research groups and publish papers in recognized journals starting in year two."
  },
  {
    icon: <BookOpen size={28} strokeWidth={1.5} />,
    title: "Modern Curriculum",
    desc: "Bridging core chemistry with physics, advanced materials science, and AI in molecular design."
  }
];

const infrastructureFacilities = [
  {
    icon: <Activity size={28} strokeWidth={1.5} />,
    title: "Advanced Spectroscopy",
    desc: "Dedicated 24/7 hubs housing 400/500 MHz NMR, high-resolution Mass Spectrometry (LC-MS/GC-MS), and EPR."
  },
  {
    icon: <Layers size={28} strokeWidth={1.5} />,
    title: "Materials Characterization",
    desc: "In-house Powder and Single-Crystal X-Ray Diffractometers, AFM, and SEM facilities for nanomaterials."
  },
  {
    icon: <Cpu size={28} strokeWidth={1.5} />,
    title: "Computational Clusters",
    desc: "High-Performance Computing (HPC) nodes specifically allocated for molecular dynamics and quantum chemistry simulations."
  }
];

const programFlexibility = [
  { 
    icon: <GraduationCap size={28} strokeWidth={1.5} />,
    title: 'MS Upgrade Option', 
    desc: 'Transition seamlessly into a 5th-year Master of Science (MS) program.' 
  },
  { 
    icon: <Network size={28} strokeWidth={1.5} />,
    title: 'Interdisciplinary Minors', 
    desc: 'Opt for a minor in Data Science, Biology, or Computational Engineering.' 
  },
  { 
    icon: <DoorOpen size={28} strokeWidth={1.5} />,
    title: 'Early Exit Option', 
    desc: 'Flexibility to exit after the 3rd year with a foundational BSc degree.' 
  },
];

const careerPathways = [
  { title: 'R&D and Innovation', desc: 'Leading pharmaceutical, materials, and green energy companies.' },
  { title: 'Global Academia', desc: 'Direct pathways to PhD programs at top-tier international universities.' },
  { title: 'Consulting & Analytics', desc: 'Roles in scientific consulting, data analysis, and patent law.' },
];

const admissionRequirements = [
  'Completion of Class 12 (or equivalent) in the Science stream.',
  'Mandatory subjects: Physics, Chemistry, and Mathematics.',
  'Admissions exclusively through the IISER Aptitude Test (IAT).'
];

const importantDates = [
  { event: 'Application Portal Opens', date: 'Mar 15, 2026' },
  { event: 'IISER Aptitude Test (IAT)', date: 'Jun 08, 2026' },
  { event: 'First Seat Allotment', date: 'Jul 12, 2026' },
  { event: 'Commencement of Classes', date: 'Aug 01, 2026' },
];

// --- Animation Variants ---
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

// --- Interactive Mouse-Tracking Card ---
const InteractiveCard = ({ children, className, ...props }) => {
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
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(208,93,20,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- Sub-Components ---
const PeriodicFact = ({ number, symbol, name, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    className="border border-[#1C2B3A]/10 rounded-2xl bg-white/80 backdrop-blur-xl p-5 w-full flex flex-col justify-between aspect-square max-h-[150px] shadow-lg hover:shadow-xl hover:shadow-[#D05D14]/10 transition-all duration-500 group cursor-default relative z-20 hover:-translate-y-1.5"
  >
    <div className="flex justify-between items-start font-mono text-xs text-[#1C2B3A]/50">
      <span className="group-hover:text-[#D05D14] transition-colors font-bold">{number}</span>
      <span className="opacity-40 border border-[#1C2B3A]/20 rounded px-1.5 py-0.5 group-hover:border-[#D05D14] group-hover:text-[#D05D14] transition-colors text-[9px]">DATA</span>
    </div>
    <div className="text-center my-1">
      <h3 className="text-3xl lg:text-4xl font-black text-[#1C2B3A] tracking-tighter group-hover:text-[#D05D14] transition-colors">{symbol}</h3>
      <p className="text-[9px] font-mono uppercase tracking-widest text-[#1C2B3A]/60 mt-1">{name}</p>
    </div>
    <div className="text-center border-t border-[#1C2B3A]/10 pt-2 font-mono text-xs font-bold text-[#D05D14] transition-colors">
      {value}
    </div>
  </motion.div>
);

const DustParticle = ({ progress, index }) => {
  const y = useTransform(progress, [0, 1], ['0%', `${(index + 1) * 60}%`]);
  return (
    <motion.div
      style={{ y, left: `${(index * 25) + 10}%`, opacity: 0.03 }}
      className="fixed top-[5%] z-[2] pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-12 h-12 border border-[#1C2B3A] rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-[#D05D14] rounded-full" />
      </div>
    </motion.div>
  );
};

// --- UPDATED: Smaller SVG Blueprint Atom ---
const BlueprintAtom = ({ progress }) => {
  const rotateSlow = useTransform(progress, [0, 1], [0, 180]);
  const rotateReverse = useTransform(progress, [0, 1], [0, -180]);
  const y = useTransform(progress, [0, 1], ['0%', '25%']);

  return (
    <motion.div
      style={{ y }}
      // Significantly reduced width and height, adjusted positioning slightly inward
      className="fixed top-[15%] left-[-5%] lg:left-[2%] z-[0] w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] pointer-events-none opacity-[0.05] flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Smaller Center Nucleus */}
      <div className="absolute w-8 h-8 bg-[#1C2B3A] rounded-full" />
      
      {/* Rotating Ellipses (Orbitals) - Slightly thicker stroke for visibility at smaller size */}
      <motion.svg style={{ rotate: rotateSlow }} viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
        <ellipse cx="50" cy="50" rx="48" ry="16" fill="none" stroke="#1C2B3A" strokeWidth="0.8" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="48" ry="16" fill="none" stroke="#1C2B3A" strokeWidth="0.8" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="50" rx="48" ry="16" fill="none" stroke="#1C2B3A" strokeWidth="0.8" transform="rotate(150 50 50)" />
        
        {/* Orbital nodes (Electrons) */}
        <circle cx="9" cy="26" r="2" fill="#D05D14" />
        <circle cx="91" cy="74" r="2" fill="#1C2B3A" />
      </motion.svg>

      {/* Inner Rotating Ring */}
      <motion.svg style={{ rotate: rotateReverse }} viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
        <circle cx="50" cy="50" r="28" fill="none" stroke="#D05D14" strokeWidth="0.8" strokeDasharray="2 4" />
      </motion.svg>
    </motion.div>
  );
};

// --- Main Component ---
const BsAdmissions = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const rotateFast = useTransform(smoothProgress, [0, 1], [0, 720]);
  const rotateReverse = useTransform(smoothProgress, [0, 1], [0, -360]);
  const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-10%']);
  const drawPath = useTransform(smoothProgress, [0, 1], [0, 1.2]);

  const contentRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F4] via-[#F2F2EF] to-[#EAEAE7] text-[#1C2B3A] font-sans selection:bg-[#D05D14] selection:text-white overflow-hidden relative pb-32">

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 w-full h-1.5 bg-[#D05D14] z-[100] shadow-[0_2px_10px_rgba(208,93,20,0.4)]"
      />

      {/* --- LAYER 1: AMBIENT GRIDS & GLOWS --- */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(208,93,20,0.04),transparent_50%)]" aria-hidden="true" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(28,43,58,0.03),transparent_60%)]" aria-hidden="true" />
      
      <motion.div style={{ y: panUpSlow }} className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#1C2B3A 1px, transparent 1px), linear-gradient(90deg, #1C2B3A 1px, transparent 1px)`, backgroundSize: '12px 12px' }}></div>
      </motion.div>
      <motion.div style={{ y: panUpSlow }} className="fixed inset-0 z-[1] pointer-events-none opacity-[0.06]" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#1C2B3A 1px, transparent 1px), linear-gradient(90deg, #1C2B3A 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
      </motion.div>

      {/* --- LAYER 2: BACKGROUND ELEMENTS --- */}
      {[...Array(3)].map((_, i) => (
        <DustParticle key={i} progress={smoothProgress} index={i} />
      ))}
      <BlueprintAtom progress={smoothProgress} />

      <motion.div
        style={{ y: panUpSlow, rotate: rotateReverse }}
        className="fixed top-[20%] right-[5%] z-[0] pointer-events-none opacity-[0.04] hidden lg:block hover:opacity-10 transition-opacity"
        aria-hidden="true"
      >
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#1C2B3A" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
          <motion.circle
            style={{ pathLength: drawPath }}
            cx="50" cy="50" r="35" stroke="#D05D14" strokeWidth="1" fill="none"
          />
          <circle cx="50" cy="15" r="3" fill="#1C2B3A" />
        </svg>
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <div className="container relative z-20 mx-auto px-6 py-16 md:py-24 max-w-7xl">

        {/* --- HERO SECTION --- */}
        <header className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#1C2B3A]/10 pb-20 relative z-10">
          <div className="lg:col-span-6 relative z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-3 mb-6 bg-white inline-flex pr-4 py-1.5 rounded-full border border-[#1C2B3A]/10 shadow-sm">
              <span className="px-3 py-1 bg-[#1C2B3A] text-white font-mono text-xs uppercase tracking-widest relative overflow-hidden group shadow-md rounded-full ml-1">
                <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                IIT Madras
              </span>
              <span className="font-mono text-sm text-[#1C2B3A] font-bold pl-1 pr-2">Admissions 2026-27</span>
            </motion.div>

            <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-[#1C2B3A] mb-6 uppercase">
              BS  <br />
              <span className="text-[#D05D14] inline-flex items-center gap-3 relative drop-shadow-sm mt-2">
                CHEMISTRY
                <motion.div style={{ rotate: rotateFast }} className="origin-center">
                  <FlaskConical size={56} className="text-[#1C2B3A]/10 hidden sm:block" strokeWidth={1.5} />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }} className="text-lg md:text-xl font-medium text-[#1C2B3A]/70 max-w-xl leading-relaxed mt-6">
              A four-year rigorous undergraduate framework designed for advanced foundational research and interdisciplinary chemical sciences at India's premier institute.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }} className="flex flex-wrap items-center gap-4 mt-10">
              <button className="bg-[#1C2B3A] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#D05D14] transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Discover More <ArrowRight size={18} />
              </button>
              <button className="bg-white text-[#1C2B3A] border border-[#1C2B3A]/20 px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#F6F6F4] transition-colors duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Academic Programs
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 relative mt-10 lg:mt-0"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <img 
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000" 
                alt="Chemistry Laboratory at IIT Madras" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1C2B3A]/20 to-transparent mix-blend-multiply" />
            </div>
            
            <div className="absolute -bottom-8 -left-4 w-36 sm:w-44 z-20">
              <PeriodicFact number="01" symbol="4Y" name="Duration" value="PROGRAM" delay={0.6} />
            </div>
            <div className="absolute -bottom-8 -right-4 w-36 sm:w-44 z-20">
              <PeriodicFact number="02" symbol="15+" name="Core Labs" value="FACILITIES" delay={0.8} />
            </div>
            
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[radial-gradient(circle,#D05D14_2px,transparent_2px)] bg-[size:12px_12px] opacity-20 rounded-full z-0" />
          </motion.div>
        </header>

        {/* --- STICKY SIDEBAR + INTERACTIVE BENTO GRID SECTIONS --- */}
        <div className="relative w-full space-y-40" ref={contentRef}>

          {/* 1. Structural Highlights */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
            <div className="lg:col-span-4 lg:sticky lg:top-32 z-10 flex flex-col justify-start">
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                 <span className="font-mono text-[#D05D14] font-bold text-sm tracking-widest">01 //</span>
                 <div className="h-px bg-[#1C2B3A]/20 flex-grow max-w-[50px]"></div>
              </motion.div>
              
              <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-[#1C2B3A] tracking-tight leading-[1.1]">
                Structural <br/><span className="text-[#D05D14]">Highlights</span>
              </motion.h2>
              
              <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#1C2B3A]/70 font-medium pl-4 border-l-2 border-[#D05D14]/30">
                Core advantages that define the BS Chemistry framework from day one.
              </motion.p>
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 hidden lg:flex w-12 h-12 rounded-full border border-[#1C2B3A]/10 items-center justify-center text-[#1C2B3A]/30">
                <ArrowRight size={20} />
              </motion.div>
            </div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6 relative z-10">
              {overviewHighlights.map((item, idx) => (
                <InteractiveCard 
                  key={idx} 
                  variants={slowReveal} 
                  className={`group bg-white border border-[#1C2B3A]/10 shadow-sm hover:shadow-2xl hover:shadow-[#D05D14]/10 rounded-3xl p-8 ${idx === 2 ? 'sm:col-span-2 sm:flex-row sm:items-center gap-8' : ''}`}
                >
                  <div className={`mb-6 inline-block self-start p-4 bg-[#1C2B3A]/5 rounded-2xl text-[#D05D14] group-hover:bg-[#D05D14]/10 group-hover:scale-110 transition-all duration-300 ${idx === 2 ? 'mb-0 shrink-0' : ''}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C2B3A] mb-3 leading-tight">{item.title}</h3>
                    <p className="text-[#1C2B3A]/70 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          </section>

          {/* 2. Research Infrastructure */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
            <div className="lg:col-span-4 lg:sticky lg:top-32 z-10 flex flex-col justify-start">
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                 <span className="font-mono text-[#D05D14] font-bold text-sm tracking-widest">02 //</span>
                 <div className="h-px bg-[#1C2B3A]/20 flex-grow max-w-[50px]"></div>
              </motion.div>

              <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-[#1C2B3A] tracking-tight leading-[1.1]">
                Research <br/><span className="text-[#D05D14]">Facilities</span>
              </motion.h2>

              <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#1C2B3A]/70 font-medium pl-4 border-l-2 border-[#D05D14]/30">
                Unrestricted access to state-of-the-art analytical and computational environments.
              </motion.p>
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 hidden lg:flex w-12 h-12 rounded-full border border-[#1C2B3A]/10 items-center justify-center text-[#1C2B3A]/30">
                <ArrowRight size={20} />
              </motion.div>
            </div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6 relative z-10">
              {infrastructureFacilities.map((facility, idx) => (
                <InteractiveCard 
                  key={idx} 
                  variants={slowReveal} 
                  className={`group bg-white border border-[#1C2B3A]/10 shadow-sm hover:shadow-2xl hover:shadow-[#D05D14]/10 rounded-3xl p-8 ${idx === 2 ? 'sm:col-span-2 sm:flex-row sm:items-center gap-8' : ''}`}
                >
                  <div className={`mb-6 inline-block self-start p-4 bg-[#1C2B3A]/5 rounded-2xl text-[#1C2B3A]/40 group-hover:text-[#D05D14] group-hover:bg-[#D05D14]/10 group-hover:scale-110 transition-all duration-300 ${idx === 2 ? 'mb-0 shrink-0' : ''}`}>
                    {facility.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C2B3A] mb-3 leading-tight">{facility.title}</h3>
                    <p className="text-[#1C2B3A]/70 leading-relaxed font-medium">{facility.desc}</p>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          </section>

          {/* 3. Academic Flexibility */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
            <div className="lg:col-span-4 lg:sticky lg:top-32 z-10 flex flex-col justify-start">
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                 <span className="font-mono text-[#D05D14] font-bold text-sm tracking-widest">03 //</span>
                 <div className="h-px bg-[#1C2B3A]/20 flex-grow max-w-[50px]"></div>
              </motion.div>

              <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-[#1C2B3A] tracking-tight leading-[1.1]">
                Academic <br/><span className="text-[#D05D14]">Flexibility</span>
              </motion.h2>
              
              <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#1C2B3A]/70 font-medium pl-4 border-l-2 border-[#D05D14]/30">
                Tailor your academic journey with interdisciplinary minors and multiple exit options.
              </motion.p>
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 hidden lg:flex w-12 h-12 rounded-full border border-[#1C2B3A]/10 items-center justify-center text-[#1C2B3A]/30">
                <ArrowRight size={20} />
              </motion.div>
            </div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6 relative z-10">
              {programFlexibility.map((flex, idx) => (
                <InteractiveCard 
                  key={idx} 
                  variants={slowReveal} 
                  className={`group bg-white border border-[#1C2B3A]/10 shadow-sm hover:shadow-2xl hover:shadow-[#D05D14]/10 rounded-3xl p-8 ${idx === 2 ? 'sm:col-span-2 sm:flex-row sm:items-center gap-8' : ''}`}
                >
                  <div className={`mb-6 inline-block self-start p-4 bg-[#1C2B3A]/5 rounded-2xl text-[#1C2B3A]/40 group-hover:text-[#D05D14] group-hover:bg-[#D05D14]/10 group-hover:scale-110 transition-all duration-300 ${idx === 2 ? 'mb-0 shrink-0' : ''}`}>
                    {flex.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C2B3A] mb-3 leading-tight">{flex.title}</h3>
                    <p className="text-[#1C2B3A]/70 leading-relaxed font-medium">{flex.desc}</p>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          </section>

          {/* 4. Career Vectors */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
            <div className="lg:col-span-4 lg:sticky lg:top-32 z-10 flex flex-col justify-start">
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                 <span className="font-mono text-[#D05D14] font-bold text-sm tracking-widest">04 //</span>
                 <div className="h-px bg-[#1C2B3A]/20 flex-grow max-w-[50px]"></div>
              </motion.div>

              <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-[#1C2B3A] tracking-tight leading-[1.1]">
                Career <br/><span className="text-[#D05D14]">Vectors</span>
              </motion.h2>

              <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#1C2B3A]/70 font-medium pl-4 border-l-2 border-[#D05D14]/30">
                Graduate equipped for top-tier industry roles and global academic programs.
              </motion.p>
              <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 hidden lg:flex w-12 h-12 rounded-full border border-[#1C2B3A]/10 items-center justify-center text-[#1C2B3A]/30">
                <ArrowRight size={20} />
              </motion.div>
            </div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6 relative z-10">
              {careerPathways.map((path, idx) => (
                <InteractiveCard 
                  key={idx} 
                  variants={slowReveal} 
                  className={`group bg-white border border-[#1C2B3A]/10 shadow-sm hover:shadow-2xl hover:shadow-[#D05D14]/10 rounded-3xl p-8 ${idx === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="font-mono text-[#1C2B3A]/10 text-5xl font-black mb-4 group-hover:text-[#D05D14]/20 transition-all duration-300 group-hover:scale-110 origin-left">
                    {`0${idx + 1}`}
                  </div>
                  <h3 className="text-xl font-bold text-[#1C2B3A] mb-3 leading-tight group-hover:text-[#D05D14] transition-colors">{path.title}</h3>
                  <p className="text-[#1C2B3A]/70 leading-relaxed font-medium">{path.desc}</p>
                </InteractiveCard>
              ))}
            </motion.div>
          </section>

        </div> {/* End of Sticky Sections */}

        {/* --- THE COMMAND CENTER (Admission Protocol) --- */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative mt-40 z-10 border-t border-[#1C2B3A]/10 pt-24">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.h2 variants={slowReveal} className="text-3xl md:text-5xl font-black mb-4 text-[#1C2B3A] uppercase tracking-tight">
              Admission Protocol
            </motion.h2>
            <motion.p variants={slowReveal} className="text-lg text-[#1C2B3A]/70 font-medium">
              Everything you need to know to secure your place in the upcoming cohort.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#1C2B3A]/10 bg-white shadow-2xl rounded-3xl relative overflow-hidden">
            <div className="lg:col-span-3 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#1C2B3A]/10 flex flex-col justify-between relative bg-white">
              <div>
                <h3 className="text-sm tracking-widest text-[#1C2B3A] font-bold mb-8 uppercase flex items-center gap-2">
                  <Check size={18} className="text-[#D05D14]" strokeWidth={3} />
                  Eligibility Criteria
                </h3>
                <ul className="space-y-6 mb-12">
                  {admissionRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-lg text-[#1C2B3A]/80 font-medium leading-relaxed group">
                      <span className="text-[#1C2B3A]/30 group-hover:text-[#D05D14] transition-colors shrink-0 font-black">{idx + 1}.</span>
                      <span className="group-hover:text-[#1C2B3A] transition-colors">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-10 border-t border-[#1C2B3A]/10 relative z-10">
                <button className="w-full bg-[#1C2B3A] text-white py-4 px-6 flex justify-between items-center transition-all duration-300 group font-bold text-lg relative overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#1C2B3A]/30 hover:-translate-y-1 rounded-xl">
                  <span className="relative z-10">Initialize Application</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-[#D05D14] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0"></div>
                </button>
                <button className="w-full bg-[#F6F6F4] border border-[#1C2B3A]/10 text-[#1C2B3A] py-4 px-6 flex justify-center gap-2 items-center transition-all duration-300 font-bold text-lg hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:border-[#1C2B3A]/30 rounded-xl">
                  <Download size={20} className="text-[#1C2B3A]/60" /> Syllabus PDF File
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 md:p-12 relative overflow-hidden bg-gradient-to-b from-white to-[#F2F2EF]">
              <h3 className="text-sm tracking-widest text-[#1C2B3A] font-bold mb-8 uppercase flex justify-between items-center relative z-10">
                <span className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-[#D05D14]" strokeWidth={2} />
                  Official Schedule
                </span>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-[#D05D14] rounded-full shadow-[0_0_8px_#D05D14]"></motion.div>
              </h3>

              <div className="relative pl-6 border-l-2 border-[#1C2B3A]/10 space-y-8 z-10 mt-6">
                {importantDates.map((item, idx) => (
                  <div key={idx} className="relative group cursor-default">
                    <div className="absolute w-4 h-4 bg-white border-2 border-[#1C2B3A]/20 rounded-full -left-[33px] top-1 group-hover:border-[#D05D14] transition-colors duration-300 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-transparent rounded-full group-hover:bg-[#D05D14] transition-colors duration-300" />
                    </div>
                    
                    <div className="flex flex-col">
                       <span className="text-sm text-[#D05D14] font-bold mb-1 tracking-wide uppercase">
                        {item.date}
                      </span>
                      <span className="text-[#1C2B3A] text-lg font-medium group-hover:text-[#D05D14] transition-colors">
                        {item.event}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default BsAdmissions;