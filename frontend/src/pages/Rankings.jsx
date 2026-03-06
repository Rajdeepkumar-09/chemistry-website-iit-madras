import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { BarChart3, TrendingUp, Medal, ArrowRight } from 'lucide-react';

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

// --- Rank Card ---
const RankCard = ({ rank, body, label, subtitle, delay }) => (
    <InteractiveCard
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        glowColor="rgba(180,83,9,0.15)"
        className="border border-slate-200/80 rounded-2xl bg-white/60 backdrop-blur-xl p-6 w-full flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 cursor-default"
    >
        <div className="flex justify-between items-start font-mono text-xs text-[#1f2937]/50 mb-4">
            <span className="group-hover:text-[#b45309] transition-colors font-bold">{rank}</span>
            <span className="opacity-40 border border-[#1f2937]/20 rounded px-1.5 py-0.5 group-hover:border-[#b45309] group-hover:text-[#b45309] transition-colors text-[9px]">RANK</span>
        </div>
        <div className="text-center my-3">
            <h3 className="text-3xl lg:text-4xl font-black text-[#1f2937] tracking-tighter group-hover:text-[#b45309] transition-colors">{body}</h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#1f2937]/60 mt-2">{label}</p>
        </div>
        <div className="text-center border-t border-slate-100 pt-3 font-mono text-xs font-bold text-[#b45309]">
            {subtitle}
        </div>
    </InteractiveCard>
);

// --- Ranking Trend Bar ---
const RankingBar = ({ year, rank, maxRank = 10, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const width = ((maxRank - rank + 1) / maxRank) * 100;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="flex items-center gap-4 group"
        >
            <span className="w-12 text-sm font-bold text-[#4b5563] shrink-0">{year}</span>
            <div className="flex-1 h-10 bg-slate-100 rounded-xl overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${width}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-[#b45309] to-[#d97706] rounded-xl flex items-center justify-end pr-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                >
                    <span className="text-white text-xs font-black">#{rank}</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- Data ---
const TOP_RANKINGS = [
    { rank: "#1", body: "#1", label: "NIRF Chemistry", subtitle: "2026" },
    { rank: "Top 150", body: "Top 150", label: "QS World Rankings", subtitle: "Chemistry 2026" },
    { rank: "Top 200", body: "Top 200", label: "Shanghai (ARWU)", subtitle: "Chemistry 2025" },
    { rank: "#3", body: "#3", label: "India Rankings", subtitle: "Overall 2026" },
];

const NIRF_HISTORY = [
    { year: "2026", rank: 1 },
    { year: "2025", rank: 1 },
    { year: "2024", rank: 2 },
    { year: "2023", rank: 2 },
    { year: "2022", rank: 3 },
    { year: "2021", rank: 4 },
];

const RANKING_HIGHLIGHTS = [
    { icon: <Medal size={28} strokeWidth={1.5} />, title: "Consistent NIRF Topper", desc: "Ranked #1 in NIRF Chemistry Rankings for two consecutive years (2025–2026), reflecting sustained excellence in education, research, and placement outcomes." },
    { icon: <TrendingUp size={28} strokeWidth={1.5} />, title: "Rising Global Presence", desc: "Steady climb in QS World University Rankings for Chemistry, now in the Top 150 globally — among the highest for any Indian chemistry department." },
    { icon: <BarChart3 size={28} strokeWidth={1.5} />, title: "Research Impact", desc: "High h-index, 12,000+ citations annually, and publication output in the top percentile globally among chemistry departments in emerging economies." },
];

const Rankings = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

    return (
        <div className="min-h-screen bg-slate-50 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative pb-32">
            <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]" />

            {/* --- BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 to-orange-50/10">
                <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 60, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-gradient-to-bl from-[#b45309]/[0.06] to-transparent rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[0%] left-[-10%] w-[45vw] h-[45vw] bg-gradient-to-tr from-amber-500/[0.04] to-transparent rounded-full blur-[120px]"
                />

                {/* Decorative Bar Chart */}
                <motion.div
                    style={{ y: panUpSlow, rotate: useTransform(smoothProgress, [0, 1], [-5, 10]) }}
                    className="absolute top-[10%] left-[6%] opacity-[0.035]"
                    aria-hidden="true"
                >
                    <BarChart3 size={280} strokeWidth={0.4} />
                </motion.div>

                {/* Decorative Medal */}
                <motion.div
                    style={{ y: useTransform(smoothProgress, [0, 1], ['0%', '-40%']) }}
                    className="absolute top-[60%] right-[8%] opacity-[0.03]"
                    aria-hidden="true"
                >
                    <Medal size={220} strokeWidth={0.5} />
                </motion.div>
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
                        DEPARTMENT <br /><span className="text-[#b45309]">RANKINGS</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
                        Nationally acclaimed and globally recognized — our position among the finest chemistry departments in the world.
                    </motion.p>
                </header>

                {/* --- RANK CARDS --- */}
                <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-28">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {TOP_RANKINGS.map((item, idx) => (
                            <RankCard key={idx} rank={item.rank} body={item.body} label={item.label} subtitle={item.subtitle} delay={idx * 0.15} />
                        ))}
                    </div>
                </motion.section>

                {/* --- NIRF TREND --- */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">01 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                NIRF <br /><span className="text-[#b45309]">Trajectory</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                A consistent upward trajectory in India's most authoritative ranking framework.
                            </motion.p>
                        </div>

                        <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8">
                            <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] space-y-5">
                                {NIRF_HISTORY.map((item, idx) => (
                                    <RankingBar key={item.year} year={item.year} rank={item.rank} maxRank={5} delay={idx * 0.1} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- RANKING HIGHLIGHTS --- */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[#b45309] font-bold text-sm tracking-widest">02 //</span>
                                <div className="h-px bg-[#1f2937]/20 flex-grow max-w-[50px]"></div>
                            </motion.div>
                            <motion.h2 variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl lg:text-5xl font-black mb-6 text-[#1f2937] tracking-tight leading-[1.1]">
                                Ranking <br /><span className="text-[#b45309]">Highlights</span>
                            </motion.h2>
                            <motion.p variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-[#4b5563] font-medium pl-4 border-l-2 border-[#b45309]/30">
                                Key metrics and factors behind our consistently high rankings.
                            </motion.p>
                            <motion.div variants={slowReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 hidden lg:flex w-12 h-12 rounded-full border border-[#1f2937]/10 items-center justify-center text-[#1f2937]/30">
                                <ArrowRight size={20} />
                            </motion.div>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="lg:col-span-8 grid gap-6">
                            {RANKING_HIGHLIGHTS.map((item, idx) => (
                                <InteractiveCard
                                    key={idx}
                                    variants={slowReveal}
                                    glowColor="rgba(180,83,9,0.12)"
                                    className="bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-[#b45309]/5 hover:border-amber-200/50 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-start gap-6"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-100/50 text-[#b45309] group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-inner">
                                        {item.icon}
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
        </div>
    );
};

export default Rankings;
