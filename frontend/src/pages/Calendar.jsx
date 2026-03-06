import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, GraduationCap,
  FlaskConical, Users, Clock, Star, AlertTriangle, BookOpen, Table2,
  Download, ExternalLink, X, ChevronDown
} from 'lucide-react';

// ──────────────────────────────────────────────────
// ACTUAL IIT MADRAS ACADEMIC CALENDAR — JAN–JUN 2026
// Source: IIT Madras Academic Calendar Jan–May 2026 v1
// ──────────────────────────────────────────────────

const CALENDAR_DATA = {
  "2026-01": {
    name: "January", year: 2026, workingDays: 9,
    events: [
      { day: 2, title: "SHASTRA — Tech fest begins", type: "event" },
      { day: 3, title: "SHASTRA", type: "event" },
      { day: 4, title: "SHASTRA", type: "event" },
      { day: 5, title: "SHASTRA / HoD Meeting / M.S./Ph.D. Admission dates / ADD/DROP courses begins", type: "admin" },
      { day: 6, title: "SHASTRA ends", type: "event" },
      { day: 7, title: "Make up / Suppl. Exam – C/M slots / KR-IR Award Application Portal opens", type: "exam" },
      { day: 8, title: "SAARANG / Make up / Suppl. Exam – D/F slots", type: "event" },
      { day: 9, title: "SAARANG / Make up / Suppl. Exam – E/K slots", type: "event" },
      { day: 10, title: "SAARANG / Make up / Suppl. Exam – J/L slots", type: "event" },
      { day: 11, title: "SAARANG ends", type: "event" },
      { day: 12, title: "SAARANG / Last date for fee payment (Jan–May 2026) / Make up / Suppl. Exam – A/G slots / Faculty vacation ends", type: "deadline" },
      { day: 13, title: "Make up / Suppl. Exam – B/H slots", type: "exam" },
      { day: 14, title: "Makar Sankranti / Pongal", type: "holiday" },
      { day: 15, title: "Pongal", type: "holiday" },
      { day: 19, title: "Enrollment at Department / Commencement of Classes", type: "academic", important: true },
      { day: 20, title: "Last date for Enrollment with fine", type: "deadline" },
      { day: 21, title: "D&WC Meeting", type: "admin" },
      { day: 22, title: "Class Committee Week begins", type: "academic" },
      { day: 23, title: "Class Committee Week", type: "academic" },
      { day: 24, title: "End of KR-IR Award Application Shortlisting Process", type: "deadline" },
      { day: 26, title: "Republic Day", type: "holiday" },
      { day: 27, title: "Last date for sending make up / supplementary grades", type: "deadline" },
      { day: 29, title: "1st TTC Meeting", type: "admin" },
      { day: 31, title: "KR-IR Award Application Portal Closes", type: "deadline" },
    ]
  },
  "2026-02": {
    name: "February", year: 2026, workingDays: 19,
    events: [
      { day: 2, title: "BAR Meeting", type: "admin" },
      { day: 5, title: "BAC Meeting", type: "admin" },
      { day: 6, title: "PA&SC Meeting / E-Summit — Non-Instructional Day", type: "admin" },
      { day: 7, title: "GATE 2026 / E-Summit", type: "exam" },
      { day: 8, title: "GATE 2026 / E-Summit", type: "exam" },
      { day: 9, title: "HoD Meeting", type: "admin" },
      { day: 10, title: "MoU sub-committee", type: "admin" },
      { day: 12, title: "Last date for handing over Quiz I question papers", type: "deadline" },
      { day: 14, title: "GATE 2026", type: "exam" },
      { day: 15, title: "GATE 2026 & JAM 2026", type: "exam" },
      { day: 18, title: "Quiz-I — C/J slots", type: "exam", important: true },
      { day: 19, title: "Quiz-I — E/L slots", type: "exam" },
      { day: 20, title: "Quiz-I — F/K slots", type: "exam" },
      { day: 21, title: "Idul Fitr (Eid-ul-Fitr)", type: "holiday" },
      { day: 23, title: "Quiz-I — A slot", type: "exam" },
      { day: 24, title: "Quiz-I — B/M slots", type: "exam" },
      { day: 25, title: "Quiz-I — G slot (Interchange of C & G slots)", type: "exam" },
      { day: 26, title: "Quiz-I — D slot (Interchange of E & D slots)", type: "exam" },
      { day: 27, title: "SENATE Meeting / 2nd TTC Meeting", type: "admin" },
      { day: 28, title: "End of KR-IR Award Application Shortlisting Process", type: "deadline" },
    ]
  },
  "2026-03": {
    name: "March", year: 2026, workingDays: 20,
    events: [
      { day: 1, title: "Presentation by KR-IR Award Shortlisted Candidates", type: "academic" },
      { day: 2, title: "Polling Week 2026 begins", type: "event" },
      { day: 4, title: "Holi — Non-Instructional Day", type: "holiday" },
      { day: 9, title: "Publication of names of KR-IR Award winners", type: "academic" },
      { day: 10, title: "Last date for handing over Quiz II question papers", type: "deadline" },
      { day: 14, title: "HoD Meeting", type: "admin" },
      { day: 16, title: "Last date for dropping of courses", type: "deadline", important: true },
      { day: 18, title: "Quiz-II — C/J slots", type: "exam", important: true },
      { day: 19, title: "Quiz-II — D slot (Interchange of E & D slots)", type: "exam" },
      { day: 20, title: "Quiz-II — F/K slots", type: "exam" },
      { day: 22, title: "Quiz-II — A/H slots", type: "exam" },
      { day: 24, title: "Quiz-II — B/M slots", type: "exam" },
      { day: 25, title: "Quiz-II — C/U slots", type: "exam" },
      { day: 26, title: "Quiz-II — E/L slots", type: "exam" },
      { day: 27, title: "Quiz-II — G slot (Interchange of F & G) / Distribution of KR-IR Awards", type: "exam" },
      { day: 30, title: "M.S./Ph.D. Admission — Last Date of Application Submission", type: "deadline", important: true },
      { day: 31, title: "Mahavir Jayanthi", type: "holiday" },
    ]
  },
  "2026-04": {
    name: "April", year: 2026, workingDays: 20,
    events: [
      { day: 1, title: "Start of M.S./Ph.D. Selection Process", type: "academic", important: true },
      { day: 3, title: "Good Friday", type: "holiday" },
      { day: 5, title: "HoD Meeting", type: "admin" },
      { day: 7, title: "Last date for handing over Quiz III question papers", type: "deadline" },
      { day: 8, title: "Registration Week begins", type: "academic", important: true },
      { day: 10, title: "3rd TTC Meeting", type: "admin" },
      { day: 12, title: "Class Committee Week", type: "academic" },
      { day: 13, title: "Last date for dropping of courses with W grade", type: "deadline" },
      { day: 14, title: "Tamil New Year's Day / Dr. B.R. Ambedkar Birthday", type: "holiday" },
      { day: 21, title: "Idul Zuha (Bakrid)", type: "holiday" },
      { day: 27, title: "M.S./Ph.D. Admission — Last Date / TCF Link Opens", type: "deadline" },
      { day: 29, title: "4th TTC Meeting", type: "admin" },
      { day: 30, title: "Last date for dropping of courses", type: "deadline" },
    ]
  },
  "2026-05": {
    name: "May", year: 2026, workingDays: 20,
    events: [
      { day: 1, title: "Buddha Purnima / May Day", type: "holiday" },
      { day: 4, title: "HoD Meeting / TCF Link Closes", type: "admin" },
      { day: 5, title: "Last Instructional Day / Compilation of attendance / MoU sub-committee", type: "academic", important: true },
      { day: 7, title: "End Semester Exam — Slot A", type: "exam", important: true },
      { day: 8, title: "End Semester Exam — Slot B", type: "exam" },
      { day: 9, title: "End Semester Exam — Slot H/J", type: "exam" },
      { day: 10, title: "End Semester Exam — Slot K/L", type: "exam" },
      { day: 11, title: "End Semester Exam — Slot D", type: "exam" },
      { day: 12, title: "End Semester Exam — Slot E", type: "exam" },
      { day: 13, title: "End Semester Exam — Slot F", type: "exam" },
      { day: 14, title: "End Semester Exam — Slot G", type: "exam" },
      { day: 15, title: "End Semester Exam — Slot M", type: "exam" },
      { day: 16, title: "End Semester Exam — Slot C", type: "exam" },
      { day: 17, title: "Student Vacation commences", type: "holiday", important: true },
      { day: 18, title: "D&WC Meeting", type: "admin" },
      { day: 19, title: "B.Tech/M.Sc. Last date for Submission of Project Report", type: "deadline" },
      { day: 20, title: "DDM Test / MBA — Last date for conducting viva / End of M.S./Ph.D. Selection Process", type: "deadline" },
      { day: 21, title: "Class Committee Week", type: "academic" },
      { day: 25, title: "Closing of Graduates list for Convocation 2026", type: "deadline" },
      { day: 26, title: "Muharram", type: "holiday" },
      { day: 27, title: "Idul Zuha (Bakrid)", type: "holiday" },
      { day: 28, title: "5th TTC Meeting", type: "admin" },
      { day: 29, title: "D&WC Meeting / DD/M.Tech/MBA — Last date for Submission of Project grades", type: "admin" },
      { day: 30, title: "Last date for uploading grades in workflow / Faculty Vacation Commences", type: "deadline", important: true },
    ]
  },
  "2026-06": {
    name: "June", year: 2026, workingDays: 0,
    events: [
      { day: 1, title: "BAC Meeting / Enrollment of DD/M.Tech project students", type: "admin" },
      { day: 3, title: "PA&SC Meeting", type: "admin" },
      { day: 4, title: "BAR Meeting", type: "admin" },
      { day: 5, title: "Degree Distribution Programme for International Students / B.Tech/M.S. Last date for Submission of Project grade", type: "academic" },
      { day: 6, title: "SENATE Meeting", type: "admin" },
      { day: 8, title: "HoD Meeting", type: "admin" },
      { day: 10, title: "Last date for submission of report by project extension students", type: "deadline" },
      { day: 12, title: "SENATE Meeting", type: "admin" },
      { day: 15, title: "Last date for conducting Viva for project extension students", type: "deadline" },
      { day: 17, title: "Last date for submission of project grades for project extension students", type: "deadline" },
      { day: 23, title: "Project grades submission deadline", type: "deadline" },
      { day: 24, title: "End of M.S./Ph.D. Selection Process", type: "deadline" },
      { day: 26, title: "Muharram", type: "holiday" },
      { day: 30, title: "Faculty Vacation Continues", type: "admin" },
    ]
  }
};

