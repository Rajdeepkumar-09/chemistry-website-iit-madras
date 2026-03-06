import React from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Clock, Landmark, FlaskConical, Users, Award, Building, ArrowRight } from 'lucide-react';

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

// --- Timeline Data ---
const TIMELINE_DATA = [
    {
        era: "1959–1970",
        title: "The Foundation",
        color: "#b45309",
        events: [
            { year: "1959", title: "Department Established", desc: "The Department of Chemistry was founded alongside IIT Madras, with a small but visionary group of faculty dedicated to advancing chemical education in India.", icon: <Landmark size={20} /> },
            { year: "1962", title: "First PhD Awarded", desc: "The department's first doctoral candidate successfully defended their thesis, establishing a tradition of rigorous research that continues today.", icon: <Award size={20} /> },
            { year: "1965", title: "Early Research Labs", desc: "Construction of the first dedicated chemistry research laboratories, setting the stage for advanced experimental work in organic and inorganic chemistry.", icon: <FlaskConical size={20} /> },
            { year: "1968", title: "National Recognition", desc: "Early faculty publications in international journals brought the department national recognition as a center for quality chemical research.", icon: <Award size={20} /> },
        ]
    },
    {
        era: "1970–1990",
        title: "Growth & Expansion",
        color: "#d97706",
        events: [
            { year: "1972", title: "MSc Program Launched", desc: "Introduction of the Master of Science program in Chemistry, broadening the department's academic offerings and attracting top talent from across India.", icon: <Users size={20} /> },
            { year: "1978", title: "Central Instrumentation", desc: "Establishment of the first central instrumentation facility with NMR and IR spectrometers, transforming research capabilities.", icon: <Building size={20} /> },
            { year: "1985", title: "International Collaborations", desc: "First formal international research collaborations established with universities in the US, Germany, and Japan.", icon: <Users size={20} /> },
            { year: "1989", title: "30th Anniversary", desc: "Celebrated three decades of excellence with over 500 research publications and 100+ PhD graduates contributing to chemistry globally.", icon: <Award size={20} /> },
        ]
    },
    {
        era: "1990–2010",
        title: "Modern Era",
        color: "#b45309",
        events: [
            { year: "1995", title: "Advanced Facilities", desc: "Major infrastructure upgrade including 400 MHz NMR, single-crystal X-ray diffractometer, and mass spectrometry facilities.", icon: <FlaskConical size={20} /> },
            { year: "2000", title: "Interdisciplinary Research", desc: "Launch of cross-departmental research programs in materials science, computational chemistry, and chemical biology.", icon: <Building size={20} /> },
            { year: "2005", title: "Center of Excellence", desc: "Recognized as a DST-FIST supported department with significant national funding for infrastructure and research.", icon: <Award size={20} /> },
            { year: "2008", title: "BS Program Introduced", desc: "Launch of the 4-year BS Chemistry program, offering a modern undergraduate pathway with research integration from year one.", icon: <Users size={20} /> },
        ]
    },
    {
        era: "2010–Present",
        title: "Global Excellence",
        color: "#d97706",
        events: [
            { year: "2012", title: "HPC Computing Facility", desc: "Dedicated high-performance computing cluster established for computational chemistry, molecular dynamics, and quantum chemistry.", icon: <Building size={20} /> },
            { year: "2016", title: "500 MHz NMR", desc: "Installation of a state-of-the-art 500 MHz NMR spectrometer, placing the department among the best-equipped in Asia.", icon: <FlaskConical size={20} /> },
            { year: "2020", title: "NIRF Top 3", desc: "Department ranked in the top 3 chemistry departments in India by NIRF, reflecting sustained excellence across all parameters.", icon: <Award size={20} /> },
            { year: "2025", title: "NIRF #1", desc: "Achieved the #1 ranking in NIRF Chemistry Rankings, cementing the department's position as India's premier chemistry department.", icon: <Award size={20} /> },
            { year: "2026", title: "Global Top 150", desc: "Entered the QS World University Rankings Top 150 for Chemistry, marking a new milestone in international recognition.", icon: <Landmark size={20} /> },
        ]
    }
];

