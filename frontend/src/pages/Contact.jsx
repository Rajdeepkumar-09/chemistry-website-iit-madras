import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ExternalLink, ArrowLeft, Send, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Animation Variants ---
const slowReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const mechanicalReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
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

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Address',
    content: <>Department of Chemistry<br />Indian Institute of Technology Madras<br />Chennai — 600 036, Tamil Nadu, India</>,
  },
  {
    icon: Phone,
    title: 'Phone',
    content: <a href="tel:+914422574200" className="hover:text-[#b45309] transition-colors">+91 44 2257 4200</a>,
  },
  {
    icon: Mail,
    title: 'Email',
    content: <a href="mailto:cyoffice@iitm.ac.in" className="hover:text-[#b45309] transition-colors">cyoffice@iitm.ac.in</a>,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: <>Monday – Friday: 9:00 AM – 5:30 PM<br />Saturday – Sunday: Closed</>,
  },
];

const USEFUL_LINKS = [
  { label: 'IIT Madras Main Website', url: 'https://www.iitm.ac.in/' },
  { label: 'Research Admission Portal', url: 'https://research.iitm.ac.in/' },
  { label: 'Central Library', url: 'https://www.cenlib.iitm.ac.in/' },
  { label: 'Academic Calendar', url: 'https://www.iitm.ac.in/calendar' },
  { label: 'BS-IAT Admission Portal', url: 'https://ugadmissions.iitm.ac.in/bsiat/index.php' },
];

const Contact = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax & scroll-driven rotation
  const parallax1 = useTransform(smoothProgress, [0, 1], [0, -180]);
  const parallax2 = useTransform(smoothProgress, [0, 1], [0, 120]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 140]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -90]);

  // Mouse tracking spotlight
  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);
  const smoothBgX = useSpring(bgMouseX, { stiffness: 50, damping: 20 });
  const smoothBgY = useSpring(bgMouseY, { stiffness: 50, damping: 20 });
  const handleGlobalMouseMove = (e) => { bgMouseX.set(e.clientX); bgMouseY.set(e.clientY); };

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
          animate={{ scale: [1, 1.15, 1], x: [0, 35, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#b45309]/[0.05] to-transparent rounded-full blur-[100px] transform-gpu"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-bl from-blue-500/[0.03] to-transparent rounded-full blur-[120px] transform-gpu"
        />

        {/* Scroll-Driven Floating Elements */}
        <motion.div
          style={{ y: parallax1, rotate: rotate1 }}
          className="absolute top-[15%] right-[10%] opacity-[0.07] text-amber-700"
        >
          <Send size={80} strokeWidth={1.2} />
        </motion.div>

        <motion.div
          style={{ y: parallax2, rotate: rotate2 }}
          className="absolute top-[60%] left-[3%] opacity-[0.05] text-[#1f2937]"
        >
          <Globe size={100} strokeWidth={0.8} />
        </motion.div>
      </div>

      {/* --- CONTENT --- */}
      <div className="container relative z-20 mx-auto px-6 pt-24 pb-20 max-w-7xl">

        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#b45309] font-medium mb-10 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </motion.div>

        {/* Hero */}
        <header className="mb-14">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
              <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
              Contact
            </span>
            <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">Department of Chemistry</span>
          </motion.div>

          <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-6 uppercase">
            GET IN <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-[#b45309]">TOUCH</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
            Reach us for queries regarding admissions, research collaborations, or general information about the department.
          </motion.p>
        </header>

        {/* Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column — Contact Info + Links */}
          <div className="space-y-6">

            {/* Department Office Card */}
            <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
              <h2 className="text-lg font-bold text-[#1f2937] mb-6 flex items-center gap-2.5">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#b45309] to-amber-500 rounded-full" /> Department Office
              </h2>
              <div className="space-y-5 text-sm text-[#4b5563]">
                {CONTACT_INFO.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-2xl bg-[#b45309]/5 flex items-center justify-center text-[#b45309] shrink-0 group-hover:bg-[#b45309]/10 group-hover:scale-105 transition-all duration-300 border border-[#b45309]/10">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-[#1f2937] mb-1">{item.title}</p>
                      <div className="leading-relaxed font-medium">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Useful Links Card */}
            <GlowCard variants={slowReveal} className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300">
              <h3 className="text-sm font-bold text-[#1f2937] mb-4 flex items-center gap-2.5">
                <div className="w-1.5 h-5 bg-gradient-to-b from-[#b45309] to-amber-500 rounded-full" /> Useful Links
              </h3>
              <div className="space-y-3">
                {USEFUL_LINKS.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-[#4b5563] hover:text-[#b45309] transition-colors font-medium group">
                    <ExternalLink size={13} className="text-[#b45309] shrink-0 group-hover:translate-x-0.5 transition-transform" /> {link.label}
                  </a>
                ))}
              </div>
            </GlowCard>
          </div>

          {/* Right Column — Map */}
          <motion.div variants={slowReveal} className="h-full min-h-[500px]">
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl overflow-hidden h-full shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 transition-all duration-300 p-2">
              <iframe
                title="IIT Madras Chemistry Department"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8372927613345!2d80.23099131482218!3d12.991123990849034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526787978a0469%3A0x9fbe3c2c68fffbed!2sDepartment%20of%20Chemistry%2C%20IIT%20Madras!5e0!3m2!1sen!2sin!4v1709283828000!5m2!1sen!2sin"
                className="w-full h-full min-h-[480px] border-0 rounded-2xl"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
