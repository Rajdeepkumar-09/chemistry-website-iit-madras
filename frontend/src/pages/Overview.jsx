import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 162;

const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `/Animations/ezgif-frame-${num}.jpg`;
});

const STATS = [
    { label: "Years of Excellence", value: 65, suffix: "+" },
    { label: "Faculty Members", value: 40, suffix: "+" },
    { label: "Research Divisions", value: 6, suffix: "" },
    { label: "Publications", value: 500, suffix: "+" },
];

const RESEARCH_DIVISIONS = [
    {
        title: "Organic Chemistry",
        desc: "Synthesis, methodology, natural products, and medicinal chemistry with focus on drug design and catalytic transformations.",
        icon: "🧪",
        color: "from-amber-50 to-orange-50",
        glowColor: "rgba(245, 158, 11, 0.15)",
        hoverBorder: "hover:border-amber-300/60",
        hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)]",
        hoverText: "group-hover:text-amber-600",
        accentHex: "#f59e0b"
    },
    {
        title: "Inorganic Chemistry",
        desc: "Coordination chemistry, bioinorganic systems, organometallic catalysis, and nanomaterials for energy applications.",
        icon: "⚗️",
        color: "from-blue-50 to-cyan-50",
        glowColor: "rgba(59, 130, 246, 0.15)",
        hoverBorder: "hover:border-blue-300/60",
        hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.25)]",
        hoverText: "group-hover:text-blue-600",
        accentHex: "#3b82f6"
    },
    {
        title: "Physical Chemistry",
        desc: "Spectroscopy, surface science, ultrafast dynamics, and statistical mechanical modeling of complex systems.",
        icon: "🔬",
        color: "from-purple-50 to-indigo-50",
        glowColor: "rgba(168, 85, 247, 0.15)",
        hoverBorder: "hover:border-purple-300/60",
        hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.25)]",
        hoverText: "group-hover:text-purple-600",
        accentHex: "#a855f7"
    },
    {
        title: "Theoretical Chemistry",
        desc: "Quantum chemistry, molecular simulations, machine learning-driven predictions, and computational catalysis.",
        icon: "🧮",
        color: "from-emerald-50 to-teal-50",
        glowColor: "rgba(16, 185, 129, 0.15)",
        hoverBorder: "hover:border-emerald-300/60",
        hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.25)]",
        hoverText: "group-hover:text-emerald-600",
        accentHex: "#10b981"
    },
    {
        title: "Analytical Chemistry",
        desc: "Advanced instrumentation, chromatography, mass spectrometry, and sensor development for environmental monitoring.",
        icon: "📊",
        color: "from-rose-50 to-pink-50",
        glowColor: "rgba(244, 63, 94, 0.15)",
        hoverBorder: "hover:border-rose-300/60",
        hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.25)]",
        hoverText: "group-hover:text-rose-600",
        accentHex: "#f43f5e"
    },
    {
        title: "Interdisciplinary Research",
        desc: "Cross-domain programs in materials science, biotechnology, energy systems, and environmental chemistry.",
        icon: "🌐",
        color: "from-slate-50 to-gray-100",
        glowColor: "rgba(100, 116, 139, 0.15)",
        hoverBorder: "hover:border-slate-400/50",
        hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(100,116,139,0.25)]",
        hoverText: "group-hover:text-slate-700",
        accentHex: "#64748b"
    },
];

