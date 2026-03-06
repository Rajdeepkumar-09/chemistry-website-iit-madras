import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronRight, FlaskConical, GraduationCap, Atom } from 'lucide-react';
import { motion, useScroll, useSpring, useInView, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';
import FACULTY_DATA from '../data/facultyData';

// --- Animation Variants ---
const slowReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};

const mechanicalReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

// --- Branch Color Mapping ---
const BRANCH_COLORS = {
  Organic: {
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200/60',
    hoverBorder: 'hover:border-amber-300/60',
    hoverShadow: 'hover:shadow-amber-500/10',
    hoverText: 'group-hover:text-amber-600',
    glow: 'rgba(245, 158, 11, 0.10)',
    filterActive: 'bg-amber-600 shadow-amber-500/25',
    chevron: 'group-hover:text-amber-600',
  },
  Inorganic: {
    gradient: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-500/20',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200/60',
    hoverBorder: 'hover:border-blue-300/60',
    hoverShadow: 'hover:shadow-blue-500/10',
    hoverText: 'group-hover:text-blue-600',
    glow: 'rgba(59, 130, 246, 0.10)',
    filterActive: 'bg-blue-600 shadow-blue-500/25',
    chevron: 'group-hover:text-blue-600',
  },
  Physical: {
    gradient: 'from-purple-500 to-indigo-600',
    shadow: 'shadow-purple-500/20',
    text: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200/60',
    hoverBorder: 'hover:border-purple-300/60',
    hoverShadow: 'hover:shadow-purple-500/10',
    hoverText: 'group-hover:text-purple-600',
    glow: 'rgba(168, 85, 247, 0.10)',
    filterActive: 'bg-purple-600 shadow-purple-500/25',
    chevron: 'group-hover:text-purple-600',
  },
  Theoretical: {
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/60',
    hoverBorder: 'hover:border-emerald-300/60',
    hoverShadow: 'hover:shadow-emerald-500/10',
    hoverText: 'group-hover:text-emerald-600',
    glow: 'rgba(16, 185, 129, 0.10)',
    filterActive: 'bg-emerald-600 shadow-emerald-500/25',
    chevron: 'group-hover:text-emerald-600',
  },
};

