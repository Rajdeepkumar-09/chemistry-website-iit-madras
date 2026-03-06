import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate, useTransform, useInView } from 'framer-motion';
import {
    FlaskConical, Microscope, Atom, Cpu, Zap, ThermometerSun,
    ScanLine, Magnet, Database, ArrowRight, Sparkles
} from 'lucide-react';
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

// --- Chemistry SVGs ---
const BenzeneRing = ({ size = 100, className }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" />
        <circle cx="50" cy="50" r="24" />
    </svg>
);

// --- Interactive Card ---
const InteractiveCard = ({ children, className, glowColor = 'rgba(180,83,9,0.12)', ...props }) => {
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
            className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5 group ${className}`}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
                style={{
                    opacity,
                    background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 flex flex-col h-full">{children}</div>
            <motion.div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20 mix-blend-overlay"
                style={{
                    opacity: useMotionTemplate`calc(${opacity} * 0.8)`,
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
                }}
            />
        </motion.div>
    );
};

// --- Animated Counter ---
const AnimatedCounter = ({ target, suffix = '', prefix = '', label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        
        // Changed from 2000 to 1500 for a snappier, more energetic animation
        const duration = 1500; 
        const startTime = performance.now();
        
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // CHANGED: Swapped from Quartic to Quadratic easing.
            // This prevents the agonizingly slow crawl on the last few numbers.
            const eased = 1 - Math.pow(1 - progress, 2); 
            
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center p-8 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-3xl md:text-4xl font-black text-[#b45309] tracking-tighter mb-3 transition-transform duration-500 group-hover:scale-105">
                {prefix}{count}{suffix}
            </div>
            <p className="relative z-10 text-[11px] font-bold text-[#4b5563] uppercase tracking-[0.2em]">{label}</p>
        </motion.div>
    );
};

// --- Data ---
const MAJOR_INSTRUMENTS = [
    {
        icon: ScanLine,
        name: "NMR Spectrometers",
        specs: "400 MHz, 500 MHz & 700 MHz",
        desc: "High-field nuclear magnetic resonance spectrometers for molecular structure determination, with solid-state and solution-state capabilities.",
        brand: "Bruker Avance",
        glowColor: "rgba(59,130,246,0.15)",
        accentColor: "text-blue-600",
        bgColor: "bg-blue-50",
        borderHover: "hover:border-blue-300/60",
    },
    {
        icon: Atom,
        name: "X-Ray Diffractometers",
        specs: "Single Crystal & Powder XRD",
        desc: "State-of-the-art X-ray crystallography systems for determining precise three-dimensional molecular structures and crystal packing analysis.",
        brand: "Rigaku & Bruker D8",
        glowColor: "rgba(168,85,247,0.15)",
        accentColor: "text-purple-600",
        bgColor: "bg-purple-50",
        borderHover: "hover:border-purple-300/60",
    },
    {
        icon: Zap,
        name: "Mass Spectrometry Suite",
        specs: "HR-MS, LC-MS/MS, MALDI-TOF",
        desc: "Comprehensive mass spectrometry facility for accurate molecular weight determination, fragmentation analysis, and proteomics applications.",
        brand: "Waters Xevo & Bruker",
        glowColor: "rgba(245,158,11,0.15)",
        accentColor: "text-amber-600",
        bgColor: "bg-amber-50",
        borderHover: "hover:border-amber-300/60",
    },
    {
        icon: ThermometerSun,
        name: "Thermal Analysis",
        specs: "DSC, TGA, DTA & DMA",
        desc: "Thermal characterization instruments for studying phase transitions, decomposition behavior, and mechanical properties of materials.",
        brand: "TA Instruments & Netzsch",
        glowColor: "rgba(239,68,68,0.15)",
        accentColor: "text-red-600",
        bgColor: "bg-red-50",
        borderHover: "hover:border-red-300/60",
    },
    {
        icon: Microscope,
        name: "Electron Microscopy",
        specs: "FE-SEM, HR-TEM, AFM",
        desc: "Advanced imaging facilities for nanoscale surface morphology, atomic-resolution imaging, and topographical analysis of materials.",
        brand: "JEOL & FEI",
        glowColor: "rgba(16,185,129,0.15)",
        accentColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderHover: "hover:border-emerald-300/60",
    },
    {
        icon: Magnet,
        name: "EPR / ESR Spectrometer",
        specs: "X-Band & Q-Band",
        desc: "Electron paramagnetic resonance spectrometer for characterizing paramagnetic species, free radicals, and transition metal complexes.",
        brand: "Bruker EMX",
        glowColor: "rgba(100,116,139,0.15)",
        accentColor: "text-slate-600",
        bgColor: "bg-slate-100",
        borderHover: "hover:border-slate-400/60",
    },
];

const RESEARCH_LABS = [
    { name: "Organic Synthesis Lab", capacity: "20 Fume Hoods", focus: "Total synthesis, catalysis, and method development" },
    { name: "Inorganic & Materials Lab", capacity: "Glove Boxes & Schlenk Lines", focus: "Air-sensitive chemistry, coordination compounds, and nanomaterials" },
    { name: "Physical Chemistry Lab", capacity: "Spectroscopy Suites", focus: "Ultrafast dynamics, surface science, and electrochemistry" },
    { name: "Computational Chemistry Lab", capacity: "HPC Cluster Access", focus: "DFT calculations, molecular dynamics, and machine learning" },
    { name: "Analytical Chemistry Lab", capacity: "Central Instrumentation", focus: "Chromatography, electroanalysis, and sensor development" },
    { name: "Teaching Laboratories", capacity: "6 UG & PG Labs", focus: "Hands-on training in all core chemistry disciplines" },
];

const FacilitiesEquipment = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

    // Parallax
    const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const parallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

    // Mouse tracking for background
    const bgMouseX = useMotionValue(0);
    const bgMouseY = useMotionValue(0);
    const smoothBgX = useSpring(bgMouseX, { stiffness: 50, damping: 20 });
    const smoothBgY = useSpring(bgMouseY, { stiffness: 50, damping: 20 });

    const handleGlobalMouseMove = (e) => {
        bgMouseX.set(e.clientX);
        bgMouseY.set(e.clientY);
    };

    return (
        <main
            onMouseMove={handleGlobalMouseMove}
            className="min-h-screen bg-slate-50 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative pb-32"
        >
            <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]" />

            {/* --- INTERACTIVE BACKGROUND --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-slate-50" aria-hidden="true">
                <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

                {/* Mouse Spotlight */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-70"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${smoothBgX}px ${smoothBgY}px, rgba(180,83,9,0.06), transparent 80%)`
                    }}
                />

                {/* Floating Chemistry Structure */}
                <motion.div
                    style={{ y: parallax1 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[15%] left-[3%] opacity-[0.05] text-amber-700"
                >
                    <BenzeneRing size={180} />
                </motion.div>

                <motion.div
                    style={{ y: parallax2 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[60%] right-[3%] opacity-[0.04] text-slate-700"
                >
                    <BenzeneRing size={120} />
                </motion.div>

                {/* Decorative Icon */}
                <motion.div
                    style={{ y: panUpSlow, rotate: useTransform(smoothProgress, [0, 1], [0, 15]) }}
                    className="absolute top-[8%] right-[6%] opacity-[0.04]"
                >
                    <Microscope size={260} strokeWidth={0.5} />
                </motion.div>

                {/* Ambient Blurs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] bg-gradient-to-br from-[#b45309]/[0.05] to-transparent rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.25, 1], x: [0, -40, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-bl from-amber-500/[0.03] to-transparent rounded-full blur-[120px]"
                />
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="container relative z-20 mx-auto px-6 pt-28 md:pt-32 pb-16 max-w-7xl">

                {/* --- HERO --- */}
                <header className="mb-16 md:mb-24">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                        <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
                            <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                            About
                        </span>
                        <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">Department of Chemistry</span>
                    </motion.div>

                    <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-6 uppercase">
                        Facilities & <br /><span className="text-[#b45309]">Equipment</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
                        World-class infrastructure powering cutting-edge chemical research — from high-field NMR to electron microscopy and beyond.
                    </motion.p>
                </header>

                {/* --- STATS BAR --- */}
                <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-32">
                    <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200/60">
                            <AnimatedCounter target={50} suffix="+" label="Research Labs" />
                            <AnimatedCounter target={150} prefix="₹" suffix=" Cr+" label="Equipment Value" />
                            <AnimatedCounter target={700} suffix=" MHz" label="Highest NMR Field" />
                            <motion.div variants={slowReveal} className="text-center p-8 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 text-3xl md:text-4xl font-black text-[#b45309] tracking-tighter mb-3 transition-transform duration-500 group-hover:scale-105">24/7</div>
                                <p className="relative z-10 text-[11px] font-bold text-[#4b5563] uppercase tracking-[0.2em]">Lab Access</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* --- MAJOR INSTRUMENTS --- */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">01 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Major <br /><span className="text-[#b45309]">Instruments</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Our centralized instrumentation facility houses equipment worth over ₹150 Crore, accessible to all researchers.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                            {MAJOR_INSTRUMENTS.map((item, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    glowColor={item.glowColor}
                                    className={`bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-2xl rounded-3xl p-8 ${item.borderHover}`}
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <div className={`inline-block p-3 ${item.bgColor} rounded-2xl ${item.accentColor} group-hover:scale-110 transition-all duration-300`}>
                                            <item.icon size={26} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{item.brand}</span>
                                    </div>
                                    <h3 className={`text-xl font-bold text-[#1f2937] mb-1 group-hover:${item.accentColor} transition-colors`}>{item.name}</h3>
                                    <p className="text-sm font-semibold text-[#b45309] mb-3">{item.specs}</p>
                                    <p className="text-[#4b5563] leading-relaxed font-medium text-sm">{item.desc}</p>
                                </InteractiveCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- RESEARCH LABORATORIES --- */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">02 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Research <br /><span className="text-[#b45309]">Laboratories</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Purpose-built laboratories equipped with modern infrastructure to support a wide range of chemical investigations.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid gap-5">
                            {RESEARCH_LABS.map((lab, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    glowColor="rgba(180,83,9,0.10)"
                                    className="bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-[#b45309]/10 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6"
                                >
                                    <div className="font-mono text-[#1f2937]/10 text-5xl font-black group-hover:text-[#b45309]/20 transition-all duration-300 shrink-0">
                                        {`0${idx + 1}`}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#1f2937] mb-1 group-hover:text-[#b45309] transition-colors">{lab.name}</h3>
                                        <p className="text-sm font-semibold text-[#b45309] mb-2">{lab.capacity}</p>
                                        <p className="text-[#4b5563] leading-relaxed font-medium text-sm">{lab.focus}</p>
                                    </div>
                                </InteractiveCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- ADDITIONAL FACILITIES --- */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">03 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Supporting <br /><span className="text-[#b45309]">Infrastructure</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Beyond core instruments, our department offers extensive support systems for research excellence.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: Database, title: "Chemical Stockroom", desc: "Comprehensive inventory of reagents, solvents, and consumables with an automated tracking system for efficient supply chain management." },
                                { icon: Cpu, title: "HPC Computing Facility", desc: "High-performance computing cluster with 1000+ cores dedicated to computational chemistry, molecular simulations, and data analysis." },
                                { icon: FlaskConical, title: "Glass-Blowing Workshop", desc: "Fully equipped in-house glass workshop for custom apparatus fabrication, modifications, and repairs of specialized glassware." },
                                { icon: Zap, title: "Safety & Waste Management", desc: "Comprehensive chemical waste treatment facility and safety infrastructure including emergency showers, eyewash stations, and fume hoods." },
                            ].map((item, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    glowColor="rgba(180,83,9,0.12)"
                                    className="bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-[#b45309]/10 hover:border-amber-300/50 rounded-3xl p-8"
                                >
                                    <div className="mb-5 inline-block p-3 bg-orange-50 rounded-2xl text-[#b45309] group-hover:scale-110 transition-all duration-300">
                                        <item.icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1f2937] mb-2 group-hover:text-[#b45309] transition-colors">{item.title}</h3>
                                    <p className="text-[#4b5563] leading-relaxed font-medium text-sm">{item.desc}</p>
                                </InteractiveCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <motion.section variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 uppercase text-[#1f2937]">Want to <span className="text-[#b45309]">Use Our Facilities</span>?</h2>
                    <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">Our instrumentation centre is available to researchers from industry, academia, and other institutions on a shared-access basis.</p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link to="/contact/contact-us" className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#b45309] text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-orange-900/10 hover:shadow-orange-500/25 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 flex items-center gap-2">Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                        </Link>
                        <Link to="/about/overview" className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-slate-200 text-slate-800 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-800">
                            <div className="absolute inset-0 bg-slate-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Department Overview</span>
                        </Link>
                    </div>
                </motion.section>
            </div>
        </main>
    );
};

export default FacilitiesEquipment;