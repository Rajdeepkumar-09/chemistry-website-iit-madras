import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, GraduationCap, FlaskConical, Users, Clock, Star, AlertTriangle } from 'lucide-react';

// --- Calendar Data (January – June 2026) ---
const CALENDAR_DATA = {
    "2026-01": {
        name: "January", year: 2026, workingDays: 9,
        events: [
            { day: 2, title: "SHASTRA", type: "event", multi: true },
            { day: 3, title: "SHASTRA", type: "event", multi: true },
            { day: 4, title: "SHASTRA", type: "event", multi: true },
            { day: 5, title: "SHASTRA / HoD Meeting / M.S./Ph.D. Admission / ADD/DROP", type: "admin" },
            { day: 6, title: "SHASTRA", type: "event", multi: true },
            { day: 7, title: "Suppl. Exam – C/M / KR-IR Portal", type: "exam" },
            { day: 8, title: "SAARANG / Suppl. Exam – D/F", type: "event" },
            { day: 9, title: "SAARANG / Suppl. Exam – E/K", type: "event" },
            { day: 10, title: "SAARANG / Suppl. Exam – J/L", type: "event" },
            { day: 11, title: "SAARANG", type: "event" },
            { day: 12, title: "SAARANG / Fee deadline / Suppl. Exam – A/G", type: "deadline" },
            { day: 13, title: "Suppl. Exam – B/H", type: "exam" },
            { day: 15, title: "Pongal", type: "holiday" },
            { day: 19, title: "Enrollment / Commencement of Classes", type: "academic", important: true },
            { day: 20, title: "Late Enrollment deadline", type: "deadline" },
            { day: 21, title: "D&WC Meeting", type: "admin" },
            { day: 22, title: "Class Committee Week", type: "academic" },
            { day: 23, title: "Class Committee Week", type: "academic" },
            { day: 24, title: "KR-IR Shortlisting Ends", type: "deadline" },
            { day: 26, title: "Republic Day", type: "holiday" },
            { day: 27, title: "Suppl. grade deadline", type: "deadline" },
            { day: 29, title: "1st TTC Meeting", type: "admin" },
            { day: 31, title: "KR-IR Portal Closes", type: "deadline" },
        ]
    },
    "2026-02": {
        name: "February", year: 2026, workingDays: 19,
        events: [
            { day: 2, title: "BAR Meeting", type: "admin" },
            { day: 5, title: "BAC Meeting", type: "admin" },
            { day: 6, title: "PA&SC Meeting / E-Summit", type: "admin" },
            { day: 7, title: "GATE 2026 / E-Summit", type: "exam" },
            { day: 8, title: "GATE 2026 / E-Summit", type: "exam" },
            { day: 9, title: "HoD Meeting", type: "admin" },
            { day: 10, title: "MoU sub-committee", type: "admin" },
            { day: 12, title: "Quiz I papers deadline", type: "deadline" },
            { day: 13, title: "SAARANG / Suppl. Exam", type: "event" },
            { day: 14, title: "GATE 2026", type: "exam" },
            { day: 15, title: "GATE 2026 & JAM 2026", type: "exam" },
            { day: 18, title: "Quiz-I C/J", type: "exam" },
            { day: 19, title: "Quiz-I E/L", type: "exam" },
            { day: 20, title: "Quiz-I F/K", type: "exam" },
            { day: 21, title: "Idul Fitr", type: "holiday" },
            { day: 23, title: "Quiz-I A", type: "exam" },
            { day: 24, title: "Quiz-I B/M", type: "exam" },
            { day: 25, title: "Quiz-I G", type: "exam" },
            { day: 26, title: "Quiz-I D", type: "exam" },
            { day: 27, title: "SENATE / 2nd TTC Meeting", type: "admin" },
            { day: 28, title: "KR-IR Shortlisting Ends", type: "deadline" },
        ]
    },
    "2026-03": {
        name: "March", year: 2026, workingDays: 20,
        events: [
            { day: 1, title: "KR-IR Presentations", type: "academic" },
            { day: 2, title: "Polling Week 2026", type: "event" },
            { day: 4, title: "Holi", type: "holiday" },
            { day: 9, title: "KR-IR Winners Announced", type: "academic" },
            { day: 10, title: "Quiz II papers deadline", type: "deadline" },
            { day: 14, title: "HoD Meeting", type: "admin" },
            { day: 16, title: "Course drop deadline", type: "deadline", important: true },
            { day: 18, title: "Quiz-II C/J", type: "exam" },
            { day: 19, title: "Quiz-II D", type: "exam" },
            { day: 20, title: "Quiz-II F/K", type: "exam" },
            { day: 22, title: "Quiz-II A/H", type: "exam" },
            { day: 24, title: "Quiz-II B/M", type: "exam" },
            { day: 25, title: "Quiz-II C/U", type: "exam" },
            { day: 26, title: "Quiz-II E/L", type: "exam" },
            { day: 27, title: "Quiz-II / KR-IR Awards", type: "exam" },
            { day: 30, title: "M.S./Ph.D. Admission Deadline", type: "deadline", important: true },
            { day: 31, title: "Mahavir Jayanthi", type: "holiday" },
        ]
    },
    "2026-04": {
        name: "April", year: 2026, workingDays: 20,
        events: [
            { day: 1, title: "MS/PhD Selection Starts", type: "academic", important: true },
            { day: 3, title: "Good Friday", type: "holiday" },
            { day: 5, title: "HoD Meeting", type: "admin" },
            { day: 7, title: "Quiz II papers deadline", type: "deadline" },
            { day: 8, title: "Registration Week", type: "academic", important: true },
            { day: 10, title: "3rd TTC Meeting", type: "admin" },
            { day: 12, title: "Class Committee Week", type: "academic" },
            { day: 13, title: "Course drop deadline", type: "deadline" },
            { day: 14, title: "Tamil New Year / Ambedkar Birthday", type: "holiday" },
            { day: 21, title: "Idul Fitr", type: "holiday" },
            { day: 27, title: "M.S./Ph.D. Deadline / TCF Opens", type: "deadline" },
            { day: 29, title: "4th TTC Meeting", type: "admin" },
            { day: 30, title: "Course drop deadline", type: "deadline" },
        ]
    },
    "2026-05": {
        name: "May", year: 2026, workingDays: 20,
        events: [
            { day: 1, title: "Buddha Purnima", type: "holiday" },
            { day: 4, title: "HoD Meeting / TCF Closes", type: "admin" },
            { day: 5, title: "Last Instructional Day", type: "academic", important: true },
            { day: 7, title: "End Sem – A", type: "exam" },
            { day: 8, title: "End Sem – B", type: "exam" },
            { day: 9, title: "End Sem – H/J", type: "exam" },
            { day: 10, title: "End Sem – K/L", type: "exam" },
            { day: 11, title: "End Sem – D", type: "exam" },
            { day: 12, title: "End Sem – E", type: "exam" },
            { day: 13, title: "End Sem – F", type: "exam" },
            { day: 14, title: "End Sem – G", type: "exam" },
            { day: 15, title: "End Sem – M", type: "exam" },
            { day: 16, title: "End Sem – K/L", type: "exam" },
            { day: 17, title: "Student Vacation Starts", type: "holiday" },
            { day: 18, title: "D&WC Meeting", type: "admin" },
            { day: 19, title: "Project Report Deadline", type: "deadline" },
            { day: 20, title: "DDM Test / MS/PhD Selection Ends", type: "deadline" },
            { day: 21, title: "Class Committee Week", type: "academic" },
            { day: 25, title: "Convocation List Closes", type: "deadline" },
            { day: 26, title: "Muharram", type: "holiday" },
            { day: 27, title: "Bakrid", type: "holiday" },
            { day: 28, title: "5th TTC Meeting", type: "admin" },
            { day: 29, title: "D&WC / Grades Deadline", type: "admin" },
            { day: 30, title: "Grade Upload Deadline", type: "deadline", important: true },
        ]
    },
    "2026-06": {
        name: "June", year: 2026, workingDays: 2,
        events: [
            { day: 1, title: "BAC / DD/M.Tech Enrollment", type: "admin" },
            { day: 3, title: "PA&SC Meeting", type: "admin" },
            { day: 4, title: "BAR Meeting", type: "admin" },
            { day: 5, title: "Int. Students Degree Distribution", type: "academic" },
            { day: 6, title: "SENATE Meeting", type: "admin" },
            { day: 8, title: "HoD Meeting", type: "admin" },
            { day: 10, title: "Extn. Project Deadline", type: "deadline" },
            { day: 12, title: "SENATE Meeting", type: "admin" },
            { day: 15, title: "Extn. Viva Deadline", type: "deadline" },
            { day: 17, title: "Extn. Grades Deadline", type: "deadline" },
            { day: 23, title: "Project Grades Deadline", type: "deadline" },
            { day: 24, title: "MS/PhD Selection Ends", type: "deadline" },
            { day: 26, title: "Muharram", type: "holiday" },
            { day: 30, title: "Grade Upload Deadline", type: "deadline" },
        ]
    }
};

