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
            { day: 5, title: "SHASTRA / HoD Meeting / M.S./Ph.D. Admission dates / ADD/DROP courses Begins", type: "admin" },
            { day: 6, title: "SHASTRA", type: "event", multi: true },
            { day: 7, title: "Make up / Suppl. Exam – C/M / KR-IR Award Application Portal", type: "exam" },
            { day: 8, title: "SAARANG / Make up / Suppl. Exam – D/F", type: "event" },
            { day: 9, title: "SAARANG / Make up / Suppl. Exam – E/K", type: "event" },
            { day: 10, title: "SAARANG / Make up / Suppl. Exam – J/L", type: "event" },
            { day: 11, title: "SAARANG", type: "event" },
            { day: 12, title: "SAARANG / Last date for fee payment for JAN-MAY 2026 semester / Make up / Suppl. Exam – A/G / Faculty Vacation ends", type: "deadline" },
            { day: 13, title: "Make up / Suppl. Exam – B/H", type: "exam" },
            { day: 15, title: "Pongal", type: "holiday" },
            { day: 19, title: "Enrollment at Department / Commencement of Classes", type: "academic", important: true },
            { day: 20, title: "Last date for Enrollment with fine", type: "deadline" },
            { day: 21, title: "D&WC Meeting", type: "admin" },
            { day: 22, title: "Class Committee Week", type: "academic" },
            { day: 23, title: "Class Committee Week", type: "academic" },
            { day: 24, title: "End of KR-IR Award Application Shortlisting Process", type: "deadline" },
            { day: 26, title: "Republic Day / Last date for fee payment for JAN-MAY 2026 with LATE PAYMENT FEE", type: "holiday" },
            { day: 27, title: "Last Date for sending make up / supplementary grade", type: "deadline" },
            { day: 29, title: "1st TTC Meeting", type: "admin" },
            { day: 31, title: "KR-IR Award Application Portal Closes", type: "deadline" },
        ]
    },
    "2026-02": {
        name: "February", year: 2026, workingDays: 19,
        events: [
            { day: 2, title: "BAR Meeting", type: "admin" },
            { day: 5, title: "BAC Meeting", type: "admin" },
            { day: 6, title: "PA&SC Meeting / E-Summit – Non-Instructional Day", type: "admin" },
            { day: 7, title: "GATE 2026 / E-Summit", type: "exam" },
            { day: 8, title: "GATE 2026 / E-Summit", type: "exam" },
            { day: 9, title: "HoD Meeting", type: "admin" },
            { day: 10, title: "MoU sub-committee", type: "admin" },
            { day: 12, title: "Last date for handing over of Quiz I papers", type: "deadline" },
            { day: 13, title: "SAARANG / Make up / Suppl. Exam", type: "event" },
            { day: 14, title: "GATE 2026", type: "exam" },
            { day: 15, title: "GATE 2026 & JAM 2026", type: "exam" },
            { day: 18, title: "Quiz-I C/J", type: "exam" },
            { day: 19, title: "Quiz-I E/L", type: "exam" },
            { day: 20, title: "Quiz-I F/K", type: "exam" },
            { day: 21, title: "Idul Fitr", type: "holiday" },
            { day: 23, title: "Quiz-I A", type: "exam" },
            { day: 24, title: "Quiz-I B/M", type: "exam" },
            { day: 25, title: "Quiz-I G (Interchange of C & G Slots)", type: "exam" },
            { day: 26, title: "Quiz-I D (Interchange of E & D Slots)", type: "exam" },
            { day: 27, title: "SENATE Meeting / 2nd TTC Meeting", type: "admin" },
            { day: 28, title: "End of KR-IR Award Application Shortlisting Process", type: "deadline" },
        ]
    },
    "2026-03": {
        name: "March", year: 2026, workingDays: 20,
        events: [
            { day: 1, title: "Presentation by KR-IR Awards Shortlisted Candidates", type: "academic" },
            { day: 2, title: "Polling Week 2026", type: "event" },
            { day: 4, title: "Holi – Non-Instructional Day", type: "holiday" },
            { day: 9, title: "Publication of names of KR-IR Award winners", type: "academic" },
            { day: 10, title: "Last date for handing over of Quiz II papers", type: "deadline" },
            { day: 14, title: "HoD Meeting", type: "admin" },
            { day: 16, title: "Last date for dropping of courses", type: "deadline", important: true },
            { day: 18, title: "Quiz-II C/J", type: "exam" },
            { day: 19, title: "Quiz-II D (Interchange of E & D Slots)", type: "exam" },
            { day: 20, title: "Quiz-II F/K", type: "exam" },
            { day: 22, title: "Quiz-II A/H", type: "exam" },
            { day: 24, title: "Quiz-II B/M", type: "exam" },
            { day: 25, title: "Quiz-II C/U", type: "exam" },
            { day: 26, title: "Quiz-II E/L", type: "exam" },
            { day: 27, title: "Quiz-II (Interchange of F & G Slots) / Distribution of KR-IR Awards", type: "exam" },
            { day: 30, title: "M.S. / Ph.D. Admission – Last Date of Submission / Application", type: "deadline", important: true },
            { day: 31, title: "Mahavir Jayanthi", type: "holiday" },
        ]
    },
    "2026-04": {
        name: "April", year: 2026, workingDays: 20,
        events: [
            { day: 1, title: "Start of MS/PhD Selection Process", type: "academic", important: true },
            { day: 3, title: "Good Friday", type: "holiday" },
            { day: 5, title: "HoD Meeting", type: "admin" },
            { day: 7, title: "Last date for handing over of Quiz II papers", type: "deadline" },
            { day: 8, title: "Registration Week", type: "academic", important: true },
            { day: 10, title: "3rd TTC Meeting", type: "admin" },
            { day: 12, title: "Class Committee Week", type: "academic" },
            { day: 13, title: "Last date for dropping of courses", type: "deadline" },
            { day: 14, title: "Maqhadi (Tamil New Year's Day) / Bharath Ratna Dr. B.R. Ambedkar Birthday", type: "holiday" },
            { day: 21, title: "Idul Fitr", type: "holiday" },
            { day: 27, title: "M.S. / Ph.D. Admission – Last Date of Submission / Application / TCF Link Opens", type: "deadline" },
            { day: 29, title: "4th TTC Meeting", type: "admin" },
            { day: 30, title: "Last date for dropping of courses", type: "deadline" },
        ]
    },
    "2026-05": {
        name: "May", year: 2026, workingDays: 20,
        events: [
            { day: 1, title: "Buddha Purnima", type: "holiday" },
            { day: 4, title: "HoD Meeting / TCF Link Closes", type: "admin" },
            { day: 5, title: "Last Instructional Day / Compilation of attendance / MoU sub-committee", type: "academic", important: true },
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
            { day: 17, title: "Student Vacation commences", type: "holiday" },
            { day: 18, title: "D&WC Meeting", type: "admin" },
            { day: 19, title: "B.Tech/M.Sc. Last date for Submission of Project Report", type: "deadline" },
            { day: 20, title: "DDM Test/MBA – Last date for Conducting viva / End of MS/PhD Selection Process", type: "deadline" },
            { day: 21, title: "Class Committee Week", type: "academic" },
            { day: 25, title: "Closing of Graduates list of Convocation 2025", type: "deadline" },
            { day: 26, title: "Muharram", type: "holiday" },
            { day: 27, title: "Idul Zulha (Bakrid)", type: "holiday" },
            { day: 28, title: "5th TTC Meeting", type: "admin" },
            { day: 29, title: "D&WC Meeting / DD/M.Tech/MBA – Last date for submission of Project grades", type: "admin" },
            { day: 30, title: "Last date for uploading grades in workflow / Faculty Vacation Commences", type: "deadline", important: true },
        ]
    },
    "2026-06": {
        name: "June", year: 2026, workingDays: 2,
        events: [
            { day: 1, title: "BAC Meeting / Enrollment of DD/M.Tech project", type: "admin" },
            { day: 3, title: "PA&SC Meeting", type: "admin" },
            { day: 4, title: "BAR Meeting", type: "admin" },
            { day: 5, title: "Degree Distribution Programme for International Students / B.Tech/M.S. Last date for Submission of Project grade", type: "academic" },
            { day: 6, title: "SENATE Meeting", type: "admin" },
            { day: 8, title: "HoD Meeting", type: "admin" },
            { day: 10, title: "Last date for submission report by project extn. Students", type: "deadline" },
            { day: 12, title: "SENATE Meeting", type: "admin" },
            { day: 15, title: "Last date for conducting Viva for project extn. Students", type: "deadline" },
            { day: 17, title: "Last date for submission of Project grades for project extension students", type: "deadline" },
            { day: 23, title: "Project grades submission deadline", type: "deadline" },
            { day: 24, title: "End of MS/PhD Selection Process", type: "deadline" },
            { day: 26, title: "Muharram", type: "holiday" },
            { day: 30, title: "Last date for uploading grades in workflow / Faculty Vacation Commences", type: "deadline" },
        ]
    }
};

