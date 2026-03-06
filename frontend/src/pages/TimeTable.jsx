import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Filter, Download, BookX } from 'lucide-react';

// --- Dummy Data ---
const TIME_SLOTS = [
    { id: 'S1', time: '08:00 - 08:50 AM' },
    { id: 'S2', time: '09:00 - 09:50 AM' },
    { id: 'S3', time: '10:00 - 10:50 AM' },
    { id: 'S4', time: '11:00 - 11:50 AM' },
    { id: 'S5', time: '12:00 - 12:50 PM' },
    { id: 'LUNCH', time: '01:00 - 02:00 PM', isBreak: true },
    { id: 'S6', time: '02:00 - 02:50 PM' },
    { id: 'S7', time: '03:00 - 03:50 PM' },
    { id: 'S8', time: '04:00 - 04:50 PM' },
    { id: 'S9', time: '05:00 - 05:50 PM' },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const COURSE_COLORS = {
    'Core': 'bg-blue-50/80 border-blue-200 text-blue-900',
    'Elective': 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
    'Lab': 'bg-purple-50/80 border-purple-200 text-purple-900',
    'Humanities': 'bg-amber-50/80 border-amber-200 text-amber-900'
};

// Data is available for Sem 1 & 2. Other sems are left empty to trigger the "No Data" UI.
const TIMETABLE_DATA = {
    'BS': {
        1: [
            { id: 'CY1011', name: 'General Chemistry I', type: 'Core', instructor: 'Dr. A. Kumar', room: 'CRC 101', day: 'Monday', slot: 'S2' },
            { id: 'CY1011', name: 'General Chemistry I', type: 'Core', instructor: 'Dr. A. Kumar', room: 'CRC 101', day: 'Wednesday', slot: 'S2' },
            { id: 'CY1011', name: 'General Chemistry I', type: 'Core', instructor: 'Dr. A. Kumar', room: 'CRC 101', day: 'Thursday', slot: 'S3' },
            { id: 'MA1101', name: 'Mathematics I', type: 'Core', instructor: 'Dr. S. Singh', room: 'CRC 102', day: 'Monday', slot: 'S3' },
            { id: 'MA1101', name: 'Mathematics I', type: 'Core', instructor: 'Dr. S. Singh', room: 'CRC 102', day: 'Tuesday', slot: 'S4' },
            { id: 'MA1101', name: 'Mathematics I', type: 'Core', instructor: 'Dr. S. Singh', room: 'CRC 102', day: 'Friday', slot: 'S2' },
            { id: 'PH1010', name: 'Physics I', type: 'Core', instructor: 'Dr. P. Sharma', room: 'CRC 103', day: 'Tuesday', slot: 'S2' },
            { id: 'PH1010', name: 'Physics I', type: 'Core', instructor: 'Dr. P. Sharma', room: 'CRC 103', day: 'Wednesday', slot: 'S4' },
            { id: 'PH1010', name: 'Physics I', type: 'Core', instructor: 'Dr. P. Sharma', room: 'CRC 103', day: 'Thursday', slot: 'S2' },
            { id: 'HS1010', name: 'English Comm.', type: 'Humanities', instructor: 'Prof. R. Iyer', room: 'HSB 201', day: 'Monday', slot: 'S4' },
            { id: 'HS1010', name: 'English Comm.', type: 'Humanities', instructor: 'Prof. R. Iyer', room: 'HSB 201', day: 'Thursday', slot: 'S4' },
            { id: 'CY1012', name: 'Chemistry Lab I', type: 'Lab', instructor: 'Staff', room: 'UG Lab', day: 'Tuesday', slot: 'S6', duration: 3 },
            { id: 'PH1012', name: 'Physics Lab I', type: 'Lab', instructor: 'Staff', room: 'Phy Lab', day: 'Friday', slot: 'S6', duration: 3 },
        ],
        2: [
            { id: 'CY1020', name: 'Organic', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Monday', slot: 'S1' },
            { id: 'CY1024', name: 'Biochem', type: 'Elective', instructor: 'Staff', room: 'TBA', day: 'Monday', slot: 'S2' },
            { id: 'CY1022', name: 'Math', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Monday', slot: 'S3' },
            { id: 'PH1020', name: 'Physics', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Monday', slot: 'S4' },

            { id: 'CY1024', name: 'Biochem', type: 'Elective', instructor: 'Staff', room: 'TBA', day: 'Tuesday', slot: 'S1' },
            { id: 'CY1022', name: 'Math', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Tuesday', slot: 'S2' },
            { id: 'PH1020', name: 'Physics', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Tuesday', slot: 'S3' },
            { id: 'CY1020', name: 'Organic (Slot A?)', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Tuesday', slot: 'S4' },
            { id: 'CY1020', name: 'Organic (Slot B?)', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Tuesday', slot: 'S6' },

            { id: 'CY1022', name: 'Math', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Wednesday', slot: 'S3' },
            { id: 'CY1024', name: 'Biochem', type: 'Elective', instructor: 'Staff', room: 'TBA', day: 'Wednesday', slot: 'S4' },
            { id: 'PH1020', name: 'Physics (Evening)', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Wednesday', slot: 'S9' },

            { id: 'CY1020', name: 'Organic', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Thursday', slot: 'S4' },
            { id: 'PH1020', name: 'Physics', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Thursday', slot: 'S6' },
            { id: 'GN1102', name: 'Life Skills-II', type: 'Humanities', instructor: 'Staff', room: 'TBA', day: 'Thursday', slot: 'S7', duration: 3 }, // Assuming "Until 16:50" covers S7, S8, S9

            { id: 'CY1026', name: 'Chemistry Lab', type: 'Lab', instructor: 'Staff', room: 'TBA', day: 'Friday', slot: 'S2', duration: 3 }, // Assuming it covers S2, S3, S4
            { id: 'CY1022', name: 'Math', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Friday', slot: 'S6' },
            { id: 'CY1020', name: 'Organic', type: 'Core', instructor: 'Staff', room: 'TBA', day: 'Friday', slot: 'S7' },
        ],
        3: [], 4: [], 5: [], 6: [], 7: [], 8: []
    },
    'MS': {
        1: [
            { id: 'CY5011', name: 'Adv Organic Chem', type: 'Core', instructor: 'Prof. K. Raj', room: 'CB 301', day: 'Monday', slot: 'S2' },
            { id: 'CY5011', name: 'Adv Organic Chem', type: 'Core', instructor: 'Prof. K. Raj', room: 'CB 301', day: 'Wednesday', slot: 'S2' },
            { id: 'CY5011', name: 'Adv Organic Chem', type: 'Core', instructor: 'Prof. K. Raj', room: 'CB 301', day: 'Thursday', slot: 'S3' },
            { id: 'CY5013', name: 'Quantum Chemistry', type: 'Core', instructor: 'Prof. D. Bose', room: 'CB 302', day: 'Tuesday', slot: 'S3' },
            { id: 'CY5013', name: 'Quantum Chemistry', type: 'Core', instructor: 'Prof. D. Bose', room: 'CB 302', day: 'Wednesday', slot: 'S4' },
            { id: 'CY5013', name: 'Quantum Chemistry', type: 'Core', instructor: 'Prof. D. Bose', room: 'CB 302', day: 'Friday', slot: 'S3' },
            { id: 'CY5015', name: 'Adv Inorganic', type: 'Core', instructor: 'Prof. T. Sen', room: 'CB 301', day: 'Monday', slot: 'S4' },
            { id: 'CY5015', name: 'Adv Inorganic', type: 'Core', instructor: 'Prof. T. Sen', room: 'CB 301', day: 'Tuesday', slot: 'S5' },
            { id: 'CY5015', name: 'Adv Inorganic', type: 'Core', instructor: 'Prof. T. Sen', room: 'CB 301', day: 'Friday', slot: 'S4' },
            { id: 'CY6021', name: 'Spectroscopy', type: 'Elective', instructor: 'Dr. V. Nath', room: 'CB 303', day: 'Monday', slot: 'S1' },
            { id: 'CY6021', name: 'Spectroscopy', type: 'Elective', instructor: 'Dr. V. Nath', room: 'CB 303', day: 'Thursday', slot: 'S1' },
        ],
        2: [], 3: [], 4: []
    }
};

const PROGRAMS = Object.keys(TIMETABLE_DATA);

// --- Animations ---
const fadeUpProps = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.4, ease: "easeOut" }
};

const TimeTable = () => {
    const [degree, setDegree] = useState(PROGRAMS[0] || '');
    const [semester, setSemester] = useState(1);

    const availableSemesters = useMemo(() => {
        if (!degree || !TIMETABLE_DATA[degree]) return [];
        return Object.keys(TIMETABLE_DATA[degree])
            .map(Number)
            .sort((a, b) => a - b);
    }, [degree]);

    useEffect(() => {
        if (!availableSemesters.includes(semester) && availableSemesters.length > 0) {
            setSemester(availableSemesters[0]);
        }
    }, [degree, availableSemesters, semester]);

    const currentSchedule = TIMETABLE_DATA[degree]?.[semester] || [];
    const hasClasses = currentSchedule.length > 0;

    const getCellContent = (day, slotId) => {
        const course = currentSchedule.find(c => c.day === day && c.slot === slotId);

        if (!course) {
            const activeMultiSlotCourse = currentSchedule.find(c => {
                if (c.day !== day || !c.duration) return false;
                const startIndex = TIME_SLOTS.findIndex(s => s.id === c.slot);
                const currentIndex = TIME_SLOTS.findIndex(s => s.id === slotId);
                return currentIndex > startIndex && currentIndex < startIndex + c.duration;
            });
            if (activeMultiSlotCourse) return 'BLOCKED';
        }
        return course;
    };

    // --- Scroll Animations for Background Elements ---
    const { scrollYProgress } = useScroll();
    const panUpSlow = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
    const panDownSlow = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const rotateSlow = useTransform(scrollYProgress, [0, 1], ['0deg', '45deg']);
    const rotateReverse = useTransform(scrollYProgress, [0, 1], ['0deg', '-45deg']);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20 text-[#1f2937] font-sans relative overflow-hidden pb-24 selection:bg-blue-100 selection:text-blue-900">
            {/* Background Layers */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#b45309]/[0.05] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/[0.03] rounded-full blur-[140px]" />
            </div>

            <div className="fixed inset-0 z-[0] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)' }}>
                <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:30px_30px]" />

                {/* Floating SVGs */}
                <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="absolute top-[10%] left-[2%] z-[1] opacity-[0.05] pointer-events-none">
                    <svg width="300" height="300" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                        <line x1="50" y1="15" x2="50" y2="50" />
                        <line x1="50" y1="50" x2="70" y2="65" />
                        <circle cx="50" cy="50" r="3" fill="#0f172a" />
                    </svg>
                </motion.div>

                <motion.div style={{ y: panDownSlow, rotate: rotateReverse }} className="absolute top-[40%] right-[3%] z-[1] opacity-[0.04] pointer-events-none">
                    <svg width="250" height="250" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <rect x="20" y="20" width="60" height="60" rx="8" />
                        <line x1="20" y1="40" x2="80" y2="40" />
                        <line x1="40" y1="20" x2="40" y2="80" />
                        <line x1="60" y1="20" x2="60" y2="80" />
                    </svg>
                </motion.div>

                <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="absolute bottom-[5%] left-[5%] z-[1] opacity-[0.05] pointer-events-none">
                    <svg width="200" height="200" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <polygon points="50,15 90,85 10,85" />
                        <circle cx="50" cy="65" r="10" />
                    </svg>
                </motion.div>
            </div>

            <header className="container mx-auto px-4 sm:px-6 max-w-7xl pt-24 pb-10 relative z-10">
                <motion.div {...fadeUpProps} className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm mb-6">
                        <Calendar size={14} className="text-blue-600" /> Academic Schedule
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4">
                        Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-[#b45309]">Timetable</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Access course schedules, laboratory timings, and venue details. Filter by your specific program and current semester below.
                    </p>
                </motion.div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                {/* Controls */}
                <motion.div
                    {...fadeUpProps}
                    className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">

                        {/* Program Selector */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Filter size={18} className="text-slate-400 hidden sm:block" />
                            <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Program</span>
                            <div className="flex bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto">
                                {PROGRAMS.map((deg) => (
                                    <button
                                        key={deg}
                                        onClick={() => setDegree(deg)}
                                        className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-bold transition-all ${degree === deg
                                            ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                                            }`}
                                    >
                                        {deg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px sm:w-px sm:h-10 bg-slate-200" />

                        {/* Semester Selector */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                            <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Semester</span>
                            <div className="flex gap-1.5 flex-wrap w-full">
                                {availableSemesters.length > 0 ? availableSemesters.map((sem) => (
                                    <button
                                        key={sem}
                                        onClick={() => setSemester(sem)}
                                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-bold transition-all flex items-center justify-center border ${semester === sem
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700'
                                            }`}
                                    >
                                        {sem}
                                    </button>
                                )) : (
                                    <span className="text-sm text-slate-400 font-medium italic py-2">No semesters found</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <button className="shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all font-semibold text-sm w-full lg:w-auto shadow-sm">
                        <Download size={16} />
                        Download PDF
                    </button>
                </motion.div>

                {/* Timetable Area */}
                <motion.div
                    {...fadeUpProps}
                    className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden relative min-h-[400px]"
                >
                    {hasClasses ? (
                        <div className="overflow-x-auto custom-scrollbar">
                            <div className="min-w-[1050px] p-6 lg:p-8">
                                <div className="grid grid-cols-[100px_repeat(10,minmax(120px,1fr))] grid-rows-[auto_repeat(5,minmax(120px,auto))] gap-3">

                                    {/* Header Row */}
                                    <div className="font-bold text-[11px] text-slate-400 uppercase tracking-widest flex items-end pb-3 pl-2" style={{ gridColumn: 1, gridRow: 1 }}>
                                        Time
                                    </div>
                                    {TIME_SLOTS.map((slot, idx) => (
                                        <div key={slot.id} className="text-center pb-3 flex flex-col gap-1 items-center justify-end" style={{ gridColumn: idx + 2, gridRow: 1 }}>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">{slot.id}</div>
                                            <div className="text-[11px] font-semibold text-slate-600">{slot.time}</div>
                                        </div>
                                    ))}

                                    {/* Day Columns */}
                                    {DAYS.map((day, dIdx) => (
                                        <div key={`header-${day}`} className="font-bold text-sm text-slate-800 flex items-center justify-start pr-4 py-4 border-t border-slate-100" style={{ gridColumn: 1, gridRow: dIdx + 2 }}>
                                            {day}
                                        </div>
                                    ))}

                                    {/* Lunch Break Global Column */}
                                    <div className="flex items-center justify-center relative group overflow-hidden bg-slate-50/80 rounded-2xl my-2 border border-dashed border-slate-200" style={{ gridColumn: 7, gridRow: '2 / 7' }}>
                                        <span className="font-black text-slate-300 tracking-[0.4em] rotate-90 uppercase text-sm whitespace-nowrap z-10">LUNCH BREAK</span>
                                    </div>

                                    {/* Grid Cells */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`grid-${degree}-${semester}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="contents"
                                        >
                                            {DAYS.map((day, dIdx) => {
                                                return TIME_SLOTS.map((slot, sIdx) => {
                                                    if (slot.isBreak) return null;

                                                    const colIndex = sIdx + 2;
                                                    const rowIndex = dIdx + 2;
                                                    const cellProcess = getCellContent(day, slot.id);

                                                    if (cellProcess === 'BLOCKED') return null;

                                                    if (!cellProcess) {
                                                        return (
                                                            <div key={`${day}-${slot.id}`} className="p-1.5 border-t border-slate-100" style={{ gridColumn: colIndex, gridRow: rowIndex }}>
                                                                <div className="w-full h-full min-h-[110px] rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity border border-transparent hover:border-slate-200 hover:shadow-sm">
                                                                    <span className="text-[10px] uppercase font-bold text-slate-400">Free</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    const colorClasses = COURSE_COLORS[cellProcess.type] || 'bg-slate-50 border-slate-200 text-slate-800';

                                                    return (
                                                        <div
                                                            key={`${day}-${slot.id}`}
                                                            className="p-1.5 border-t border-slate-100"
                                                            style={{
                                                                gridColumn: `${colIndex} / span ${cellProcess.duration || 1}`,
                                                                gridRow: rowIndex
                                                            }}
                                                        >
                                                            <div className={`h-full min-h-[110px] rounded-2xl border p-3.5 flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer relative overflow-hidden group ${colorClasses}`}>

                                                                <div>
                                                                    <div className="flex justify-between items-start mb-2 relative z-10">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest bg-white/60 px-2 py-0.5 rounded-md shadow-sm border border-white/40">
                                                                            {cellProcess.id}
                                                                        </span>
                                                                        {cellProcess.duration && (
                                                                            <span className="text-[10px] font-bold uppercase py-0.5 opacity-60">
                                                                                {cellProcess.duration} Slots
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <h3 className="font-bold text-sm leading-tight mb-3 relative z-10 break-words pr-2">
                                                                        {cellProcess.name}
                                                                    </h3>
                                                                </div>

                                                                <div className="space-y-1.5 relative z-10 mt-auto">
                                                                    <div className="flex items-center gap-2 text-[11px] font-semibold opacity-80">
                                                                        <User size={12} strokeWidth={2.5} /> {cellProcess.instructor}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-[11px] font-semibold opacity-80">
                                                                        <MapPin size={12} strokeWidth={2.5} /> {cellProcess.room}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                });
                                            })}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty State Display */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center py-32 px-6"
                        >
                            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 border border-slate-200 shadow-inner">
                                <BookX size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No Schedule Published</h3>
                            <p className="text-slate-500 max-w-sm font-medium">
                                The timetable for {degree} Semester {semester} has not been updated yet. Please check back later.
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Legend Below Grid (Only show if classes exist to avoid clutter) */}
                {hasClasses && (
                    <motion.div {...fadeUpProps} className="mt-8 flex flex-wrap gap-4 items-center justify-center">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mr-2">Legend:</span>
                        {Object.entries(COURSE_COLORS).map(([type, colorClass]) => {
                            const match = colorClass.match(/text-([a-z]+)-900/);
                            const dotColor = match ? `bg-${match[1]}-500` : 'bg-slate-500';

                            return (
                                <div key={type} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm">
                                    <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                                    {type}
                                </div>
                            );
                        })}
                    </motion.div>
                )}

            </main>
        </div>
    );
};

export default TimeTable;