// --- Event type config ---
const EVENT_TYPES = {
    academic: { 
        label: "Academic", 
        color: "bg-blue-50/80 text-blue-700 border-blue-200/60", 
        activeStyle: "bg-blue-600 text-white border-blue-600 shadow-sm",
        hoverBorder: "hover:border-blue-400 hover:shadow-blue-100/30",
        ringStyle: "ring-2 ring-blue-500 shadow-md shadow-blue-50",
        leftBorder: "border-l-blue-500",
        dot: "bg-blue-500", 
        icon: GraduationCap 
    },
    exam: { 
        label: "Exam", 
        color: "bg-amber-50/80 text-amber-700 border-amber-200/60", 
        activeStyle: "bg-amber-500 text-white border-amber-500 shadow-sm",
        hoverBorder: "hover:border-amber-400 hover:shadow-amber-100/30",
        ringStyle: "ring-2 ring-amber-500 shadow-md shadow-amber-50",
        leftBorder: "border-l-amber-500",
        dot: "bg-amber-500", 
        icon: Clock 
    },
    deadline: { 
        label: "Deadline", 
        color: "bg-red-50/80 text-red-700 border-red-200/60", 
        activeStyle: "bg-red-500 text-white border-red-500 shadow-sm",
        hoverBorder: "hover:border-red-400 hover:shadow-red-100/30",
        ringStyle: "ring-2 ring-red-500 shadow-md shadow-red-50",
        leftBorder: "border-l-red-500",
        dot: "bg-red-500", 
        icon: AlertTriangle 
    },
    holiday: { 
        label: "Holiday", 
        color: "bg-green-50/80 text-green-700 border-green-200/60", 
        activeStyle: "bg-green-600 text-white border-green-600 shadow-sm",
        hoverBorder: "hover:border-green-400 hover:shadow-green-100/30",
        ringStyle: "ring-2 ring-green-500 shadow-md shadow-green-50",
        leftBorder: "border-l-green-500",
        dot: "bg-green-500", 
        icon: Star 
    },
    event: { 
        label: "Event", 
        color: "bg-purple-50/80 text-purple-700 border-purple-200/60", 
        activeStyle: "bg-purple-600 text-white border-purple-600 shadow-sm",
        hoverBorder: "hover:border-purple-400 hover:shadow-purple-100/30",
        ringStyle: "ring-2 ring-purple-500 shadow-md shadow-purple-50",
        leftBorder: "border-l-purple-500",
        dot: "bg-purple-500", 
        icon: Users 
    },
    admin: { 
        label: "Admin", 
        color: "bg-slate-50/80 text-slate-700 border-slate-200/60", 
        activeStyle: "bg-slate-700 text-white border-slate-700 shadow-sm",
        hoverBorder: "hover:border-slate-400 hover:shadow-slate-100/30",
        ringStyle: "ring-2 ring-slate-500 shadow-md shadow-slate-50",
        leftBorder: "border-l-slate-500",
        dot: "bg-slate-500", 
        icon: FlaskConical 
    },
};

