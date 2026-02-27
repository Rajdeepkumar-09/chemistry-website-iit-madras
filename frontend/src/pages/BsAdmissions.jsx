import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Download, FlaskConical,
  Microscope, Atom, BookOpen, Check,
  CalendarDays, Ruler, GraduationCap, 
  Network, DoorOpen
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

const careerPathways = [
  { title: 'R&D and Innovation', desc: 'Leading pharmaceutical, materials, and green energy companies.' },
  { title: 'Global Academia', desc: 'Direct pathways to PhD programs at top-tier international universities.' },
  { title: 'Consulting & Analytics', desc: 'Roles in scientific consulting, data analysis, and patent law.' },
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

// --- Sub-Components ---
const PeriodicFact = ({ number, symbol, name, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    className="border border-[#111111]/10 rounded-xl bg-white p-5 w-full flex flex-col justify-between aspect-square max-h-[160px] hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#0055FF]/10 transition-all duration-300 group cursor-default relative z-20"
  >
    <div className="flex justify-between items-start font-mono text-xs text-[#111111]/50">
      <span className="group-hover:text-[#0055FF] transition-colors font-bold">{number}</span>
      <span className="opacity-50 border border-[#111111]/20 rounded px-1 group-hover:border-[#0055FF] group-hover:text-[#0055FF] transition-colors">DATA</span>
    </div>
    <div className="text-center my-2">
      <h3 className="text-4xl font-black text-[#111111] tracking-tighter group-hover:text-[#0055FF] transition-colors">{symbol}</h3>
      <p className="text-xs font-mono uppercase tracking-widest text-[#111111]/60 mt-1">{name}</p>
    </div>
    <div className="text-center border-t border-[#111111]/5 pt-2 font-mono text-sm font-bold text-[#0055FF] transition-colors">
      {value}
    </div>
  </motion.div>
);

const DustParticle = ({ progress, index }) => {
  const y = useTransform(progress, [0, 1], ['0%', `${(index + 1) * 60}%`]);
  return (
    <motion.div
      style={{ y, left: `${(index * 18) + 5}%`, opacity: 0.04 }}
      className="fixed top-[5%] z-[2] pointer-events-none"
    >
      <div className="w-16 h-16 border border-[#111111] rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-[#0055FF] rounded-full" />
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const BsAdmissions = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Rotations & Translations
  const rotateFast = useTransform(smoothProgress, [0, 1], [0, 720]);
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, 180]);
  const rotateReverse = useTransform(smoothProgress, [0, 1], [0, -360]);

  const panDown = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const panUpFast = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);
  const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const panRight = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

  const drawPath = useTransform(smoothProgress, [0, 1], [0, 1.2]);
  const scanLineY = useTransform(smoothProgress, [0, 1], ["0vh", "100vh"]);

  const contentRef = useRef(null);
  const { scrollYProgress: contentScroll } = useScroll({
    target: contentRef,
    offset: ["start center", "end end"]
  });

  return (
    <div className="min-h-screen bg-[#F6F6F4] text-[#111111] font-sans selection:bg-[#0055FF] selection:text-white overflow-hidden relative pb-32">

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 w-full h-2 bg-[#0055FF] z-[100] shadow-[0_4px_20px_rgba(0,85,255,0.6)]"
      />

      {/* --- LAYER 1: BASE GRIDS --- */}
      <motion.div style={{ y: panUpSlow }} className="fixed inset-0 z-[1] pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)`, backgroundSize: '10px 10px' }}></div>
      </motion.div>
      <motion.div style={{ y: panUpSlow }} className="fixed inset-0 z-[1] pointer-events-none opacity-[0.10]">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
      </motion.div>
      <div className="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#F6F6F4_120%)]"></div>

      {/* --- LAYER 2: HIGH-DENSITY INTERACTIVE SCROLL ELEMENTS --- */}

      {/* 1. Parallax Dust Particles */}
      {[...Array(6)].map((_, i) => (
        <DustParticle key={i} progress={smoothProgress} index={i} />
      ))}

      {/* 2. Vertical Data Stream (Right Side) */}
      <div className="fixed top-0 right-8 h-full w-[1px] bg-[#111111]/10 z-[3] hidden xl:block pointer-events-none">
        <motion.div
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-transparent via-[#0055FF] to-[#0055FF] origin-top shadow-[0_0_10px_#0055FF]"
        />
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-4 h-[1px] bg-[#111111]/20 right-0" style={{ top: `${i * 10}%` }}>
            <span className="absolute right-6 top-[-6px] font-mono text-[8px] opacity-40">0{i}..SEQ</span>
          </div>
        ))}
      </div>

      {/* 3. The Scanning HUD Line */}
      <motion.div
        style={{ top: scanLineY }}
        className="fixed left-0 w-full h-[1px] bg-[#0055FF]/30 z-[50] pointer-events-none shadow-[0_0_15px_rgba(0,85,255,0.5)] hidden md:block"
      >
        <div className="absolute right-12 top-0 bg-[#0055FF] text-white font-mono text-[9px] px-2 py-0.5 tracking-widest rounded-bl-md">
          SYS.SCAN_ACTIVE
        </div>
      </motion.div>

      {/* 4. The Graphene Matrix (Background Left) */}
      <motion.div
        style={{ y: panDown, x: panRight }}
        className="fixed top-[-20%] left-[-10%] z-[3] pointer-events-none opacity-[0.03]"
      >
        <svg width="600" height="1200" viewBox="0 0 100 200">
          <pattern id="hexagons" width="17.32" height="30" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path d="M8.66 0 L17.32 5 L17.32 15 L8.66 20 L0 15 L0 5 Z M8.66 30 L17.32 25 L17.32 15 M0 25 L8.66 30" stroke="#111111" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </motion.div>

      {/* 5. Orbital Mechanics (Mid-Right) */}
      <motion.div
        style={{ y: panUpSlow, rotate: rotateReverse }}
        className="fixed top-[30%] right-[10%] z-[3] pointer-events-none opacity-[0.06] hidden lg:block hover:opacity-10 transition-opacity"
      >
        <svg width="250" height="250" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#111111" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
          <motion.circle
            style={{ pathLength: drawPath }}
            cx="50" cy="50" r="35" stroke="#0055FF" strokeWidth="1" fill="none"
          />
          <circle cx="50" cy="15" r="3" fill="#111111" />
        </svg>
      </motion.div>

      {/* 6. Gear-Rotating Benzene Rings (Mid Left) */}
      <motion.div className="fixed top-[50%] left-[2%] z-[3] pointer-events-none opacity-[0.06] flex items-center hover:opacity-10 transition-opacity">
        <motion.svg style={{ rotate: rotateSlow }} width="100" height="100" viewBox="0 0 100 100">
          <polygon points="50,5 90,27 90,72 50,95 10,72 10,27" stroke="#111111" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="#0055FF" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        </motion.svg>
        <motion.svg style={{ rotate: rotateReverse, marginLeft: "-20px" }} width="100" height="100" viewBox="0 0 100 100">
          <polygon points="50,5 90,27 90,72 50,95 10,72 10,27" stroke="#111111" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="#111111" strokeWidth="1" fill="none" />
        </motion.svg>
      </motion.div>

      {/* 7. Scroll-Driven Mathematical Equations (Floating Right) */}
      <motion.div style={{ y: panUpFast }} className="fixed top-[70%] right-[8%] z-[3] pointer-events-none opacity-[0.06] font-mono text-xl font-black text-[#111111] hidden md:block hover:opacity-10 transition-opacity">
        <div className="mb-8 border-b border-[#111111]/30 pb-2">ΔG° = ΔH° - TΔS°</div>
        <div className="text-[#0055FF]">E = E° - (RT/nF)lnQ</div>
      </motion.div>

      {/* 8. The Master Astrolabe (Top Right) */}
      <div className="fixed top-[-10%] right-[-10%] z-[4] pointer-events-none opacity-[0.08] hidden lg:block hover:opacity-10 transition-opacity">
        <div className="relative w-[800px] h-[800px]">
          <motion.svg style={{ rotate: rotateSlow }} className="absolute inset-0" width="800" height="800" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="380" stroke="#111111" strokeWidth="2" strokeDasharray="4 12" />
            <circle cx="400" cy="400" r="360" stroke="#111111" strokeWidth="1" />
            <path d="M 400 0 L 400 800 M 0 400 L 800 400" stroke="#111111" strokeWidth="1" />
          </motion.svg>
          <motion.svg style={{ rotate: rotateReverse }} className="absolute inset-0" width="800" height="800" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="280" stroke="#0055FF" strokeWidth="4" strokeDasharray="20 40" />
            <circle cx="400" cy="400" r="260" stroke="#111111" strokeWidth="1" />
            <rect x="200" y="200" width="400" height="400" stroke="#111111" strokeWidth="1" fill="none" transform="rotate(45 400 400)" />
          </motion.svg>
          <motion.svg style={{ rotate: rotateFast }} className="absolute inset-0" width="800" height="800" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="100" stroke="#111111" strokeWidth="2" />
            <circle cx="400" cy="400" r="20" fill="#0055FF" />
            <circle cx="400" cy="300" r="8" fill="#111111" />
            <circle cx="400" cy="500" r="8" fill="#111111" />
          </motion.svg>
        </div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container relative z-20 mx-auto px-6 py-20 max-w-6xl">

        {/* Header */}
        <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-[#111111]/10 pb-12 relative">
          <div className="md:col-span-9 relative">
            <div className="font-mono text-[9px] text-[#111111]/50 absolute top-[110%] left-0">ref: bs_chem_core.md</div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white inline-flex pr-4 py-1.5 rounded-full border border-[#111111]/10 shadow-sm">
              <span className="px-3 py-1 bg-[#111111] text-white font-mono text-xs uppercase tracking-widest relative overflow-hidden group shadow-md rounded-full ml-1">
                <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                SYS.INIT
              </span>
              <span className="font-mono text-sm text-[#111111] font-bold pl-1 pr-2">Admissions 2026-27</span>
            </motion.div>

            <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] text-[#111111] mb-6 uppercase">
              BS  <br />
              <span className="text-[#0055FF] inline-flex items-center gap-4 relative drop-shadow-sm">
                CHEMISTRY
                <motion.div style={{ rotate: rotateFast }} className="origin-center">
                  <FlaskConical size={72} className="text-[#111111]/10 hidden md:block" strokeWidth={1.5} />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-xl md:text-2xl font-medium text-[#111111]/80 max-w-3xl leading-relaxed mt-4">
              A four-year rigorous undergraduate framework designed for advanced foundational research and interdisciplinary chemical sciences.
            </motion.p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-1 gap-4">
            <PeriodicFact number="01" symbol="4Y" name="Duration" value="4 YEARS" delay={0.8} />
            <PeriodicFact number="02" symbol="34" name="Intake" value="SEATS" delay={1.0} />
          </div>
        </header>

        {/* Narrative Content */}
        <div className="relative max-w-5xl mx-auto" ref={contentRef}>
          {/* Main timeline axis shadow */}
          <motion.div
            style={{ scaleY: contentScroll, transformOrigin: "top" }}
            className="absolute left-[15px] md:left-[-40px] top-2 bottom-0 w-[2px] bg-[#0055FF]/40 hidden md:block z-0 shadow-[0_0_15px_rgba(0,85,255,0.4)] rounded-full"
          />

          <div className="space-y-32 relative z-10 pl-0 md:pl-0">

            {/* Structural Highlights */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative">
              <div className="hidden md:flex absolute left-[-45px] top-2 w-3 h-3 bg-[#F6F6F4] border-2 border-[#111111]/30 rounded-full items-center justify-center z-10 shadow-sm">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#0055FF] rounded-full shadow-[0_0_5px_#0055FF]" />
              </div>

              <motion.h2 variants={slowReveal} className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4 text-[#111111] uppercase tracking-tight relative">
                <span className="bg-[#111111] text-white px-5 py-2 rounded-lg shadow-md">Structural Highlights</span>
                <span className="h-px bg-[#111111]/20 flex-grow ml-2"></span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {overviewHighlights.map((item, idx) => (
                  <motion.div key={idx} variants={slowReveal} className="group cursor-default bg-white p-8 border border-[#111111]/10 shadow-lg hover:shadow-2xl hover:shadow-[#0055FF]/10 transition-all duration-300 flex flex-col h-full rounded-2xl relative overflow-hidden hover:-translate-y-1">
                    <Ruler size={10} className="absolute bottom-1 right-1 text-[#111111]/20 group-hover:text-[#0055FF] transition-colors" />
                    <div className="mb-6 inline-block self-start text-[#0055FF] group-hover:scale-110 transition-transform origin-left">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#111111] mb-3">{item.title}</h3>
                    <p className="text-[#111111]/70 leading-relaxed flex-grow font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Academic Flexibility */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative">
              <div className="hidden md:flex absolute left-[-45px] top-2 w-3 h-3 bg-[#0055FF] rounded-full items-center justify-center z-10 shadow-sm"></div>

              <motion.h2 variants={slowReveal} className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4 text-[#111111] uppercase tracking-tight relative">
                <span className="bg-[#111111] text-white px-5 py-2 rounded-lg shadow-md">Academic Flexibility</span>
                <span className="h-px bg-[#111111]/20 flex-grow ml-2"></span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {programFlexibility.map((flex, idx) => (
                  <motion.div key={idx} variants={slowReveal} className="group cursor-default bg-white p-8 border border-[#111111]/10 shadow-lg hover:shadow-2xl hover:shadow-[#0055FF]/10 transition-all duration-300 flex flex-col items-center text-center h-full rounded-2xl relative overflow-hidden hover:-translate-y-1">
                    <Check size={14} className="absolute top-4 right-4 text-[#111111]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="mb-6 inline-block text-[#111111]/40 group-hover:text-[#0055FF] transition-all duration-300 group-hover:scale-110 origin-center">
                      {flex.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#111111] mb-3">{flex.title}</h3>
                    <p className="text-[#111111]/70 leading-relaxed flex-grow font-medium">{flex.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Career Vectors */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative">
              <div className="hidden md:flex absolute left-[-45px] top-2 w-3 h-3 bg-[#111111] rounded-full items-center justify-center z-10 shadow-sm"></div>

              <motion.h2 variants={slowReveal} className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4 text-[#111111] uppercase tracking-tight relative">
                <span className="bg-[#111111] text-white px-5 py-2 rounded-lg shadow-md">Career Vectors</span>
                <span className="h-px bg-[#111111]/20 flex-grow ml-2"></span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {careerPathways.map((path, idx) => (
                  <motion.div key={idx} variants={slowReveal} className="group cursor-default bg-white p-8 border border-[#111111]/10 shadow-lg hover:shadow-2xl hover:shadow-[#0055FF]/10 transition-all duration-300 flex flex-col items-center text-center h-full rounded-2xl relative overflow-hidden hover:-translate-y-1">
                    <div className="font-mono text-[#111111]/10 text-6xl font-black mb-4 group-hover:text-[#0055FF]/20 transition-all duration-300 group-hover:scale-110 origin-center">{`0${idx + 1}`}</div>
                    <h3 className="text-xl font-bold text-[#111111] mb-3 group-hover:text-[#0055FF] transition-colors">{path.title}</h3>
                    <p className="text-[#111111]/70 leading-relaxed flex-grow font-medium">{path.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* --- THE COMMAND CENTER --- */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative mt-32">
              <div className="hidden md:flex absolute left-[-45px] top-2 w-3 h-3 bg-[#111111] rounded-full items-center justify-center z-10 shadow-sm">
                <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>

              <motion.h2 variants={slowReveal} className="text-3xl md:text-5xl font-black mb-12 flex items-center gap-4 text-[#111111] uppercase tracking-tight relative">
                <span className="bg-[#111111] text-white px-5 py-2 rounded-lg shadow-md">Admission Protocol</span>
                <span className="h-px bg-[#111111]/20 flex-grow ml-2"></span>
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#111111]/10 bg-white shadow-2xl rounded-2xl relative z-20 overflow-hidden">

                {/* Requirements & Buttons */}
                <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#111111]/10 flex flex-col justify-between relative bg-white">
                  <div className="absolute top-[20%] left-0 h-32 w-[3px] bg-[#111111]/10 rounded-r-full"></div>

                  <div>
                    <h3 className="text-sm tracking-widest text-[#111111] font-bold mb-8 uppercase flex items-center gap-2">
                      <Check size={18} className="text-[#0055FF]" strokeWidth={3} />
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-6 mb-12">
                      {admissionRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-lg text-[#111111]/80 font-medium leading-relaxed group">
                          <span className="text-[#111111]/30 group-hover:text-[#0055FF] transition-colors shrink-0 font-black">{idx + 1}.</span>
                          <span className="group-hover:text-[#111111] transition-colors">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-10 border-t border-[#111111]/10 relative z-10">
                    <button className="w-full bg-[#0055FF] text-white py-4 px-6 flex justify-between items-center transition-all duration-300 group font-bold text-lg relative overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#0055FF]/30 hover:-translate-y-1 rounded-xl">
                      <span className="relative z-10">Initialize Application</span>
                      <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-white/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0"></div>
                    </button>
                    <button className="w-full bg-transparent border border-[#111111]/20 text-[#111111] py-4 px-6 flex justify-center gap-2 items-center transition-all duration-300 font-bold text-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-[#F6F6F4] hover:border-[#111111]/30 rounded-xl">
                      <Download size={20} className="text-[#111111]/60" /> Syllabus PDF File
                    </button>
                  </div>
                </div>

                {/* Timeline Schedule */}
                <div className="p-8 md:p-12 relative overflow-hidden bg-white/50">
                  <h3 className="text-sm tracking-widest text-[#111111] font-bold mb-8 uppercase flex justify-between items-center relative z-10">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={18} className="text-[#0055FF]" strokeWidth={2} />
                      Official Schedule
                    </span>
                    <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-[#0055FF] rounded-full shadow-[0_0_8px_#0055FF]"></motion.div>
                  </h3>

                  <div className="space-y-2 relative z-10">
                    {importantDates.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-[#111111]/5 bg-white shadow-sm hover:shadow-md transition-all duration-300 gap-4 sm:gap-0 relative rounded-xl hover:-translate-y-0.5 group">
                        <span className="text-[#111111] text-lg font-medium group-hover:text-[#0055FF] transition-colors">{item.event}</span>
                        <span className="text-sm text-[#0055FF] font-medium bg-[#0055FF]/10 px-3 py-1.5 whitespace-nowrap rounded-md border border-[#0055FF]/20">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BsAdmissions;