const InteractiveColorCard = ({ children, className, glowColor, ...props }) => {
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
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 flex flex-col h-full">{children}</div>
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20 mix-blend-overlay"
                style={{
                    opacity: opacity * 0.8,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
        </motion.div>
    );
};

const Overview = () => {
    const scrollSectionRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const lastRenderedFrame = useRef(-1);
    const [loaded, setLoaded] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll({
        target: scrollSectionRef,
        offset: ["start start", "end end"]
    });

    const timelineRef = useRef(null);
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

    useEffect(() => {
        let loadedCount = 0;
        framePaths.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                setLoaded(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                if (index === 0) drawFrame(0);
            };
            imagesRef.current[index] = img;
        });
    }, []);

    const drawFrame = (frameIndex) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[frameIndex];
        if (!canvas || !img?.complete) return;
        if (frameIndex === lastRenderedFrame.current) return;
        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
        const dpr = window.devicePixelRatio || 1;
        const container = canvas.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;
        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = img.width * (height / img.height);
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = width;
            drawHeight = img.height * (width / img.width);
            offsetX = 0;
            // Align to the top so the subject's head isn't cropped
            offsetY = 0; 
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        lastRenderedFrame.current = frameIndex;
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(latest * TOTAL_FRAMES)));
        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    useEffect(() => {
        const handleResize = () => {
            lastRenderedFrame.current = -1;
            const currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(scrollYProgress.get() * TOTAL_FRAMES)));
            drawFrame(currentFrame);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [scrollYProgress]);

    useEffect(() => {
        lastRenderedFrame.current = -1;
        const currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(scrollYProgress.get() * TOTAL_FRAMES)));
        requestAnimationFrame(() => drawFrame(currentFrame));
    }, [isScrolled]);

    const titleOpacity = useTransform(smoothProgress, [0, 0.08, 0.22, 0.30], [0, 1, 1, 0]);
    const titleY = useTransform(smoothProgress, [0, 0.08, 0.22, 0.30], [60, 0, 0, -40]);
    const subtitleOpacity = useTransform(smoothProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
    const subtitleY = useTransform(smoothProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -40]);
    const statsOpacity = useTransform(smoothProgress, [0.48, 0.55, 0.68, 0.75], [0, 1, 1, 0]);
    const statsY = useTransform(smoothProgress, [0.48, 0.55, 0.68, 0.75], [60, 0, 0, -40]);
    const ctaOpacity = useTransform(smoothProgress, [0.73, 0.80, 0.92, 1.0], [0, 1, 1, 0]);
    const ctaY = useTransform(smoothProgress, [0.73, 0.80, 0.92, 1.0], [60, 0, 0, -40]);
    const vignetteOpacity = useTransform(smoothProgress, [0, 0.05, 0.85, 1], [0.3, 0.55, 0.55, 0.3]);

    return (
        <div className="relative text-[#1f2937] font-sans bg-[#0f172a]">
            <div className={`fixed left-0 w-full z-0 overflow-hidden transition-all duration-300 ${isScrolled ? 'top-16 h-[calc(100dvh-4rem)]' : 'top-20 h-[calc(100dvh-5rem)]'}`}>
                {loaded < 100 && (
                    <div className="absolute top-4 right-4 text-white z-50 text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur">
                        Loading Frames: {loaded}%
                    </div>
                )}
                <canvas ref={canvasRef} className="block absolute inset-0 object-cover select-none" />
                <motion.div style={{ opacity: vignetteOpacity }} className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="container mx-auto px-6 max-w-7xl h-full flex items-center">
                        <div className="max-w-2xl">
                            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-[calc((100vw-80rem)/2+1.5rem)] max-w-2xl">
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase drop-shadow-xl">
                                    ABOUT THE <span className="text-[#f59e0b]">DEPARTMENT</span>
                                </h1>
                            </motion.div>
                            <motion.div style={{ opacity: subtitleOpacity, y: subtitleY }} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-[calc((100vw-80rem)/2+1.5rem)] max-w-xl">
                                <p className="text-2xl md:text-4xl font-bold text-white leading-snug">Pioneering research, world-class education, and interdisciplinary innovation in chemical sciences.</p>
                            </motion.div>
                            <motion.div style={{ opacity: statsOpacity, y: statsY }} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-[calc((100vw-80rem)/2+1.5rem)] max-w-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    {STATS.map((stat, idx) => (
                                        <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                                            <div className="text-4xl md:text-5xl font-black text-[#f59e0b]">{stat.value}{stat.suffix}</div>
                                            <div className="text-white/70 uppercase text-sm font-semibold mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-[calc((100vw-80rem)/2+1.5rem)] max-w-xl pointer-events-auto">
                                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Where <span className="text-[#f59e0b]">Chemistry</span> Meets the Future</h2>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={scrollSectionRef} className="relative w-full z-10 pointer-events-none" style={{ height: '500vh' }} />

            <div className="relative z-20">
                <div className="h-48 w-full bg-gradient-to-b from-transparent to-slate-50" />
                <div className="bg-slate-50 w-full overflow-hidden">
                    {/* ===================== ABOUT THE DEPARTMENT ===================== */}
                    <section className="container mx-auto px-6 max-w-7xl pt-12 pb-32 relative">
                        <div className="absolute top-0 right-0 md:right-10 text-[10rem] md:text-[18rem] font-black text-slate-200/50 pointer-events-none z-0 leading-none select-none tracking-tighter">1959</div>
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold uppercase tracking-widest rounded-full">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                    About Us
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1f2937] tracking-tight mb-16 uppercase">A Legacy of <span className="text-[#b45309]">Discovery</span></h2>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start relative z-10">
                            <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1 }}>
                                <div className="w-16 h-1.5 bg-[#b45309] mb-8 rounded-full"></div>
                                <p className="text-xl md:text-[22px] text-slate-700 leading-relaxed mb-8 font-medium">Established in 1959, the Department of Chemistry at IIT Madras has evolved into a globally recognized hub for chemical research, innovation, and advanced education.</p>
                                <div className="pl-6 border-l-2 border-slate-300 space-y-6">
                                    <p className="text-lg text-slate-500 leading-loose">For over six decades, we have pushed the boundaries of scientific knowledge—from pioneering methodologies in organic synthesis to designing novel materials for sustainable energy. Our department serves as a bridge between fundamental chemical principles and modern technological solutions.</p>
                                    <p className="text-lg text-slate-500 leading-loose">We offer a highly interdisciplinary ecosystem through our BS, MS, and PhD programs, supported by over 40 distinguished faculty members. Our graduates hold leadership positions worldwide, reflecting our commitment to academic rigor and a culture of relentless curiosity.</p>
                                </div>
                            </motion.div>

                            <motion.div className="lg:col-span-5 lg:sticky lg:top-32" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.25 }}>
                                <InteractiveColorCard glowColor="rgba(180, 83, 9, 0.12)" className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/50">
                                    <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight mb-10 flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-[#b45309]" /> At a Glance
                                    </h3>
                                    <div className="space-y-7">
                                        {[
                                            { label: "Year Established", value: "1959" },
                                            { label: "Active Faculty", value: "40+" },
                                            { label: "Research Scholars", value: "200+" },
                                            { label: "Research Divisions", value: "6" },
                                            { label: "Publications (Annual)", value: "500+" },
                                            { label: "Sponsored Projects", value: "₹100 Cr+" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-5 last:border-0 last:pb-0 group">
                                                <span className="text-slate-500 font-medium text-base group-hover:text-slate-800 transition-colors">{item.label}</span>
                                                <span className="text-slate-800 font-semibold text-2xl group-hover:text-[#b45309] group-hover:scale-105 origin-right transition-all duration-300">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </InteractiveColorCard>
                            </motion.div>
                        </div>
                    </section>

                    {/* ===================== MISSION & VISION ===================== */}
                    <section className="relative py-24 md:py-32 bg-white overflow-hidden border-y border-slate-200">
                        <div className="container mx-auto px-6 max-w-7xl relative z-10">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16 md:mb-20">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold uppercase tracking-widest rounded-full mb-6">Our Purpose</span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-[#1f2937]">Mission & <span className="text-[#b45309]">Vision</span></h2>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                <InteractiveColorCard glowColor="rgba(180, 83, 9, 0.20)" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.1 }} className="group bg-slate-50 border border-slate-200 rounded-[2rem] p-10 md:p-12 hover:border-[#b45309]/30 hover:shadow-[0_20px_40px_-15px_rgba(180,83,9,0.15)]">
                                    <div className="w-14 h-14 rounded-2xl bg-[#b45309]/10 flex items-center justify-center mb-8 group-hover:-translate-y-1 transition-transform duration-300">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-5 text-[#1f2937] tracking-tight group-hover:text-[#b45309] transition-colors duration-300">Our Mission</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium relative z-10">To advance the frontiers of chemical sciences through world-class research and education, while nurturing creative minds that solve real-world challenges through innovation, collaboration, and an unwavering commitment to scientific excellence.</p>
                                </InteractiveColorCard>
                                <InteractiveColorCard glowColor="rgba(37, 99, 235, 0.20)" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.2 }} className="group bg-slate-50 border border-slate-200 rounded-[2rem] p-10 md:p-12 hover:border-blue-600/30 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)]">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:-translate-y-1 transition-transform duration-300">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-5 text-[#1f2937] tracking-tight group-hover:text-blue-600 transition-colors duration-300">Our Vision</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium relative z-10">To be a globally recognized centre of excellence in chemical sciences, driving transformative discoveries that address humanity's grand challenges — from sustainable energy and healthcare to advanced materials and environmental stewardship.</p>
                                </InteractiveColorCard>
                            </div>
                        </div>
                    </section>

                    {/* ===================== RESEARCH DIVISIONS ===================== */}
                    <section className="container mx-auto px-6 max-w-7xl py-24">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold uppercase tracking-widest rounded-full mb-4">Research</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] tracking-tight uppercase">Research <span className="text-[#b45309]">Divisions</span></h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-4 font-medium">Six specialized divisions driving cutting-edge discoveries across the chemical sciences spectrum.</p>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {RESEARCH_DIVISIONS.map((division, idx) => (
                                <InteractiveColorCard key={idx} glowColor={division.glowColor} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.08 }} className={`group bg-gradient-to-br ${division.color} p-8 rounded-2xl border border-slate-200 ${division.hoverBorder} ${division.hoverShadow} cursor-default`}>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out opacity-80" style={{ background: `linear-gradient(to right, transparent, ${division.accentHex}, transparent)` }} />
                                    <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 origin-left relative z-10">{division.icon}</div>
                                    <h3 className={`text-xl font-bold text-[#1f2937] mb-3 ${division.hoverText} transition-colors duration-300 relative z-10`}>{division.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium text-[14px] relative z-10">{division.desc}</p>
                                </InteractiveColorCard>
                            ))}
                        </div>
                    </section>

                    {/* ===================== TIMELINE ===================== */}
                    <section className="bg-white border-y border-slate-200 py-24">
                        <div className="container mx-auto px-6 max-w-7xl">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold uppercase tracking-widest rounded-full mb-4">Heritage</span>
                                <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] tracking-tight uppercase">Department <span className="text-[#b45309]">Timeline</span></h2>
                            </motion.div>

                            <div className="relative" ref={timelineRef}>
                                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2 z-0" />
                                <motion.div style={{ scaleY: timelineProgress, transformOrigin: "top" }} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#b45309] -translate-x-1/2 z-[1]" />

                                <div className="space-y-12">
                                    {[
                                        { year: "1959", title: "Foundation", desc: "Department of Chemistry established as one of the founding departments of IIT Madras." },
                                        { year: "1965", title: "First PhD Awarded", desc: "The department awarded its first doctoral degree, setting the stage for decades of research excellence." },
                                        { year: "1980", title: "National Instrumentation Centre", desc: "Established a state-of-the-art instrumentation facility, making it a hub for advanced analytical research." },
                                        { year: "1995", title: "Centre for Catalysis", desc: "Launched an interdisciplinary centre for catalysis research, bridging chemistry with materials and energy science." },
                                        { year: "2010", title: "DST-FIST & UGC-SAP Grants", desc: "Received major national grants for infrastructure upgrade and advanced research programs." },
                                        { year: "2020", title: "BS in Chemistry Launched", desc: "Introduced the new 4-year BS program, expanding undergraduate education in chemical sciences." },
                                        { year: "2024", title: "New Research Complex", desc: "Inaugurated a modern research complex with cryo-EM, NMR, and mass spectrometry facilities." },
                                    ].map((event, idx) => (
                                        <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 group ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center mt-1 md:mt-0">
                                                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 0.4, type: "spring", stiffness: 300 }} className="w-5 h-5 bg-white border-[3px] border-[#b45309] rounded-full group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(180,83,9,0.3)]" />
                                            </div>
                                            <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                                                <InteractiveColorCard glowColor="rgba(180, 83, 9, 0.15)" className={`bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#b45309]/30 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                                    <span className="text-[#b45309] font-black text-sm tracking-widest relative z-10">{event.year}</span>
                                                    <h3 className="text-xl font-bold text-[#1f2937] mt-1 mb-2 relative z-10">{event.title}</h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed font-medium relative z-10">{event.desc}</p>
                                                </InteractiveColorCard>
                                            </div>
                                            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===================== VALUES / PILLARS ===================== */}
                    <section className="container mx-auto px-6 max-w-7xl py-24">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold uppercase tracking-widest rounded-full mb-4">Core Values</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] tracking-tight uppercase">What We <span className="text-[#b45309]">Stand For</span></h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { 
                                    title: "Research Excellence", 
                                    desc: "Pushing the boundaries of knowledge through rigorous curiosity-driven fundamentally applied research.", 
                                    icon: "🔬",
                                    glowColor: "rgba(245, 158, 11, 0.15)", // Amber
                                    hoverBorder: "hover:border-amber-400/50",
                                    hoverShadow: "hover:shadow-[0_15px_35px_-10px_rgba(245,158,11,0.15)]",
                                    hoverText: "group-hover:text-amber-600"
                                },
                                { 
                                    title: "Academic Rigor", 
                                    desc: "Delivering world-class education that combines deep theoretical foundations with practical laboratory training.", 
                                    icon: "📚",
                                    glowColor: "rgba(59, 130, 246, 0.15)", // Blue
                                    hoverBorder: "hover:border-blue-400/50",
                                    hoverShadow: "hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.15)]",
                                    hoverText: "group-hover:text-blue-600"
                                },
                                { 
                                    title: "Innovation & Impact", 
                                    desc: "Translating research into solutions — from patents and startups to policy and societal benefit.", 
                                    icon: "💡",
                                    glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
                                    hoverBorder: "hover:border-emerald-400/50",
                                    hoverShadow: "hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.15)]",
                                    hoverText: "group-hover:text-emerald-600"
                                },
                                { 
                                    title: "Global Collaboration", 
                                    desc: "Fostering international partnerships with leading universities industries worldwide.", 
                                    icon: "🌍",
                                    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
                                    hoverBorder: "hover:border-purple-400/50",
                                    hoverShadow: "hover:shadow-[0_15px_35px_-10px_rgba(168,85,247,0.15)]",
                                    hoverText: "group-hover:text-purple-600"
                                },
                            ].map((value, idx) => (
                                <InteractiveColorCard 
                                    key={idx} 
                                    glowColor={value.glowColor} 
                                    initial={{ opacity: 0, y: 20 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ duration: 0.6, delay: idx * 0.1 }} 
                                    className={`group text-center bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 ${value.hoverBorder} ${value.hoverShadow}`}
                                >
                                    <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10">{value.icon}</div>
                                    <h3 className={`text-lg font-bold text-[#1f2937] mb-3 transition-colors relative z-10 ${value.hoverText}`}>{value.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium relative z-10">{value.desc}</p>
                                </InteractiveColorCard>
                            ))}
                        </div>
                    </section>

                    {/* ===================== CTA BANNER ===================== */}
                    <section className="bg-slate-50 border-t border-slate-200 py-32 overflow-hidden relative">
                        {/* Background Ambient Glows */}
                        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="container mx-auto px-6 max-w-7xl relative z-10">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase text-[#1f2937]">Ready to <span className="text-[#b45309]">Join Us</span>?</h2>
                                <p className="text-slate-600 text-lg mb-12 leading-relaxed font-medium">Explore our academic programs, discover research opportunities, and become part of a legacy spanning over six decades of scientific excellence.</p>
                                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                    <a href="/admissions/bs" className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#b45309] text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-orange-900/10 hover:shadow-orange-500/25 transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10 flex items-center gap-2">Explore Admissions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                                    </a>
                                    <a href="/research" className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-slate-200 text-slate-800 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-800">
                                        <div className="absolute inset-0 bg-slate-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Research</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Overview;