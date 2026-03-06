import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Award, BookOpen, FlaskConical, Users, Star, TrendingUp, Trophy, Lightbulb, Hexagon, Medal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// --- Animated Counter ---
const AnimatedCounter = ({ target, suffix = "", label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <motion.div ref={ref} variants={slowReveal} className="text-center p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-4xl md:text-5xl font-black text-[#b45309] tracking-tighter mb-3 transition-transform duration-500 group-hover:scale-105">
                {count}{suffix}
            </div>
            <p className="relative z-10 text-[11px] font-bold text-[#4b5563] uppercase tracking-[0.2em]">{label}</p>
        </motion.div>
    );
};

// --- High-Performance GPU Mouse-Tracking Card ---
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
            <div className="relative z-10 flex flex-col h-full">
                {children}
            </div>
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

// --- Data ---
const RESEARCH_MILESTONES = [
    { icon: <BookOpen size={28} strokeWidth={1.5} />, title: "3000+ Publications", desc: "High-impact publications in Nature, Science, JACS, Angew. Chem., and other top-tier journals over the past decade." },
    { icon: <Lightbulb size={28} strokeWidth={1.5} />, title: "85+ Patents", desc: "Granted patents in catalysis, drug design, advanced materials, and sustainable chemistry with several commercialized." },
    { icon: <TrendingUp size={28} strokeWidth={1.5} />, title: "₹250+ Cr Funding", desc: "Competitive research funding secured from DST, SERB, CSIR, DBT, and international agencies." },
];

const FACULTY_AWARDS = [
    { name: "Shanti Swarup Bhatnagar Prize", count: "8 Recipients", desc: "India's highest science award recognizing outstanding contributions to chemical sciences." },
    { name: "J.C. Bose Fellowship", count: "12 Fellows", desc: "Prestigious national fellowship awarded by SERB for active scientists and engineers." },
    { name: "INSA / IASc Fellowship", count: "20+ Fellows", desc: "Elected members of the Indian National Science Academy and Indian Academy of Sciences." },
    { name: "International Recognition", count: "15+ Awards", desc: "Awards from RSC, ACS, IUPAC, and other global chemistry organizations." },
];

const STUDENT_ACHIEVEMENTS = [
    { title: "Global PhD Placements", desc: "Students admitted to MIT, Stanford, Caltech, ETH Zürich, Cambridge, and other world-class institutions for doctoral research." },
    { title: "National Awards", desc: "Multiple recipients of INSPIRE, KVPY, and CSIR-NET JRF fellowships with All-India ranks." },
    { title: "Innovation & Startups", desc: "Over 10 chemistry-based startups incubated at the IIT Madras Research Park by alumni and current students." },
];

const Achievements = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    
    // Parallax floating values
    const parallax1 = useTransform(smoothProgress, [0, 1], [0, -300]);
    const parallax2 = useTransform(smoothProgress, [0, 1], [0, 200]);
    const parallax3 = useTransform(smoothProgress, [0, 1], [0, -150]);

    // Global Mouse Tracking for Background Glow
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
            <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-[#b45309] z-[100] transform-gpu" />

            {/* --- BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 to-orange-50/15">
                <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
                
                {/* Global Mouse Spotlight */}
                <motion.div 
                    className="absolute inset-0 z-0 opacity-70"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${smoothBgX}px ${smoothBgY}px, rgba(180,83,9,0.06), transparent 80%)`
                    }}
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

                {/* Parallax Floating Elements */}
                <motion.div 
                    style={{ y: parallax1 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[15%] right-[5%] opacity-[0.03] text-amber-700"
                >
                    <Hexagon size={280} strokeWidth={1} />
                </motion.div>

                <motion.div 
                    style={{ y: parallax2 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[50%] left-[-5%] opacity-[0.03] text-[#1f2937]"
                >
                    <Medal size={400} strokeWidth={0.5} />
                </motion.div>

                <motion.div 
                    style={{ y: parallax3 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[75%] right-[15%] opacity-[0.04] text-[#b45309]"
                >
                    <Star size={150} strokeWidth={1} />
                </motion.div>
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="container relative z-20 mx-auto px-6 pt-24 pb-16 max-w-7xl">

                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium mb-12 transition-colors">
                    <ArrowLeft size={18} /> Back to Department Home
                </Link>

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
                        OUR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-[#b45309]">ACHIEVEMENTS</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
                        Decades of groundbreaking research, distinguished recognition, and transformative impact on chemical sciences.
                    </motion.p>
                </header>

                {/* --- STATS COUNTERS --- */}
                <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-32">
                    <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200/60">
                            <AnimatedCounter target={3000} suffix="+" label="Publications" />
                            <AnimatedCounter target={85} suffix="+" label="Patents" />
                            <AnimatedCounter target={40} suffix="+" label="Awards" />
                            <AnimatedCounter target={250} suffix=" Cr+" label="Funding (₹)" />
                        </div>
                    </div>
                </motion.section>

                {/* --- RESEARCH MILESTONES --- */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">01 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Research <br /><span className="text-[#b45309]">Milestones</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Pioneering discoveries that have shaped the landscape of modern chemistry.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                            {RESEARCH_MILESTONES.map((item, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    className={`bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 rounded-3xl p-8 ${idx === 2 ? 'sm:col-span-2' : ''}`}
                                >
                                    <div className="mb-6 inline-block p-4 bg-orange-100/50 rounded-2xl text-[#b45309] group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1f2937] mb-3">{item.title}</h3>
                                    <p className="text-[#4b5563] leading-relaxed font-medium">{item.desc}</p>
                                </InteractiveCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- FACULTY AWARDS --- */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">02 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Faculty <br /><span className="text-[#b45309]">Awards</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Our faculty are among the most decorated scientists in the country.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                            {FACULTY_AWARDS.map((award, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    className="bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 rounded-3xl p-8"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="p-3 bg-orange-100/50 rounded-xl text-[#b45309] shadow-inner">
                                            <Award size={24} />
                                        </div>
                                        <span className="text-xs font-black text-[#b45309] bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/60 uppercase tracking-wider">{award.count}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1f2937] mb-3">{award.name}</h3>
                                    <p className="text-[#4b5563] leading-relaxed font-medium text-sm">{award.desc}</p>
                                </InteractiveCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- STUDENT ACHIEVEMENTS --- */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">03 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Student <br /><span className="text-[#b45309]">Excellence</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Our students consistently excel on national and international stages.
                            </motion.p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid gap-6">
                            {STUDENT_ACHIEVEMENTS.map((item, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    className="bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6"
                                >
                                    <div className="font-mono text-[#1f2937]/10 text-6xl font-black group-hover:text-[#b45309]/20 transition-colors duration-500 shrink-0 select-none">
                                        {`0${idx + 1}`}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1f2937] mb-2 group-hover:text-[#b45309] transition-colors">{item.title}</h3>
                                        <p className="text-[#4b5563] leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </InteractiveCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default Achievements;