// --- Event type config ---
const EVENT_TYPES = {
    academic: { label: "Academic", color: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500", icon: GraduationCap },
    exam: { label: "Examination", color: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500", icon: Clock },
    deadline: { label: "Deadline", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500", icon: AlertTriangle },
    holiday: { label: "Holiday", color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500", icon: Star },
    event: { label: "Event", color: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-500", icon: Users },
    admin: { label: "Administrative", color: "bg-slate-100 text-slate-700 border-slate-200", dot: "bg-slate-500", icon: FlaskConical },
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
const CalendarGrid = ({ monthKey }) => {
    const data = CALENDAR_DATA[monthKey];
    const [year, monthStr] = monthKey.split("-");
    const month = parseInt(monthStr);
    const daysInMonth = getDaysInMonth(parseInt(year), month);
    const firstDay = getFirstDayOfMonth(parseInt(year), month);
    const [selectedDay, setSelectedDay] = useState(null);

    const eventsByDay = {};
    data.events.forEach(e => {
        if (!eventsByDay[e.day]) eventsByDay[e.day] = [];
        eventsByDay[e.day].push(e);
    });

    const cells = [];
    for (let i = 0; i < firstDay; i++) {
        cells.push(<div key={`empty-${i}`} className="h-24 md:h-28" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = eventsByDay[day] || [];
        const isWeekend = new Date(parseInt(year), month - 1, day).getDay() === 0 || new Date(parseInt(year), month - 1, day).getDay() === 6;
        const hasHoliday = dayEvents.some(e => e.type === "holiday");
        const hasImportant = dayEvents.some(e => e.important);
        const isSelected = selectedDay === day;

        cells.push(
            <motion.div
                key={day}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`h-24 md:h-28 rounded-xl border cursor-pointer transition-all duration-200 p-2 flex flex-col relative overflow-hidden group
          ${hasHoliday ? 'bg-green-50/80 border-green-200/60' : isWeekend ? 'bg-slate-50/80 border-slate-200/40' : 'bg-white border-slate-200/60'}
          ${isSelected ? 'ring-2 ring-[#b45309] shadow-lg shadow-orange-100' : 'hover:shadow-md hover:border-[#b45309]/30'}
          ${hasImportant ? 'border-l-[3px] border-l-[#b45309]' : ''}
        `}
            >
                <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${hasHoliday ? 'text-green-700' : isWeekend ? 'text-slate-400' : 'text-[#1f2937]'}`}>
                        {day}
                    </span>
                    {dayEvents.length > 0 && (
                        <div className="flex gap-0.5">
                            {[...new Set(dayEvents.map(e => e.type))].slice(0, 3).map((type, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${EVENT_TYPES[type]?.dot || 'bg-slate-300'}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex-1 overflow-hidden space-y-0.5">
                    {dayEvents.slice(0, 2).map((event, i) => (
                        <div key={i} className={`text-[10px] leading-tight font-medium px-1 py-0.5 rounded truncate ${EVENT_TYPES[event.type]?.color || 'bg-slate-100 text-slate-600'}`}>
                            {event.title.length > 30 ? event.title.substring(0, 28) + '…' : event.title}
                        </div>
                    ))}
                    {dayEvents.length > 2 && (
                        <div className="text-[10px] text-[#b45309] font-bold px-1">+{dayEvents.length - 2} more</div>
                    )}
                </div>
            </motion.div>
        );
    }

    const selectedEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];

    return (
        <div>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                {DAY_NAMES.map(d => (
                    <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider py-2">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
                {cells}
            </div>

            {/* Selected day detail panel */}
            {selectedDay && selectedEvents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-lg shadow-slate-100/50"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#b45309]/10 flex items-center justify-center">
                            <CalendarIcon size={20} className="text-[#b45309]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1f2937] text-lg">{data.name} {selectedDay}, {data.year}</h4>
                            <p className="text-slate-500 text-sm">{selectedEvents.length} event{selectedEvents.length > 1 ? 's' : ''}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {selectedEvents.map((event, i) => {
                            const typeConfig = EVENT_TYPES[event.type] || EVENT_TYPES.admin;
                            const IconComponent = typeConfig.icon;
                            return (
                                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${typeConfig.color} transition-all hover:shadow-sm`}>
                                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeConfig.color}`}>
                                        <IconComponent size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm leading-snug">{event.title}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${typeConfig.color} px-2 py-0.5 rounded-full border`}>
                                                {typeConfig.label}
                                            </span>
                                            {event.important && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full">
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
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 shadow-lg shadow-slate-100/30">
            <h3 className="font-bold text-[#1f2937] text-lg mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-[#b45309]" />
                Key Dates
            </h3>
            <div className="space-y-2.5">
                {importantEvents.slice(0, 8).map((event, i) => {
                    const typeConfig = EVENT_TYPES[event.type] || EVENT_TYPES.admin;
                    return (
                        <div key={i} className="flex items-center gap-3 group">
                            <div className="text-center shrink-0 w-10">
                                <div className="text-lg font-black text-[#1f2937] leading-none">{event.day}</div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase">{data.name.substring(0, 3)}</div>
                            </div>
                            <div className={`w-1 h-8 rounded-full ${typeConfig.dot} shrink-0`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1f2937] truncate group-hover:text-[#b45309] transition-colors">
                                    {event.title.length > 50 ? event.title.substring(0, 48) + '…' : event.title}
                                </p>
                                <span className={`text-[10px] font-bold uppercase tracking-wider`}>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 text-[#1f2937] font-sans relative overflow-hidden">

            {/* --- BACKGROUND LAYER: Glows (these stay unmasked) --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#b45309]/[0.06] rounded-full blur-[120px]"></div>
                <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/[0.04] rounded-full blur-[140px]"></div>
            </div>

            {/* --- BACKGROUND LAYER: Pattern & SVGs (Masked to fade out at bottom) --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)' }}>

                {/* Dot Grid */}
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#94a3b8_4px,transparent_4px)] [background-size:40px_40px]"></div>

                {/* Floating Chemistry & Calendar SVGs */}
                {/* Chemistry Hexagon - top left */}
                <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="absolute top-[10%] left-[-5%] z-[1] opacity-[0.05] pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" />
                        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeDasharray="2 2" />
                    </svg>
                </motion.div>

                {/* Benzene Ring - bottom right */}
                <motion.div style={{ y: panDownSlow, rotate: rotateReverse }} className="absolute bottom-[8%] right-[0%] z-[1] opacity-[0.04] pointer-events-none">
                    <svg width="320" height="320" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
                        <line x1="50" y1="18" x2="50" y2="34" />
                        <line x1="79" y1="35" x2="65" y2="43" />
                        <line x1="79" y1="65" x2="65" y2="57" />
                        <line x1="50" y1="82" x2="50" y2="66" />
                        <line x1="21" y1="65" x2="35" y2="57" />
                        <line x1="21" y1="35" x2="35" y2="43" />
                        <circle cx="50" cy="50" r="18" strokeDasharray="3 3" />
                    </svg>
                </motion.div>

                {/* Calendar Grid - mid right */}
                <motion.div style={{ y: panUpSlow, rotate: rotateSlow }} className="absolute top-[45%] right-[-4%] z-[1] opacity-[0.04] pointer-events-none">
                    <svg width="300" height="300" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <rect x="10" y="20" width="80" height="70" rx="6" />
                        <line x1="10" y1="38" x2="90" y2="38" />
                        <line x1="28" y1="20" x2="28" y2="10" />
                        <line x1="50" y1="20" x2="50" y2="10" />
                        <line x1="72" y1="20" x2="72" y2="10" />
                        <line x1="37" y1="38" x2="37" y2="90" strokeDasharray="2 2" />
                        <line x1="63" y1="38" x2="63" y2="90" strokeDasharray="2 2" />
                        <line x1="10" y1="55" x2="90" y2="55" strokeDasharray="2 2" />
                        <line x1="10" y1="72" x2="90" y2="72" strokeDasharray="2 2" />
                    </svg>
                </motion.div>

                {/* Small Molecule - mid left */}
                <motion.div style={{ y: panDownSlow, rotate: rotateReverse }} className="absolute top-[65%] left-[2%] z-[1] opacity-[0.05] pointer-events-none">
                    <svg width="220" height="220" viewBox="0 0 100 100" stroke="#0f172a" fill="none" strokeWidth="0.5">
                        <circle cx="50" cy="30" r="6" />
                        <circle cx="30" cy="60" r="6" />
                        <circle cx="70" cy="60" r="6" />
                        <circle cx="50" cy="85" r="5" />
                        <line x1="50" y1="36" x2="33" y2="55" />
                        <line x1="50" y1="36" x2="67" y2="55" />
                        <line x1="36" y1="62" x2="64" y2="62" />
                        <line x1="50" y1="80" x2="35" y2="66" />
                        <line x1="50" y1="80" x2="65" y2="66" />
                    </svg>
                </motion.div>
            </div>

            {/* Hero Header — matches site's institutional light style with a soft fade transition */}
            <section className="relative bg-white overflow-visible">
                <div className="absolute top-[-30%] right-[-15%] w-[45vw] h-[45vw] bg-[#b45309]/[0.04] rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[30vw] h-[30vw] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

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

                {/* Soft Gradient Transition into the background */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent translate-y-full pointer-events-none z-0" />
            </section>

            {/* Main Content */}
            < div className="container mx-auto px-6 max-w-7xl py-12" >

                {/* Month Navigation */}
                < motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
                            disabled={currentMonthIndex === 0}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-[#b45309]/10 hover:border-[#b45309]/30 hover:text-[#b45309] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight min-w-[200px] text-center">
                            {monthData.name} <span className="text-[#b45309]">{monthData.year}</span>
                        </h2>
                        <button
                            onClick={() => setCurrentMonthIndex(Math.min(MONTH_KEYS.length - 1, currentMonthIndex + 1))}
                            disabled={currentMonthIndex === MONTH_KEYS.length - 1}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-[#b45309]/10 hover:border-[#b45309]/30 hover:text-[#b45309] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                        {MONTH_KEYS.map((key, idx) => (
                            <button
                                key={key}
                                onClick={() => setCurrentMonthIndex(idx)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${idx === currentMonthIndex
                                    ? 'bg-[#1f2937] text-white shadow-md'
                                    : 'text-slate-500 hover:text-[#b45309] hover:bg-orange-50'
                                    }`}
                            >
                                {CALENDAR_DATA[key].name.substring(0, 3)}
                            </button>
                        ))}
                    </div>
                </motion.div >

                {/* Legend */}
                < motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-8"
                >
                    {
                        Object.entries(EVENT_TYPES).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => setActiveFilter(activeFilter === key ? "all" : key)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all duration-200 ${activeFilter === key
                                    ? `${config.color} ring-2 ring-offset-1 ring-current shadow-sm`
                                    : `${config.color} opacity-60 hover:opacity-100`
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                                {config.label}
                            </button>
                        ))
                    }
                    {
                        activeFilter !== "all" && (
                            <button
                                onClick={() => setActiveFilter("all")}
                                className="text-[11px] font-bold text-slate-500 hover:text-[#b45309] transition-colors uppercase tracking-wider px-2"
                            >
                                ✕ Clear
                            </button>
                        )
                    }
                </motion.div >

                {/* Grid Layout */}
                < div className="grid grid-cols-1 lg:grid-cols-12 gap-8" >
                    {/* Calendar */}
                    < motion.div
                        key={monthKey}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-9"
                    >
                        <CalendarGrid monthKey={monthKey} />
                    </motion.div >

                    {/* Sidebar */}
                    < div className="lg:col-span-3 space-y-6" >
                        {/* Stats Card */}
                        < div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 shadow-lg shadow-slate-100/30" >
                            <h3 className="font-bold text-[#1f2937] text-lg mb-4 flex items-center gap-2">
                                <CalendarIcon size={18} className="text-[#b45309]" />
                                Month Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Working Days</span>
                                    <span className="text-lg font-black text-[#1f2937]">{monthData.workingDays}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Total Events</span>
                                    <span className="text-lg font-black text-[#b45309]">{monthData.events.length}</span>
                                </div>
                                <div className="h-px bg-slate-100 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Holidays</span>
                                    <span className="font-bold text-green-600">{monthData.events.filter(e => e.type === "holiday").length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Exams</span>
                                    <span className="font-bold text-amber-600">{monthData.events.filter(e => e.type === "exam").length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Deadlines</span>
                                    <span className="font-bold text-red-600">{monthData.events.filter(e => e.type === "deadline").length}</span>
                                </div>
                            </div>
                        </div >

                        {/* Key Dates */}
                        < UpcomingEvents monthKey={monthKey} />
                    </div >
                </div >

                {/* Abbreviations Footer */}
                < motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white border border-slate-200 rounded-2xl p-8"
                >
                    <h3 className="font-bold text-[#1f2937] text-lg mb-4">Abbreviations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm text-slate-500">
                        <div><strong className="text-slate-700">BAC</strong> – Board of Academic Courses</div>
                        <div><strong className="text-slate-700">BAR</strong> – Board of Academic Research</div>
                        <div><strong className="text-slate-700">PA&SC</strong> – Prizes, Awards & Scholarship Committee</div>
                        <div><strong className="text-slate-700">D&WC</strong> – Disciplinary & Welfare Committee</div>
                        <div><strong className="text-slate-700">MoU</strong> – Memorandum of Understanding</div>
                        <div><strong className="text-slate-700">IEC</strong> – Institutional Ethics Committee</div>
                        <div><strong className="text-slate-700">GATE</strong> – Graduate Aptitude Test in Engineering</div>
                        <div><strong className="text-slate-700">JAM</strong> – Joint Admission</div>
                        <div><strong className="text-slate-700">JEE (Adv)</strong> – Joint Entrance Examination (Advanced)</div>
                        <div><strong className="text-slate-700">TTC</strong> – Time Table Committee</div>
                        <div><strong className="text-slate-700">TCF</strong> – Teacher Course Feedback</div>
                        <div><strong className="text-slate-700">TA</strong> – Teaching Assistant</div>
                        <div><strong className="text-slate-700">Suppl</strong> – Supplementary</div>
                        <div><strong className="text-slate-700">DD</strong> – Dual Degree</div>
                        <div><strong className="text-slate-700">KR-IR</strong> – KR-IR Awards</div>
                    </div>
                </motion.div >
            </div >
        </div >
    );
};

export default Calendar;