const History = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

    return (
        <div className="min-h-screen bg-slate-50 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative pb-32">
            <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]" />

            {/* --- BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/10 to-slate-50">
                <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
                <motion.div
                    animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-5%] left-[-10%] w-[55vw] h-[55vw] bg-gradient-to-br from-[#b45309]/[0.05] to-transparent rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
                    transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[5%] right-[-10%] w-[45vw] h-[45vw] bg-gradient-to-tl from-amber-400/[0.04] to-transparent rounded-full blur-[100px]"
                />

                {/* Decorative Clock */}
                <motion.div
                    style={{ y: panUpSlow, rotate: useTransform(smoothProgress, [0, 1], [0, 30]) }}
                    className="absolute top-[8%] right-[8%] opacity-[0.035]"
                    aria-hidden="true"
                >
                    <Clock size={280} strokeWidth={0.5} />
                </motion.div>

                {/* Decorative Landmark */}
                <motion.div
                    style={{ y: useTransform(smoothProgress, [0, 1], ['0%', '-30%']) }}
                    className="absolute top-[55%] left-[3%] opacity-[0.03]"
                    aria-hidden="true"
                >
                    <Landmark size={200} strokeWidth={0.5} />
                </motion.div>
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="container relative z-20 mx-auto px-6 pt-28 md:pt-32 pb-16 max-w-6xl">

                {/* --- HERO --- */}
                <header className="mb-20 md:mb-28">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                        <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
                            <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                            EST. 1959
                        </span>
                        <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">Department of Chemistry</span>
                    </motion.div>

                    <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-6 uppercase">
                        OUR <br /><span className="text-[#b45309]">HISTORY</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
                        From a founding vision in 1959 to a globally recognized center of excellence — over six decades of shaping the future of chemical sciences.
                    </motion.p>
                </header>

                {/* --- TIMELINE --- */}
                <div className="space-y-32">
                    {TIMELINE_DATA.map((era, eraIdx) => (
                        <section key={era.era} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            {/* Era Header - Sticky */}
                            <div className="lg:col-span-4 lg:sticky lg:top-28">
                                <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                    <span className="font-mono font-bold text-sm tracking-widest" style={{ color: era.color }}>{`0${eraIdx + 1} //`}</span>
                                    <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                                </motion.div>
                                <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-3 text-[#1f2937] tracking-tight leading-[1.1]">
                                    {era.title.split(' ').map((word, i) => (
                                        i === era.title.split(' ').length - 1
                                            ? <span key={i}><br /><span style={{ color: era.color }}>{word}</span></span>
                                            : <span key={i}>{word} </span>
                                    ))}
                                </motion.h2>
                                <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="inline-block px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
                                    <span className="font-mono text-sm font-bold text-[#4b5563]">{era.era}</span>
                                </motion.div>
                                <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 hidden lg:flex w-12 h-12 rounded-full border border-[#1f2937]/10 items-center justify-center text-[#1f2937]/30">
                                    <ArrowRight size={20} />
                                </motion.div>
                            </div>

                            {/* Events */}
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 relative">
                                {/* Vertical line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />

                                <div className="space-y-6">
                                    {era.events.map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={slowReveal}
                                            className="group flex gap-6 items-start"
                                        >
                                            {/* Timeline Dot */}
                                            <div className="relative shrink-0 hidden sm:block">
                                                <div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-400 group-hover:border-[#b45309] group-hover:text-[#b45309] transition-all duration-300 shadow-sm z-10 relative">
                                                    {event.icon}
                                                </div>
                                            </div>

                                            {/* Event Card */}
                                            <InteractiveCard
                                                glowColor="rgba(180,83,9,0.12)"
                                                className="flex-1 bg-white/60 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50"
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-black text-[#b45309] uppercase tracking-wider">{event.year}</span>
                                                    <h3 className="text-lg font-bold text-[#1f2937] group-hover:text-[#b45309] transition-colors">{event.title}</h3>
                                                </div>
                                                <p className="text-[#4b5563] leading-relaxed font-medium text-sm">{event.desc}</p>
                                            </InteractiveCard>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default History;
