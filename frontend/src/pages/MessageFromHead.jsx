import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';
import {
    ArrowRight, Mail, Quote, Sparkles,
    Users, Microscope, GraduationCap, Building2,
    Phone, Printer, Navigation, Facebook, Twitter, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

import hodPhoto from '../assets/DSC_8763-min.jpg';

// --- Polished Animation Variants ---
const fadeUpSlow = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const slideReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- Custom Authentic Chemical Structure SVGs ---
const BenzeneRing = ({ size = 100, className, strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" />
        <circle cx="50" cy="50" r="24" />
    </svg>
);

const Naphthalene = ({ size = 150, className, strokeWidth = 2 }) => (
    <svg width={size} height={size * 0.7} viewBox="0 0 160 110" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="45,10 80,30 115,10 150,30 150,80 115,100 80,80 45,100 10,80 10,30" />
        <line x1="80" y1="30" x2="80" y2="80" />
        <circle cx="45" cy="55" r="20" />
        <circle cx="115" cy="55" r="20" />
    </svg>
);

const AlkaneChain = ({ size = 120, className, strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="10,80 30,50 60,60 85,30" />
        <line x1="60" y1="60" x2="70" y2="90" />
        <line x1="30" y1="50" x2="40" y2="20" />
        <line x1="35" y1="52" x2="45" y2="25" /> {/* Double bond notation */}
    </svg>
);

// --- High-Performance GPU Mouse-Tracking Card ---
const InteractiveColorCard = ({ children, className, glowColor = 'rgba(180,83,9,0.12)', ...props }) => {
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

// --- Sub-components ---
const StatCard = ({ icon: Icon, stat, label }) => (
    <InteractiveColorCard glowColor="rgba(245,158,11,0.15)" className="bg-white/60 backdrop-blur-xl rounded-[1.25rem] border border-slate-200/80 p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-2xl hover:shadow-[#b45309]/10 hover:border-amber-300/50 duration-300">
        <Icon size={28} strokeWidth={2} className="text-orange-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
        <h4 className="text-[28px] font-black text-[#111827] leading-none mb-2">{stat}</h4>
        <p className="text-[11px] text-slate-500 font-bold tracking-[0.05em] uppercase">{label}</p>
    </InteractiveColorCard>
);

const QuickActionCard = ({ label, to, desc }) => (
    <motion.div variants={fadeUpSlow} className="h-full">
        <InteractiveColorCard glowColor="rgba(180,83,9,0.15)" className="h-full bg-white/60 backdrop-blur-xl border border-slate-200/80 rounded-[1.25rem] shadow-sm hover:shadow-2xl hover:shadow-[#b45309]/10 hover:border-amber-300/50">
            <Link to={to} className="flex flex-col justify-between h-full p-6">
                <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-amber-600 transition-colors">{label}</h4>
                    <p className="text-sm text-slate-500 font-medium">{desc}</p>
                </div>
                <ArrowRight size={20} className="mt-6 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </Link>
        </InteractiveColorCard>
    </motion.div>
);

const MessageFromHead = () => {
    // Scroll and Parallax Hooks
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, restDelta: 0.001 });

    // Parallax floating values for background elements
    const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const parallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Global Mouse Tracking for Background Glow
    const bgMouseX = useMotionValue(0);
    const bgMouseY = useMotionValue(0);
    const smoothBgX = useSpring(bgMouseX, { stiffness: 50, damping: 20 });
    const smoothBgY = useSpring(bgMouseY, { stiffness: 50, damping: 20 });

    const handleGlobalMouseMove = (e) => {
        bgMouseX.set(e.clientX);
        bgMouseY.set(e.clientY);
    };

    const statsData = [
        { icon: Users, stat: "40+", label: "FACULTY MEMBERS" },
        { icon: GraduationCap, stat: "300+", label: "ACTIVE SCHOLARS" },
        { icon: Microscope, stat: "50+", label: "ADVANCED LABS" },
        { icon: Building2, stat: "1959", label: "YEAR ESTABLISHED" },
    ];

    const actionData = [
        { label: "Rankings", to: "/about/rankings", desc: "Our national and global standing" },
        { label: "Achievements", to: "/about/achievements", desc: "Department milestones and accolades" },
    ];

    return (
        <main
            onMouseMove={handleGlobalMouseMove}
            className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-600 selection:text-white overflow-hidden relative pb-32"
        >

            {/* Top Reading Progress Bar */}
            <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
                className="fixed top-0 left-0 w-full h-1 bg-[#b45309] z-[100]"
            />

            {/* --- INTERACTIVE BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-slate-50" aria-hidden="true">

                {/* 1. Base Grid */}
                <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

                {/* 2. Global Mouse Spotlight */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-70"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${smoothBgX}px ${smoothBgY}px, rgba(180,83,9,0.06), transparent 80%)`
                    }}
                />

                {/* 3. Parallax Floating Chemistry Elements (Authentic Structures) */}
                <motion.div
                    style={{ y: parallax1 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[15%] left-[2%] opacity-[0.06] text-amber-700"
                >
                    <BenzeneRing size={160} />
                </motion.div>

                <motion.div
                    style={{ y: parallax2 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[65%] right-[2%] opacity-[0.06] text-slate-800"
                >
                    <Naphthalene size={220} />
                </motion.div>

                <motion.div
                    style={{ y: parallax3 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[25%] right-[5%] opacity-[0.08] text-orange-700"
                >
                    <AlkaneChain size={130} />
                </motion.div>

                <motion.div
                    style={{ y: parallax1 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[80%] left-[5%] opacity-[0.06] text-amber-600"
                >
                    <BenzeneRing size={90} />
                </motion.div>

                {/* 4. Ambient Animated Blurs */}
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
            <div className="container relative z-20 mx-auto px-6 pt-32 pb-16 max-w-6xl">

                {/* --- HERO SECTION --- */}
                <header className="mb-16 text-center lg:text-left">
                    <motion.div
                        initial="hidden" animate="visible" variants={slideReveal}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-100 shadow-sm"
                    >
                        <Sparkles size={16} className="text-amber-600" aria-hidden="true" />
                        <span className="font-semibold text-sm text-slate-700 uppercase tracking-wider">
                            Department of Chemistry
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6"
                    >
                        Message from <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                            The Head
                        </span>
                    </motion.h1>
                </header>

                {/* --- MAIN SPLIT LAYOUT --- */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
                >

                    {/* LEFT COLUMN: Profile & Contact Info (Sticky) */}
                    <motion.aside variants={fadeUpSlow} className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <InteractiveColorCard glowColor="rgba(59,130,246,0.12)" className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/80 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200/50">

                                {/* Name & Title */}
                                <div className="mb-6 text-center lg:text-left">
                                    <h2 className="text-2xl font-black text-blue-700 tracking-tight uppercase mb-2">DR. SEKAR, G.</h2>
                                    <p className="text-slate-500 font-medium text-[17px]">Institute Chair Professor & HOD</p>
                                </div>

                                {/* Image Container */}
                                <div className="aspect-[4/5] rounded-2xl bg-slate-100 relative overflow-hidden group mb-8">
                                    <img
                                        src={hodPhoto}
                                        alt="Portrait of Dr. Sekar, G."
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] rounded-2xl pointer-events-none" />
                                </div>

                                {/* Social Icons */}
                                <div className="flex justify-center lg:justify-start gap-4 mb-8 text-emerald-500">
                                    <a href="#" aria-label="Facebook Profile" className="hover:text-emerald-600 hover:-translate-y-1 transition-all"><Facebook size={20} strokeWidth={2.5} /></a>
                                    <a href="#" aria-label="Website" className="hover:text-emerald-600 hover:-translate-y-1 transition-all"><Globe size={20} strokeWidth={2.5} /></a>
                                    <a href="#" aria-label="Twitter Profile" className="hover:text-emerald-600 hover:-translate-y-1 transition-all"><Twitter size={20} strokeWidth={2.5} /></a>
                                </div>

                                {/* Contact List */}
                                <address className="not-italic space-y-6 text-[15px] font-medium text-slate-600">
                                    <div className="flex items-start gap-4 group">
                                        <Mail size={20} className="text-slate-400 group-hover:text-blue-700 transition-colors shrink-0 mt-0.5" />
                                        <a href="mailto:gsekar@iitm.ac.in" className="hover:text-blue-700 transition-colors">gsekar@iitm.ac.in</a>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <Phone size={20} className="text-slate-400 group-hover:text-blue-700 transition-colors shrink-0 mt-0.5" />
                                        <div className="space-y-3">
                                            <p><a href="tel:+914422574229" className="hover:text-blue-700 transition-colors">+91-44-2257-4229</a> <span className="text-slate-400 font-normal">(Office)</span></p>
                                            <p><a href="tel:+914422576229" className="hover:text-blue-700 transition-colors">+91-44-2257-6229</a> <span className="text-slate-400 font-normal">(Residence)</span></p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <Printer size={20} className="text-slate-400 group-hover:text-blue-700 transition-colors shrink-0 mt-0.5" />
                                        <p>+91-44-2257-4202</p>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <Navigation size={20} className="text-slate-400 group-hover:text-blue-700 transition-colors shrink-0 mt-0.5" />
                                        <div className="space-y-1.5 leading-relaxed">
                                            <p>CYB 209D, Department of Chemistry</p>
                                            <p>Indian Institute of Technology Madras</p>
                                            <p>Chennai - 600036</p>
                                            <p>INDIA</p>
                                        </div>
                                    </div>
                                </address>
                            </InteractiveColorCard>
                        </div>
                    </motion.aside>

                    {/* RIGHT COLUMN: The Letter & Stats */}
                    <motion.article variants={fadeUpSlow} className="lg:col-span-8">

                        {/* The Letter */}
                        <InteractiveColorCard glowColor="rgba(180,83,9,0.12)" className="relative bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/80 mb-12 hover:shadow-2xl hover:shadow-[#b45309]/5 hover:border-amber-200/50">
                            <div className="absolute top-8 right-8 text-amber-500/10 pointer-events-none" aria-hidden="true">
                                <Quote size={120} fill="currentColor" />
                            </div>

                            <div className="relative z-10 space-y-6 text-slate-600 text-lg leading-[1.8] font-medium">
                                <p className="text-xl text-slate-900 font-bold leading-snug mb-6">
                                    It is my great pleasure to welcome you to the Department of Chemistry at the Indian Institute of Technology Madras.
                                </p>
                                <p>
                                    Since its establishment in 1959, our department has been at the forefront of chemical research and education in India, consistently pushing boundaries and redefining what is possible.
                                </p>
                                <p>
                                    Our department is home to a distinguished faculty comprising over 40 active researchers who are internationally recognized in their fields. Their expertise spans the entire spectrum of modern chemistry—from synthetic organic chemistry and inorganic catalysis to theoretical and computational approaches, materials science, and energy research.
                                </p>

                                {/* NEW PARAGRAPH: Modern Challenges & Collaborations */}
                                <p>
                                    As we navigate the 21st century, our focus has expanded towards interdisciplinary frontiers. We are actively tackling pressing global challenges—from sustainable energy and green chemistry to healthcare and advanced nanotechnology. Strong collaborative ties with leading international universities and industry partners ensure that our research translates into real-world impact.
                                </p>

                                <blockquote className="py-6 pl-8 my-8 border-l-4 border-amber-500 bg-amber-50/40 rounded-r-2xl">
                                    <p className="text-[19px] text-slate-800 font-semibold italic leading-relaxed m-0">
                                        "Our academic programs are designed not merely to impart knowledge, but to foster critical thinking, innovation, and a deep passion for scientific discovery."
                                    </p>
                                </blockquote>

                                <p>
                                    Students here are immersed in an ecosystem that encourages hands-on research from their very first year. Our state-of-the-art infrastructure ensures that our students and researchers have access to world-class tools for their investigations.
                                </p>

                                {/* NEW PARAGRAPH: Alumni Success */}
                                <p>
                                    We take immense pride in our vibrant alumni network. Our graduates have consistently gone on to hold leadership positions in premier academic institutions and global chemical industries, serving as true ambassadors of our department.
                                </p>

                                <p>
                                    I invite you to explore our website, learn about our research, discover our programs, and reach out to us. We welcome you to be a part of our journey towards scientific excellence.
                                </p>

                                {/* Signature Area */}
                                <div className="pt-8 mt-10 border-t border-slate-100">
                                    <div className="font-['Caveat',_'Brush_Script_MT',_cursive] text-5xl text-blue-700/80 mb-2 -rotate-2 select-none">
                                        G. Sekar
                                    </div>
                                    <p className="text-slate-900 font-bold text-xl mt-4">Dr. Sekar, G.</p>
                                    <p className="text-slate-500 font-medium mt-1">Head, Department of Chemistry</p>
                                </div>
                            </div>
                        </InteractiveColorCard>

                        {/* Stats Grid */}
                        <motion.div variants={fadeUpSlow} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {statsData.map((item, idx) => (
                                <StatCard key={idx} {...item} />
                            ))}
                        </motion.div>

                        {/* Quick Action Cards */}
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {actionData.map((item) => (
                                <QuickActionCard key={item.to} {...item} />
                            ))}
                        </motion.div>

                    </motion.article>

                </motion.div>
            </div>
        </main>
    );
};

export default MessageFromHead;