import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, ExternalLink, BookOpen, Award, GraduationCap, ChevronRight, FlaskConical } from 'lucide-react';
import FACULTY_DATA from '../data/facultyData';

// --- Animation Variants ---
const slowReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
// --- Branch Color Mapping ---
const BRANCH_COLORS = {
  Organic: { gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200/60', accent: '#d97706' },
  Inorganic: { gradient: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/20', text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200/60', accent: '#2563eb' },
  Physical: { gradient: 'from-purple-500 to-indigo-600', shadow: 'shadow-purple-500/20', text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200/60', accent: '#9333ea' },
  Theoretical: { gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200/60', accent: '#059669' },
};

// --- Interactive Glow Card ---
const GlowCard = ({ children, className = '', ...props }) => {
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
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(180,83,9,0.08), transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </motion.div>
  );
};

const FacultyProfile = () => {
  const { slug } = useParams();
  const faculty = FACULTY_DATA.find(f => f.slug === slug);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax & scroll-driven rotation
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, 150]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 150]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -100]);

  // Mouse tracking spotlight
  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);
  const smoothBgX = useSpring(bgMouseX, { stiffness: 50, damping: 20 });
  const smoothBgY = useSpring(bgMouseY, { stiffness: 50, damping: 20 });
  const handleGlobalMouseMove = (e) => { bgMouseX.set(e.clientX); bgMouseY.set(e.clientY); };

  if (!faculty) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1f2937] mb-2">Faculty Not Found</h1>
          <p className="text-sm text-[#4b5563] mb-6">The requested faculty profile does not exist.</p>
          <Link to="/people" className="inline-flex items-center gap-2 px-6 py-3 bg-[#b45309] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#b45309]/20 transition-all">
            <ArrowLeft size={14} /> Back to Faculty
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = FACULTY_DATA.findIndex(f => f.slug === slug);
  const prevFaculty = currentIndex > 0 ? FACULTY_DATA[currentIndex - 1] : null;
  const nextFaculty = currentIndex < FACULTY_DATA.length - 1 ? FACULTY_DATA[currentIndex + 1] : null;

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
          animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#b45309]/[0.05] to-transparent rounded-full blur-[100px] transform-gpu"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] bg-gradient-to-bl from-purple-500/[0.03] to-transparent rounded-full blur-[120px] transform-gpu"
        />

        {/* Scroll-Driven Floating Elements */}
        <motion.div
          style={{ y: parallax1, rotate: rotate1 }}
          className="absolute top-[18%] right-[10%] opacity-[0.06] text-amber-700"
        >
          <FlaskConical size={90} strokeWidth={1.2} />
        </motion.div>

        <motion.div
          style={{ y: parallax2, rotate: rotate2 }}
          className="absolute top-[65%] left-[3%] opacity-[0.05] text-[#1f2937]"
        >
          <BookOpen size={80} strokeWidth={0.8} />
        </motion.div>
      </div>

      {/* --- CONTENT --- */}
      <div className="container relative z-20 mx-auto px-6 pt-24 pb-20 max-w-7xl">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/people" className="inline-flex items-center gap-2 text-sm text-[#b45309] hover:text-amber-700 font-semibold mb-8 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Faculty Directory
          </Link>
        </motion.div>

        {/* Header / Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] p-8 md:p-10 mb-10 shadow-xl shadow-slate-200/40"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            {(() => {
              const bc = BRANCH_COLORS[faculty.branch] || BRANCH_COLORS.Organic;
              return (
                <>
                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br ${bc.gradient} flex items-center justify-center text-white font-black text-3xl shrink-0 shadow-xl ${bc.shadow}`}>
                    {faculty.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${bc.text} ${bc.bg} px-2.5 py-1 rounded-lg ${bc.border}`}>{faculty.branch} Chemistry</span>
                      {faculty.slug === 'sekar' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#1f2937] px-2.5 py-1 rounded-lg shadow-sm">Head of Department</span>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#1f2937] tracking-tight mb-1">{faculty.name}</h1>
                    <p className="text-sm text-slate-400 mb-2 font-medium">{faculty.designation}</p>
                    <p className="text-sm text-[#4b5563] font-semibold">{faculty.area}</p>

                    {/* Contact row */}
                    <div className="flex flex-wrap gap-4 mt-5 text-xs text-[#4b5563]">
                      {faculty.email && (
                        <a href={`mailto:${faculty.email}`} className="inline-flex items-center gap-1.5 hover:text-[#b45309] transition-colors bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Mail size={13} className="text-[#b45309]" /> {faculty.email}
                        </a>
                      )}
                      {faculty.phone && (
                        <span className="inline-flex items-center gap-1.5 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Phone size={13} className="text-[#b45309]" /> {faculty.phone}
                        </span>
                      )}
                      {faculty.office && (
                        <span className="inline-flex items-center gap-1.5 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100">
                          <MapPin size={13} className="text-[#b45309]" /> {faculty.office}
                        </span>
                      )}
                      {faculty.website && (
                        <a href={faculty.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#b45309] transition-colors bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-100">
                          <ExternalLink size={13} className="text-[#b45309]" /> Lab Website
                        </a>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Biography */}
            {faculty.bio && (
              <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
                <h2 className="text-lg font-bold text-[#1f2937] mb-4 flex items-center gap-2.5">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#b45309] to-amber-500 rounded-full" /> Biography
                </h2>
                <p className="text-sm text-[#4b5563] leading-relaxed font-medium">{faculty.bio}</p>
              </GlowCard>
            )}

            {/* Research Interests */}
            {faculty.researchInterests && faculty.researchInterests.length > 0 && (
              <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
                <h2 className="text-lg font-bold text-[#1f2937] mb-4 flex items-center gap-2.5">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#b45309] to-amber-500 rounded-full" /> Research Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {faculty.researchInterests.map((interest, i) => (
                    <span key={i} className="px-3.5 py-2 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm text-[#4b5563] font-medium hover:border-[#b45309]/30 hover:text-[#b45309] transition-colors cursor-default">
                      {interest}
                    </span>
                  ))}
                </div>
              </GlowCard>
            )}

            {/* Publications */}
            {faculty.publications && faculty.publications.length > 0 && (
              <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
                <h2 className="text-lg font-bold text-[#1f2937] mb-4 flex items-center gap-2.5">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#b45309] to-amber-500 rounded-full" />
                  <BookOpen size={16} className="text-[#b45309]" /> Representative Publications
                </h2>
                <ul className="space-y-3">
                  {faculty.publications.map((pub, i) => (
                    <li key={i} className="text-sm text-[#4b5563] leading-relaxed pl-4 border-l-2 border-slate-200 hover:border-[#b45309] transition-colors font-medium">
                      {pub}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            )}
          </div>

          {/* Sidebar */}
          <motion.div variants={staggerContainer} className="space-y-6">
            {/* Education */}
            {faculty.education && faculty.education.length > 0 && (
              <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
                <h3 className="text-sm font-bold text-[#1f2937] mb-3 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#b45309]" /> Education
                </h3>
                <ul className="space-y-2">
                  {faculty.education.map((edu, i) => (
                    <li key={i} className="text-xs text-[#4b5563] leading-relaxed pl-3 border-l-2 border-slate-200 hover:border-[#b45309] transition-colors font-medium">{edu}</li>
                  ))}
                </ul>
              </GlowCard>
            )}

            {/* Awards */}
            {faculty.awards && faculty.awards.length > 0 && (
              <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
                <h3 className="text-sm font-bold text-[#1f2937] mb-3 flex items-center gap-2">
                  <Award size={16} className="text-[#b45309]" /> Honors & Recognitions
                </h3>
                <ul className="space-y-2">
                  {faculty.awards.map((award, i) => (
                    <li key={i} className="text-xs text-[#4b5563] leading-relaxed flex items-start gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] mt-1.5 shrink-0" />
                      {award}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            )}

            {/* Quick Links */}
            <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
              <h3 className="text-sm font-bold text-[#1f2937] mb-3">Quick Links</h3>
              <div className="space-y-2.5">
                {faculty.website && (
                  <a href={faculty.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#b45309] hover:text-amber-700 font-bold transition-colors group">
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" /> Lab Website
                  </a>
                )}
                <a href={`https://scholar.google.com/scholar?q=${encodeURIComponent(faculty.name.replace('Prof. ', '').replace('Dr. ', ''))}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#b45309] hover:text-amber-700 font-bold transition-colors group">
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" /> Google Scholar
                </a>
                <a href={`https://chem.iitm.ac.in/faculty/${faculty.slug}/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#b45309] hover:text-amber-700 font-bold transition-colors group">
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" /> Official IITM Page
                </a>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>

        {/* Faculty navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between gap-4"
        >
          {prevFaculty ? (
            <Link to={`/people/faculty/${prevFaculty.slug}`} className="group flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-5 hover:border-[#b45309]/30 hover:shadow-lg hover:shadow-[#b45309]/5 transition-all duration-300 flex-1 hover:-translate-y-0.5">
              <ArrowLeft size={14} className="text-slate-300 group-hover:text-[#b45309] group-hover:-translate-x-1 transition-all" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Previous</p>
                <p className="text-sm font-bold text-[#1f2937] group-hover:text-[#b45309] transition-colors">{prevFaculty.name}</p>
              </div>
            </Link>
          ) : <div />}
          {nextFaculty ? (
            <Link to={`/people/faculty/${nextFaculty.slug}`} className="group flex items-center justify-end gap-3 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-5 hover:border-[#b45309]/30 hover:shadow-lg hover:shadow-[#b45309]/5 transition-all duration-300 flex-1 text-right hover:-translate-y-0.5">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Next</p>
                <p className="text-sm font-bold text-[#1f2937] group-hover:text-[#b45309] transition-colors">{nextFaculty.name}</p>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[#b45309] group-hover:translate-x-1 transition-all" />
            </Link>
          ) : <div />}
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyProfile;