// --- Interactive Card with Glow ---
const GlowCard = ({ children, className = '', glowColor = 'rgba(180,83,9,0.08)', ...props }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 rounded-3xl"
        style={{
          opacity,
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </motion.div>
  );
};

const BRANCHES = ['All', 'Organic', 'Inorganic', 'Physical', 'Theoretical'];

const FacultyList = () => {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('All');
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax & scroll-driven rotation
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -250]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, 180]);
  const parallax3 = useTransform(smoothProgress, [0, 1], [0, -120]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -120]);
  const rotate3 = useTransform(smoothProgress, [0, 1], [0, 90]);

  // Mouse tracking spotlight
  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);
  const smoothBgX = useSpring(bgMouseX, { stiffness: 50, damping: 20 });
  const smoothBgY = useSpring(bgMouseY, { stiffness: 50, damping: 20 });
  const handleGlobalMouseMove = (e) => { bgMouseX.set(e.clientX); bgMouseY.set(e.clientY); };

  const filtered = FACULTY_DATA.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.area.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branch === 'All' || f.branch === branch;
    return matchSearch && matchBranch;
  });

  return (
    <div onMouseMove={handleGlobalMouseMove} className="min-h-screen bg-slate-50 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative">

      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-[#b45309] z-[100]" />

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 to-orange-50/15">
        <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Mouse Spotlight */}
        <motion.div
          className="absolute inset-0 z-0 opacity-70"
          style={{ background: useMotionTemplate`radial-gradient(600px circle at ${smoothBgX}px ${smoothBgY}px, rgba(180,83,9,0.06), transparent 80%)` }}
        />

        {/* Ambient Blurs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] bg-gradient-to-br from-[#b45309]/[0.05] to-transparent rounded-full blur-[100px] transform-gpu"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-bl from-amber-500/[0.04] to-transparent rounded-full blur-[120px] transform-gpu"
        />

        {/* Scroll-Driven Floating Elements */}
        <motion.div
          style={{ y: parallax1, rotate: rotate1 }}
          className="absolute top-[12%] right-[8%] opacity-[0.07] text-amber-700"
        >
          <FlaskConical size={100} strokeWidth={1.2} />
        </motion.div>

        <motion.div
          style={{ y: parallax2, rotate: rotate2 }}
          className="absolute top-[55%] left-[2%] opacity-[0.05] text-[#1f2937]"
        >
          <GraduationCap size={120} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ y: parallax3, rotate: rotate3 }}
          className="absolute top-[78%] right-[12%] opacity-[0.06] text-[#b45309]"
        >
          <Atom size={80} strokeWidth={1.2} />
        </motion.div>
      </div>

      {/* --- CONTENT --- */}
      <div className="container relative z-20 mx-auto px-6 pt-24 pb-20 max-w-7xl">

        {/* Hero */}
        <header className="mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
              <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
              People
            </span>
            <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">Department of Chemistry</span>
          </motion.div>

          <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-6 uppercase">
            FACULTY <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-[#b45309]">DIRECTORY</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
            {FACULTY_DATA.length} faculty members across all branches of chemistry — Organic, Inorganic, Physical, and Theoretical.
          </motion.p>

          {/* Head of Department */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
            <Link
              to="/people/faculty/sekar"
              className="mt-8 flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-5 max-w-xl hover:border-[#b45309]/30 hover:shadow-xl hover:shadow-[#b45309]/5 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#b45309] to-amber-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-[#b45309]/20 group-hover:scale-105 transition-transform">
                GS
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#b45309] mb-0.5">Head of Department</p>
                <h3 className="text-base font-bold text-[#1f2937] group-hover:text-[#b45309] transition-colors">Prof. G. Sekar</h3>
                <p className="text-xs text-[#4b5563]">Asymmetric Synthesis · Catalysis</p>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-[#b45309] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </motion.div>
        </header>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty by name or area..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl text-sm focus:outline-none focus:border-[#b45309]/40 focus:ring-2 focus:ring-[#b45309]/10 transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {BRANCHES.map(b => {
                const bc = BRANCH_COLORS[b];
                return (
                  <button
                    key={b}
                    onClick={() => setBranch(b)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${branch === b
                      ? `${bc ? bc.filterActive : 'bg-[#b45309] shadow-[#b45309]/25'} text-white shadow-lg`
                      : 'bg-white/70 backdrop-blur-xl border border-slate-200/80 text-[#4b5563] hover:border-slate-300 hover:text-[#1f2937]'
                      }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 font-medium">{filtered.length} faculty member{filtered.length !== 1 ? 's' : ''} found</p>
        </motion.div>

        {/* Faculty Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((f) => {
            const bc = BRANCH_COLORS[f.branch] || BRANCH_COLORS.Organic;
            return (
              <motion.div key={f.slug} variants={slowReveal}>
                <GlowCard glowColor={bc.glow}>
                  <Link
                    to={`/people/faculty/${f.slug}`}
                    className={`group flex items-start gap-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 ${bc.hoverBorder} hover:shadow-xl ${bc.hoverShadow} transition-all duration-300 hover:-translate-y-1 h-full`}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bc.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md ${bc.shadow}`}>
                      {f.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`text-[14px] font-bold text-[#1f2937] ${bc.hoverText} transition-colors leading-tight`}>{f.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{f.title}</p>
                      <p className="text-[11px] text-[#4b5563] mt-0.5 font-medium">{f.area}</p>
                      <span className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wider ${bc.text} ${bc.bg} px-2 py-0.5 rounded-md ${bc.border}`}>{f.branch}</span>
                    </div>
                    <ChevronRight size={14} className={`text-slate-200 ${bc.chevron} group-hover:translate-x-0.5 transition-all mt-1 shrink-0`} />
                  </Link>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyList;