const MONTH_KEYS = Object.keys(CALENDAR_DATA);
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month - 1, 1).getDay();
}

// --- Calendar Grid Component ---
const CalendarGrid = ({ monthKey, activeFilter }) => {
    const data = CALENDAR_DATA[monthKey];
    const [year, monthStr] = monthKey.split("-");
    const month = parseInt(monthStr);
    const daysInMonth = getDaysInMonth(parseInt(year), month);
    const firstDay = getFirstDayOfMonth(parseInt(year), month);
    const [selectedDay, setSelectedDay] = useState(null);

    const eventsByDay = {};
    data.events.forEach(e => {
        if (activeFilter !== "all" && e.type !== activeFilter) return;
        if (!eventsByDay[e.day]) eventsByDay[e.day] = [];
        eventsByDay[e.day].push(e);
    });

    const cells = [];
    for (let i = 0; i < firstDay; i++) {
        cells.push(<div key={`empty-${i}`} className="h-28 md:h-32 bg-transparent" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = eventsByDay[day] || [];
        const isWeekend = new Date(parseInt(year), month - 1, day).getDay() === 0 || new Date(parseInt(year), month - 1, day).getDay() === 6;
        
        const hasEvents = dayEvents.length > 0;
        const hasHoliday = dayEvents.some(e => e.type === "holiday");
        const hasImportant = dayEvents.some(e => e.important);
        const isSelected = selectedDay === day;

        const primaryType = hasEvents ? dayEvents[0].type : null;
        const typeConfig = primaryType ? EVENT_TYPES[primaryType] : null;
        const isDimmed = activeFilter !== "all" && !hasEvents;

        const bgClass = isDimmed
            ? 'bg-slate-50/30 border-slate-100/40 opacity-40 grayscale'
            : hasHoliday && (activeFilter === 'all' || activeFilter === 'holiday')
                ? 'bg-green-50/80 border-green-200/60' 
                : isSelected 
                    ? 'bg-white' 
                    : isWeekend 
                        ? 'bg-slate-50/60 border-slate-200/40' 
                        : hasEvents 
                            ? 'bg-white border-slate-200/80 shadow-sm' 
                            : 'bg-white/40 border-slate-200/40';

        const interactionClass = isDimmed ? '' : isSelected
            ? (typeConfig ? typeConfig.ringStyle : 'ring-2 ring-slate-400 shadow-md shadow-slate-50')
            : (typeConfig ? `hover:shadow-sm ${typeConfig.hoverBorder}` : 'hover:shadow-sm hover:border-slate-300');

        const importantClass = !isDimmed && hasImportant && typeConfig ? `border-l-[3px] ${typeConfig.leftBorder}` : '';

        cells.push(
            <motion.div
                key={day}
                whileHover={!isDimmed ? { scale: 1.01, y: -2 } : {}}
                onClick={() => !isDimmed && setSelectedDay(isSelected ? null : day)}
                className={`h-28 md:h-32 rounded-xl border transition-all duration-300 p-2.5 flex flex-col relative overflow-hidden group
                    ${!isDimmed ? 'cursor-pointer' : 'cursor-default'}
                    ${bgClass} ${interactionClass} ${importantClass}
                `}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-semibold ${hasHoliday && !isDimmed ? 'text-green-700' : isWeekend && !isDimmed ? 'text-slate-400' : hasEvents && !isDimmed ? 'text-[#1f2937]' : 'text-slate-400'}`}>
                        {day}
                    </span>
                    {dayEvents.length > 0 && (
                        <div className="flex gap-1">
                            {[...new Set(dayEvents.map(e => e.type))].slice(0, 3).map((type, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${EVENT_TYPES[type]?.dot || 'bg-slate-300'}`} />
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="flex-1 overflow-hidden space-y-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                        <div key={i} className={`text-[10px] md:text-[11px] leading-tight font-medium px-1.5 py-0.5 rounded truncate ${EVENT_TYPES[event.type]?.color || 'bg-slate-50 text-slate-600'}`}>
                            {event.title}
                        </div>
                    ))}
                    {dayEvents.length > 3 && (
                        <div className={`text-[10px] font-bold px-1.5 mt-1 ${typeConfig ? typeConfig.color.split(' ')[1] : 'text-slate-400'}`}>
                            +{dayEvents.length - 3} more
                        </div>
                    )}
                </div>
            </motion.div>
        );
    }

    const selectedEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];
    const primarySelectedType = selectedEvents.length > 0 ? selectedEvents[0].type : 'admin';
    const primarySelectedConfig = EVENT_TYPES[primarySelectedType] || EVENT_TYPES.admin;

    return (
        <div>
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                {DAY_NAMES.map(d => (
                    <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider py-2">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-3">
                {cells}
            </div>

            {selectedDay && selectedEvents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`mt-6 bg-white border rounded-2xl p-6 shadow-lg ${primarySelectedConfig.ringStyle.replace('ring-2', 'ring-1')}`}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${primarySelectedConfig.color}`}>
                            <CalendarIcon size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1f2937] text-xl">{data.name} {selectedDay}, {data.year}</h4>
                            <p className="text-slate-500 font-medium text-sm mt-0.5">{selectedEvents.length} scheduled event{selectedEvents.length > 1 ? 's' : ''}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedEvents.map((event, i) => {
                            const typeConfig = EVENT_TYPES[event.type] || EVENT_TYPES.admin;
                            const IconComponent = typeConfig.icon;
                            return (
                                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${typeConfig.color} bg-white transition-all hover:shadow-sm`}>
                                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeConfig.color}`}>
                                        <IconComponent size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm leading-snug text-slate-800">{event.title}</p>
                                        <div className="flex items-center flex-wrap gap-2 mt-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${typeConfig.color} px-2 py-0.5 rounded-md border`}>
                                                {typeConfig.label}
                                            </span>
                                            {event.important && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md">
                                                    Important
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// --- Upcoming Events List ---
const UpcomingEvents = ({ monthKey }) => {
    const data = CALENDAR_DATA[monthKey];
    const importantEvents = data.events.filter(e => e.important || e.type === "deadline" || e.type === "holiday");

    if (importantEvents.length === 0) return null;

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 shadow-md shadow-slate-100/30">
            <h3 className="font-bold text-[#1f2937] text-lg mb-6 flex items-center gap-2">
                <AlertTriangle size={18} className="text-[#b45309]" />
                Key Dates
            </h3>
            <div className="space-y-4">
                {importantEvents.slice(0, 8).map((event, i) => {
                    const typeConfig = EVENT_TYPES[event.type] || EVENT_TYPES.admin;
                    return (
                        <div key={i} className="flex items-center gap-4 group cursor-default">
                            <div className="text-center shrink-0 w-11 py-1 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                                <div className="text-lg font-black text-[#1f2937] leading-none">{event.day}</div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{data.name.substring(0, 3)}</div>
                            </div>
                            <div className={`w-1 h-10 rounded-full ${typeConfig.dot} shrink-0 opacity-80`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1f2937] truncate group-hover:text-[#b45309] transition-colors">
                                    {event.title.length > 50 ? event.title.substring(0, 48) + '…' : event.title}
                                </p>
                                <span className={`text-[10px] font-semibold uppercase tracking-wider ${typeConfig.color.split(' ')[1]}`}>
                                    {typeConfig.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Main Page ---
const Calendar = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState("all");
    const monthKey = MONTH_KEYS[currentMonthIndex];
    const monthData = CALENDAR_DATA[monthKey];

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const rotateSlow = useTransform(smoothProgress, [0, 1], [0, 90]);
    const rotateReverse = useTransform(smoothProgress, [0, 1], [0, -180]);
    const panUpSlow = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
    const panDownSlow = useTransform(smoothProgress, [0, 1], ['0%', '12%']);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20 text-[#1f2937] font-sans relative overflow-hidden">

            {/* Background Layers */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#b45309]/[0.05] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/[0.03] rounded-full blur-[140px]" />
            </div>

            <div className="fixed inset-0 z-[0] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)' }}>
                <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:30px_30px]" />

                <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="absolute top-[10%] left-[-5%] z-[1] opacity-[0.05] pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" />
                        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeDasharray="2 2" />
                    </svg>
                </motion.div>
                <motion.div style={{ y: panDownSlow, rotate: rotateReverse }} className="absolute bottom-[8%] right-[0%] z-[1] opacity-[0.04] pointer-events-none">
                    <svg width="320" height="320" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
                        <circle cx="50" cy="50" r="18" strokeDasharray="3 3" />
                    </svg>
                </motion.div>
                <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="absolute top-[45%] right-[-4%] z-[1] opacity-[0.04] pointer-events-none">
                    <svg width="300" height="300" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <rect x="10" y="20" width="80" height="70" rx="6" />
                        <line x1="10" y1="38" x2="90" y2="38" />
                        <line x1="28" y1="20" x2="28" y2="10" />
                        <line x1="50" y1="20" x2="50" y2="10" />
                        <line x1="72" y1="20" x2="72" y2="10" />
                        <line x1="37" y1="38" x2="37" y2="90" strokeDasharray="2 2" />
                        <line x1="63" y1="38" x2="63" y2="90" strokeDasharray="2 2" />
                    </svg>
                </motion.div>
            </div>

            {/* Hero Header */}
            <section className="relative bg-transparent overflow-visible">
                <div className="container mx-auto px-6 max-w-7xl pt-32 pb-14 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold uppercase tracking-widest rounded-full">
                                <CalendarIcon size={14} /> Academics
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-[#1f2937]">
                            Academic <span className="text-[#b45309]">Calendar</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#4b5563] mt-6 max-w-2xl font-medium">
                            January – June 2026 · Department of Chemistry, IIT Madras
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-6 max-w-7xl py-12 relative z-10">

                {/* Month Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
                            disabled={currentMonthIndex === 0}
                            className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center bg-white hover:bg-[#b45309]/5 hover:border-[#b45309]/30 hover:text-[#b45309] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight min-w-[220px] text-center">
                            {monthData.name} <span className="text-[#b45309]">{monthData.year}</span>
                        </h2>
                        <button
                            onClick={() => setCurrentMonthIndex(Math.min(MONTH_KEYS.length - 1, currentMonthIndex + 1))}
                            disabled={currentMonthIndex === MONTH_KEYS.length - 1}
                            className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center bg-white hover:bg-[#b45309]/5 hover:border-[#b45309]/30 hover:text-[#b45309] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm overflow-x-auto max-w-full">
                        {MONTH_KEYS.map((key, idx) => (
                            <button
                                key={key}
                                onClick={() => setCurrentMonthIndex(idx)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${idx === currentMonthIndex
                                    ? 'bg-[#1f2937] text-white shadow-md'
                                    : 'text-slate-500 hover:text-[#b45309] hover:bg-slate-50'
                                    }`}
                            >
                                {CALENDAR_DATA[key].name.substring(0, 3)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-3 mb-8 bg-white/50 p-3 rounded-2xl border border-slate-200/60"
                >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2 ml-2">Filters:</span>
                    {Object.entries(EVENT_TYPES).map(([key, config]) => {
                        const isActive = activeFilter === key;
                        const isDimmed = activeFilter !== "all" && !isActive;
                        
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveFilter(isActive ? "all" : key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                    isActive
                                    ? config.activeStyle
                                    : isDimmed
                                        ? `${config.color} opacity-40 hover:opacity-100 grayscale border`
                                        : `${config.color} hover:shadow-sm hover:opacity-100 border`
                                }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : config.dot}`} />
                                {config.label}
                            </button>
                        );
                    })}
                    {activeFilter !== "all" && (
                        <button
                            onClick={() => setActiveFilter("all")}
                            className="ml-auto flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-wider px-3 py-1.5 hover:bg-red-50 rounded-full"
                        >
                            ✕ Clear
                        </button>
                    )}
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Calendar */}
                    <motion.div
                        key={monthKey + activeFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="xl:col-span-9"
                    >
                        <CalendarGrid monthKey={monthKey} activeFilter={activeFilter} />
                    </motion.div>

                    {/* Sidebar */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 shadow-md shadow-slate-100/30">
                            <h3 className="font-bold text-[#1f2937] text-lg mb-5 flex items-center gap-2">
                                <CalendarIcon size={18} className="text-[#b45309]" />
                                Month Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-sm text-slate-600 font-medium">Working Days</span>
                                    <span className="text-lg font-black text-[#1f2937]">{monthData.workingDays}</span>
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-sm text-slate-600 font-medium">Total Events</span>
                                    <span className="text-lg font-black text-[#b45309]">{monthData.events.length}</span>
                                </div>
                                <div className="h-px bg-slate-100 my-4" />
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-sm text-slate-500 font-medium">Holidays</span>
                                    <span className="font-bold text-green-600">{monthData.events.filter(e => e.type === "holiday").length}</span>
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-sm text-slate-500 font-medium">Exams</span>
                                    <span className="font-bold text-amber-600">{monthData.events.filter(e => e.type === "exam").length}</span>
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-sm text-slate-500 font-medium">Deadlines</span>
                                    <span className="font-bold text-red-600">{monthData.events.filter(e => e.type === "deadline").length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Dates */}
                        <UpcomingEvents monthKey={monthKey} />
                    </div>
                </div>

                {/* EDITORIAL / MINIMALIST Abbreviations Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm"
                >
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        
                        {/* Title Context */}
                        <div className="lg:w-1/3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6">
                                <FlaskConical size={22} className="text-[#b45309]" />
                            </div>
                            <h3 className="font-black text-[#1f2937] text-2xl tracking-tight mb-2">Abbreviations</h3>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                                Quick reference guide for the acronyms used throughout the academic calendar.
                            </p>
                        </div>
                        
                        {/* Data List (Clean & Borderless) */}
                        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                            {[
                                { abbr: "BAC", desc: "Board of Academic Courses" },
                                { abbr: "BAR", desc: "Board of Academic Research" },
                                { abbr: "PA&SC", desc: "Prizes, Awards & Scholarship" },
                                { abbr: "D&WC", desc: "Disciplinary & Welfare" },
                                { abbr: "MoU", desc: "Memorandum of Understanding" },
                                { abbr: "IEC", desc: "Institutional Ethics Committee" },
                                { abbr: "TTC", desc: "Time Table Committee" },
                                { abbr: "TCF", desc: "Teacher Course Feedback" },
                                { abbr: "Suppl", desc: "Supplementary Exam" },
                                { abbr: "DD", desc: "Dual Degree" },
                                { abbr: "KR-IR", desc: "KR-IR Awards" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-baseline gap-4 border-b border-slate-100 pb-3">
                                    <span className="font-black text-[#b45309] text-sm tracking-wide w-16 shrink-0">
                                        {item.abbr}
                                    </span>
                                    <span className="text-slate-600 text-sm font-medium">
                                        {item.desc}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Calendar;