// ──────────────────────────────────────────────────
// TIMETABLE — Chemistry Department, IIT Madras
// Jan–May 2026 Semester
// ──────────────────────────────────────────────────

const TIMETABLE_DATA = {
  ug: {
    label: "Undergraduate (BS)",
    semesters: [
      {
        name: "Semester 2",
        courses: [
          { code: "CY1002", title: "Organic Chemistry I", slot: "D", credits: 3, instructor: "Prof. Baskaran S.", venue: "CRC 102" },
          { code: "CY1012", title: "Chemistry Lab I", slot: "L1", credits: 2, instructor: "Multiple Faculty", venue: "UG Lab" },
        ]
      },
      {
        name: "Semester 4",
        courses: [
          { code: "CY2002", title: "Inorganic Chemistry I", slot: "C", credits: 3, instructor: "Prof. Dillip K. Chand", venue: "CRC 103" },
          { code: "CY2004", title: "Physical Chemistry II", slot: "E", credits: 3, instructor: "Prof. Edamana Prasad", venue: "CRC 102" },
          { code: "CY2012", title: "Chemistry Lab III", slot: "L3", credits: 3, instructor: "Multiple Faculty", venue: "UG Lab" },
        ]
      },
      {
        name: "Semester 6",
        courses: [
          { code: "CY3002", title: "Organic Chemistry III", slot: "B", credits: 3, instructor: "Prof. Beeraiah Baire", venue: "CB 310" },
          { code: "CY3004", title: "Quantum Chemistry", slot: "F", credits: 3, instructor: "Prof. Arti Dua", venue: "CB 310" },
          { code: "CY3012", title: "Advanced Chemistry Lab", slot: "L5", credits: 4, instructor: "Multiple Faculty", venue: "Adv. Lab" },
        ]
      },
      {
        name: "Semester 8",
        courses: [
          { code: "CY4092", title: "BS Project II", slot: "Project", credits: 12, instructor: "Faculty Advisor", venue: "Research Lab" },
        ]
      }
    ]
  },
  pg: {
    label: "Postgraduate (M.Sc)",
    semesters: [
      {
        name: "Semester 2",
        courses: [
          { code: "CY5220", title: "Advanced Organic Synthesis", slot: "A", credits: 3, instructor: "Prof. Anbarasan P.", venue: "CB 310" },
          { code: "CY5230", title: "Coordination Chemistry", slot: "G", credits: 3, instructor: "Prof. Sundargopal Ghosh", venue: "CB 310" },
          { code: "CY5240", title: "Chemical Kinetics & Catalysis", slot: "J", credits: 3, instructor: "Prof. Kothandaraman R.", venue: "CB 310" },
          { code: "CY5210", title: "Spectroscopic Methods in Chemistry", slot: "H", credits: 3, instructor: "Prof. Sanjay Kumar", venue: "CB 310" },
          { code: "CY5290", title: "M.Sc Lab II", slot: "L2", credits: 6, instructor: "Multiple Faculty", venue: "PG Lab" },
        ]
      },
      {
        name: "Semester 4",
        courses: [
          { code: "CY5490", title: "M.Sc Project", slot: "Project", credits: 18, instructor: "Faculty Advisor", venue: "Research Lab" },
        ]
      }
    ]
  },
  phd: {
    label: "Graduate (Ph.D)",
    semesters: [
      {
        name: "Coursework",
        courses: [
          { code: "CY6010", title: "Advanced Topics in Organic Chemistry", slot: "K", credits: 3, instructor: "Prof. Muraleedharan K.M.", venue: "CB 310" },
          { code: "CY6020", title: "Advanced Topics in Inorganic Chemistry", slot: "L", credits: 3, instructor: "Prof. Arnab Rit", venue: "CB 310" },
          { code: "CY6030", title: "Advanced Topics in Physical Chemistry", slot: "M", credits: 3, instructor: "Prof. Debashis Chakraborty", venue: "CB 310" },
          { code: "CY6170", title: "Research Methodology & Ethics", slot: "F", credits: 2, instructor: "Prof. Bhyrappa P.", venue: "CB 310" },
        ]
      }
    ]
  }
};

const SLOT_SCHEDULE = {
  'A': { days: 'Mon,Thu', time: '8:00–8:50 AM' },
  'B': { days: 'Mon,Thu', time: '9:00–9:50 AM' },
  'C': { days: 'Mon,Thu', time: '10:00–10:50 AM' },
  'D': { days: 'Mon,Thu', time: '11:00–11:50 AM' },
  'E': { days: 'Tue,Fri', time: '8:00–8:50 AM' },
  'F': { days: 'Tue,Fri', time: '9:00–9:50 AM' },
  'G': { days: 'Tue,Fri', time: '10:00–10:50 AM' },
  'H': { days: 'Wed,Sat', time: '8:00–8:50 AM' },
  'J': { days: 'Wed,Sat', time: '9:00–9:50 AM' },
  'K': { days: 'Wed,Sat', time: '10:00–10:50 AM' },
  'L': { days: 'Wed,Sat', time: '11:00–11:50 AM' },
  'M': { days: 'Mon–Fri', time: '12:00–12:50 PM' },
};

// ──── Configs ────
const EVENT_TYPES = {
  academic: { label: "Academic", color: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", icon: GraduationCap },
  exam: { label: "Examination", color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", icon: Clock },
  deadline: { label: "Deadline", color: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", icon: AlertTriangle },
  holiday: { label: "Holiday", color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", icon: Star },
  event: { label: "Event", color: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500", icon: Users },
  admin: { label: "Administrative", color: "bg-slate-50 text-slate-700 border-slate-200", dot: "bg-slate-400", icon: FlaskConical },
};

const MONTH_KEYS = Object.keys(CALENDAR_DATA);
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

// ──── Calendar Grid ────
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

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === parseInt(year) && today.getMonth() === month - 1;
  const todayDate = today.getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="h-20 sm:h-24 md:h-28" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = eventsByDay[day] || [];
    const isWeekend = new Date(parseInt(year), month - 1, day).getDay() === 0 || new Date(parseInt(year), month - 1, day).getDay() === 6;
    const hasHoliday = dayEvents.some(e => e.type === "holiday");
    const hasImportant = dayEvents.some(e => e.important);
    const isSelected = selectedDay === day;
    const isToday = isCurrentMonth && day === todayDate;

    cells.push(
      <motion.div
        key={day}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedDay(isSelected ? null : day)}
        className={`h-20 sm:h-24 md:h-28 rounded-xl border cursor-pointer transition-all duration-200 p-1.5 sm:p-2 flex flex-col relative overflow-hidden
          ${hasHoliday ? 'bg-emerald-50/90 border-emerald-200/60' : isWeekend ? 'bg-slate-50/80 border-slate-200/40' : 'bg-white border-slate-200/60'}
          ${isSelected ? 'ring-2 ring-[#7b1113] shadow-lg shadow-red-100/50 z-10' : 'hover:shadow-md hover:border-[#7b1113]/30'}
          ${hasImportant ? 'border-l-[3px] border-l-[#7b1113]' : ''}
          ${isToday ? 'ring-2 ring-[#7b1113]/40' : ''}
        `}
      >
        {isToday && <div className="absolute top-0 right-0 w-0 h-0 border-t-[18px] border-t-[#7b1113] border-l-[18px] border-l-transparent" />}
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-[#7b1113]' : hasHoliday ? 'text-emerald-700' : isWeekend ? 'text-slate-400' : 'text-[#1f2937]'}`}>
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
            <div key={i} className={`text-[9px] sm:text-[10px] leading-tight font-medium px-1 py-0.5 rounded truncate ${EVENT_TYPES[event.type]?.color || 'bg-slate-100 text-slate-600'}`}>
              {event.title.length > 25 ? event.title.substring(0, 23) + '...' : event.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-[9px] sm:text-[10px] text-[#7b1113] font-bold px-1">+{dayEvents.length - 2} more</div>
          )}
        </div>
      </motion.div>
    );
  }

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-1.5 sm:py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells}
      </div>

      {/* Selected day detail */}
      <AnimatePresence>
        {selectedDay && selectedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-6 bg-white border border-[#e8e0d4] rounded-2xl p-5 sm:p-6 shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7b1113]/10 flex items-center justify-center">
                  <CalendarIcon size={20} className="text-[#7b1113]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1f2937] text-lg">{data.name} {selectedDay}, {data.year}</h4>
                  <p className="text-slate-500 text-sm">{selectedEvents.length} event{selectedEvents.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
                <X size={16} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedEvents.map((event, i) => {
                const typeConfig = EVENT_TYPES[event.type] || EVENT_TYPES.admin;
                const IconComponent = typeConfig.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${typeConfig.color} transition-all hover:shadow-sm`}
                  >
                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeConfig.color}`}>
                      <IconComponent size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-snug">{event.title}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${typeConfig.color} px-2 py-0.5 rounded-full border`}>
                          {typeConfig.label}
                        </span>
                        {event.important && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">
                            Important
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ──── Key Dates Sidebar ────
const KeyDates = ({ monthKey }) => {
  const data = CALENDAR_DATA[monthKey];
  const importantEvents = data.events.filter(e => e.important || e.type === "deadline" || e.type === "holiday");

  if (importantEvents.length === 0) return null;

  return (
    <div className="bg-white border border-[#e8e0d4] rounded-2xl p-5 sm:p-6">
      <h3 className="font-bold text-[#1a1a1a] text-base mb-4 flex items-center gap-2">
        <AlertTriangle size={16} className="text-[#7b1113]" />
        Key Dates
      </h3>
      <div className="space-y-2.5">
        {importantEvents.slice(0, 10).map((event, i) => {
          const typeConfig = EVENT_TYPES[event.type] || EVENT_TYPES.admin;
          return (
            <div key={i} className="flex items-center gap-3 group">
              <div className="text-center shrink-0 w-9">
                <div className="text-base font-black text-[#1a1a1a] leading-none">{event.day}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase">{data.name.substring(0, 3)}</div>
              </div>
              <div className={`w-0.5 h-7 rounded-full ${typeConfig.dot} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#1a1a1a] leading-snug group-hover:text-[#7b1113] transition-colors">
                  {event.title.length > 45 ? event.title.substring(0, 43) + '...' : event.title}
                </p>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
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

// ──── Timetable Component ────
const TimetableSection = () => {
  const [activeTab, setActiveTab] = useState('ug');
  const data = TIMETABLE_DATA[activeTab];

  return (
    <section className="mt-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Table2 size={20} className="text-[#7b1113]" />
            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Course Timetable</h2>
          </div>
          <p className="text-sm text-[#888]">Jan–May 2026 Semester &middot; Department of Chemistry</p>
        </div>
        <a
          href="https://www.iitm.ac.in/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#7b1113] text-white rounded-xl text-sm font-semibold hover:bg-[#601012] transition-colors"
        >
          <Download size={14} /> Full Timetable PDF
        </a>
      </div>

      {/* Program tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.entries(TIMETABLE_DATA).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeTab === key
                ? 'bg-[#7b1113] text-white shadow-md'
                : 'bg-white border border-[#e8e0d4] text-[#555] hover:border-[#7b1113]/25 hover:text-[#7b1113]'
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Course tables */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {data.semesters.map((sem, si) => (
            <div key={si} className="bg-white border border-[#e8e0d4] rounded-2xl overflow-hidden">
              <div className="bg-[#faf8f4] border-b border-[#e8e0d4] px-5 py-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1a1a1a] flex items-center gap-2">
                  <BookOpen size={14} className="text-[#7b1113]" />
                  {sem.name}
                </h3>
                <span className="text-[11px] text-[#999] font-medium">{sem.courses.length} course{sem.courses.length > 1 ? 's' : ''}</span>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e0d4] text-left">
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Code</th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Course Title</th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Slot</th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Schedule</th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Credits</th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Instructor</th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#999]">Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.courses.map((course, ci) => {
                      const schedule = SLOT_SCHEDULE[course.slot] || { days: '—', time: '—' };
                      return (
                        <tr key={ci} className="border-b border-[#f0ede8] last:border-0 hover:bg-[#faf8f4] transition-colors">
                          <td className="px-5 py-3.5">
                            <span className="font-mono font-bold text-[#7b1113] text-xs bg-[#7b1113]/5 px-2 py-1 rounded-lg">{course.code}</span>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-[#1a1a1a]">{course.title}</td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a1a1a] text-white text-xs font-bold">{course.slot}</span>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-[#555]">
                            {course.slot.startsWith('L') || course.slot === 'Project' ? (
                              <span className="text-[#888]">See dept. schedule</span>
                            ) : (
                              <div>
                                <div className="font-medium">{schedule.days}</div>
                                <div className="text-[#999]">{schedule.time}</div>
                              </div>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <span className="font-bold text-[#1a1a1a]">{course.credits}</span>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-[#555]">{course.instructor}</td>
                          <td className="px-5 py-3.5 text-xs text-[#888]">{course.venue}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-[#f0ede8]">
                {sem.courses.map((course, ci) => {
                  const schedule = SLOT_SCHEDULE[course.slot] || { days: '—', time: '—' };
                  return (
                    <div key={ci} className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-mono font-bold text-[#7b1113] text-xs">{course.code}</span>
                          <h4 className="font-semibold text-sm text-[#1a1a1a] mt-0.5">{course.title}</h4>
                        </div>
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1a1a1a] text-white text-[11px] font-bold shrink-0">{course.slot}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#888]">
                        <span>{course.credits} credits</span>
                        <span>{course.instructor}</span>
                        <span>{course.venue}</span>
                        {!(course.slot.startsWith('L') || course.slot === 'Project') && (
                          <span>{schedule.days}, {schedule.time}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Slot reference */}
      <details className="mt-6 bg-white border border-[#e8e0d4] rounded-2xl overflow-hidden group">
        <summary className="px-5 py-4 cursor-pointer flex items-center justify-between text-sm font-bold text-[#1a1a1a] hover:bg-[#faf8f4] transition-colors">
          <span className="flex items-center gap-2">
            <Clock size={14} className="text-[#7b1113]" />
            Slot Schedule Reference
          </span>
          <ChevronDown size={16} className="text-[#999] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-5 pb-5 border-t border-[#e8e0d4]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
            {Object.entries(SLOT_SCHEDULE).map(([slot, info]) => (
              <div key={slot} className="flex items-center gap-2 p-2 rounded-lg bg-[#faf8f4]">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#1a1a1a] text-white text-xs font-bold shrink-0">{slot}</span>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#1a1a1a]">{info.days}</div>
                  <div className="text-[10px] text-[#999]">{info.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
};

// ──── Main Calendar Page ────
const Calendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(() => {
    // Default to current month if within range
    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const idx = MONTH_KEYS.indexOf(key);
    return idx >= 0 ? idx : 0;
  });
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("calendar");
  const monthKey = MONTH_KEYS[currentMonthIndex];
  const monthData = CALENDAR_DATA[monthKey];

  // Count events by type for the stats
  const eventCounts = useMemo(() => {
    const counts = {};
    Object.keys(EVENT_TYPES).forEach(k => { counts[k] = 0; });
    monthData.events.forEach(e => { counts[e.type] = (counts[e.type] || 0) + 1; });
    return counts;
  }, [monthData]);

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-10 sm:py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">Academics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-3">
            Academic Calendar & Timetable
          </h1>
          <p className="text-[#888] text-sm max-w-2xl leading-relaxed">
            January &ndash; June 2026 &middot; Department of Chemistry, IIT Madras
          </p>

          {/* Tabs */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-[#7b1113] text-white shadow-md'
                  : 'bg-[#faf8f4] border border-[#e8e0d4] text-[#555] hover:border-[#7b1113]/25 hover:text-[#7b1113]'
              }`}
            >
              <CalendarIcon size={16} /> Calendar
            </button>
            <button
              onClick={() => setActiveTab('timetable')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'timetable'
                  ? 'bg-[#7b1113] text-white shadow-md'
                  : 'bg-[#faf8f4] border border-[#e8e0d4] text-[#555] hover:border-[#7b1113]/25 hover:text-[#7b1113]'
              }`}
            >
              <Table2 size={16} /> Timetable
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 sm:py-10 md:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'calendar' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Month Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
                    disabled={currentMonthIndex === 0}
                    className="w-9 h-9 rounded-xl border border-[#e8e0d4] flex items-center justify-center hover:bg-[#7b1113]/10 hover:border-[#7b1113]/30 hover:text-[#7b1113] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight min-w-[180px] text-center">
                    {monthData.name} <span className="text-[#7b1113]">{monthData.year}</span>
                  </h2>
                  <button
                    onClick={() => setCurrentMonthIndex(Math.min(MONTH_KEYS.length - 1, currentMonthIndex + 1))}
                    disabled={currentMonthIndex === MONTH_KEYS.length - 1}
                    className="w-9 h-9 rounded-xl border border-[#e8e0d4] flex items-center justify-center hover:bg-[#7b1113]/10 hover:border-[#7b1113]/30 hover:text-[#7b1113] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-white border border-[#e8e0d4] rounded-xl p-1">
                  {MONTH_KEYS.map((key, idx) => (
                    <button
                      key={key}
                      onClick={() => setCurrentMonthIndex(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        idx === currentMonthIndex
                          ? 'bg-[#7b1113] text-white shadow-sm'
                          : 'text-slate-500 hover:text-[#7b1113] hover:bg-red-50'
                      }`}
                    >
                      {CALENDAR_DATA[key].name.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend / Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(EVENT_TYPES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(activeFilter === key ? "all" : key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border transition-all duration-200 ${
                      activeFilter === key
                        ? `${config.color} ring-2 ring-offset-1 ring-current shadow-sm`
                        : `${config.color} opacity-60 hover:opacity-100`
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    {config.label}
                  </button>
                ))}
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="text-[11px] font-bold text-slate-500 hover:text-[#7b1113] transition-colors uppercase tracking-wider px-2 flex items-center gap-1"
                  >
                    <X size={12} /> Clear
                  </button>
                )}
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Calendar */}
                <motion.div
                  key={monthKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-9"
                >
                  <CalendarGrid monthKey={monthKey} activeFilter={activeFilter} />
                </motion.div>

                {/* Sidebar */}
                <div className="lg:col-span-3 space-y-5">
                  {/* Stats */}
                  <div className="bg-white border border-[#e8e0d4] rounded-2xl p-5 sm:p-6">
                    <h3 className="font-bold text-[#1a1a1a] text-base mb-4 flex items-center gap-2">
                      <CalendarIcon size={16} className="text-[#7b1113]" />
                      Month Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#888]">Working Days</span>
                        <span className="text-lg font-black text-[#1a1a1a]">{monthData.workingDays}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#888]">Total Events</span>
                        <span className="text-lg font-black text-[#7b1113]">{monthData.events.length}</span>
                      </div>
                      <div className="h-px bg-[#e8e0d4] my-1" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#888]">Holidays</span>
                        <span className="font-bold text-emerald-600 text-sm">{eventCounts.holiday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#888]">Exams</span>
                        <span className="font-bold text-amber-600 text-sm">{eventCounts.exam}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#888]">Deadlines</span>
                        <span className="font-bold text-red-600 text-sm">{eventCounts.deadline}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#888]">Academic</span>
                        <span className="font-bold text-blue-600 text-sm">{eventCounts.academic}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Dates */}
                  <KeyDates monthKey={monthKey} />

                  {/* Download */}
                  <div className="bg-[#7b1113] text-white rounded-2xl p-5">
                    <h3 className="text-sm font-bold mb-2">Official Calendar</h3>
                    <p className="text-xs text-white/60 mb-3">Download the complete IIT Madras Academic Calendar PDF</p>
                    <a
                      href="https://www.iitm.ac.in/calendar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#7b1113] rounded-xl text-xs font-semibold hover:bg-red-50 transition-colors"
                    >
                      <ExternalLink size={12} /> Visit IITM Calendar
                    </a>
                  </div>
                </div>
              </div>

              {/* Abbreviations */}
              <div className="mt-12 bg-white border border-[#e8e0d4] rounded-2xl p-6 sm:p-8">
                <h3 className="font-bold text-[#1a1a1a] text-base mb-4">Abbreviations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm text-[#888]">
                  <div><strong className="text-[#555]">BAC</strong> &ndash; Board of Academic Courses</div>
                  <div><strong className="text-[#555]">BAR</strong> &ndash; Board of Academic Research</div>
                  <div><strong className="text-[#555]">PA&SC</strong> &ndash; Prizes, Awards & Scholarship Committee</div>
                  <div><strong className="text-[#555]">D&WC</strong> &ndash; Disciplinary & Welfare Committee</div>
                  <div><strong className="text-[#555]">MoU</strong> &ndash; Memorandum of Understanding</div>
                  <div><strong className="text-[#555]">GATE</strong> &ndash; Graduate Aptitude Test in Engineering</div>
                  <div><strong className="text-[#555]">JAM</strong> &ndash; Joint Admission Test for M.Sc</div>
                  <div><strong className="text-[#555]">TTC</strong> &ndash; Time Table Committee</div>
                  <div><strong className="text-[#555]">TCF</strong> &ndash; Teacher Course Feedback</div>
                  <div><strong className="text-[#555]">KR-IR</strong> &ndash; Prof. K. Ramiah &ndash; Institute Research Award</div>
                  <div><strong className="text-[#555]">DD</strong> &ndash; Dual Degree</div>
                  <div><strong className="text-[#555]">Suppl.</strong> &ndash; Supplementary</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="timetable"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TimetableSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Calendar;
