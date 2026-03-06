import { Link } from 'react-router-dom';
import { Calendar, Award, Users, ArrowRight, ExternalLink, MapPin, Clock } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const FadeIn = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>{children}</div>
  );
};

// Real news from chem.iitm.ac.in
const NEWS = [
  { text: 'Department of Chemistry welcomes Dr. Satyajit Roy. He is joining the department as an Assistant Professor.', tag: 'New Faculty', date: 'Jan 2026' },
  { text: 'Prof. Thalappil Pradeep has been selected for the prestigious Rashtriya Vigyan Puraskar award instituted by the Government of India for the year 2025.', tag: 'National Award', date: 'Dec 2025' },
  { text: 'Prof. Beeraiah Baire has been selected to receive CRSI Bronze Medal for the year 2026.', tag: 'Award', date: 'Nov 2025' },
  { text: 'Prof. R. Kothandaraman has received Annamalai & Santhi Rajendran Early Career Chair Professorship from IIT Madras.', tag: 'Recognition', date: 'Nov 2025' },
  { text: 'Department of Chemistry welcomes Dr. Yogesh G. Shelke. He is joining the department as an Assistant Professor.', tag: 'New Faculty', date: 'Oct 2025' },
  { text: 'Prof. Thalappil Pradeep has received Panjab University Vigyan Ratna award.', tag: 'Award', date: 'Oct 2025' },
  { text: 'Prof. Ramesh L. Gardas has been invited to join the editorial board of the journal Chemical Physics.', tag: 'Recognition', date: 'Sep 2025' },
  { text: 'Department of Chemistry welcomes Dr. Debotra Sarkar. He is joining the department as an Assistant Professor.', tag: 'New Faculty', date: 'Aug 2025' },
  { text: 'List of provisionally selected PhD candidates for January 2026 session has been published.', tag: 'Admissions', date: 'Dec 2025' },
];

// Real guest lectures and events from chem.iitm.ac.in
const EVENTS = [
  { title: 'Battery Material Innovations: An Industry R&D View', speaker: 'Dr. S. Venkatraman, R&D Director, Duracell India', date: 'Dec 30, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'National Conference on Organic Chemistry (NCOC) 2025', speaker: 'Department of Chemistry, IIT Madras', date: 'Dec 23-24, 2025', venue: 'IIT Madras', time: 'All Day' },
  { title: 'History and Future of X-ray Absorption Spectroscopy', speaker: 'Prof. Gerald Seidler, University of Washington', date: 'Nov 21, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'New Group 14 Chemical Brick by Hypersilyl Trick', speaker: 'Dr. Sakya S. Sen, CSIR-NCL, Pune', date: 'Nov 13, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'Vibrational Dephasing of a Morse Oscillator', speaker: 'Prof. Sushanta Dattagupta, Sister Nivedita University, Kolkata', date: 'Oct 29, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'The Future\'s Bright for Photochemistry', speaker: 'Prof. Andrew Orr-Ewing FRS, University of Bristol', date: 'Oct 28, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'Engineering Microenvironments at Electrochemical Interfaces', speaker: 'Dr. Deepak Badgurjar, University of Chicago', date: 'Oct 14, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'Protein Dynamics and Machine Learning for Drug Discovery', speaker: 'Dr. Neha Vithani, Openeye Cadence Molecular Sciences, USA', date: 'Oct 9, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'Trajectory to Industry Career: Publication to Product', speaker: 'Dr. Bhuvaneswari, Adjunct Faculty, IIT Madras', date: 'Sep 24, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'Unlocking New Chemical Space via Selective Catalysis', speaker: 'Prof. Debabrata Maiti, Department of Chemistry, IIT Bombay', date: 'Aug 12, 2025', venue: 'CB-310', time: '4:00 PM' },
  { title: 'Conformational Characterization of a Frustrated G-rich DNA Sequence', speaker: 'Dr. Bharathwaj Satyamoorthy, Department of Chemistry, IISER Bhopal', date: 'Jun 2, 2025', venue: 'CB-310', time: '3:00 PM' },
];

const NewsEvents = () => {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">Department Updates</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-4">News & Events</h1>
          <p className="text-[#888] text-sm max-w-xl">Latest news, achievements, and guest lectures from the Department of Chemistry, IIT Madras.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* News */}
          <div>
            <FadeIn>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Latest News
              </h2>
            </FadeIn>
            <div className="space-y-3">
              {NEWS.map((item, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="bg-white border border-[#e8e0d4] rounded-xl p-5 hover:border-[#7b1113]/20 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b1113] bg-[#7b1113]/5 px-2 py-0.5 rounded-md">{item.tag}</span>
                      <span className="text-[11px] text-[#999]">{item.date}</span>
                    </div>
                    <p className="text-sm text-[#333] leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <FadeIn>
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Guest Lectures & Events
              </h2>
            </FadeIn>
            <div className="space-y-3">
              {EVENTS.map((evt, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="bg-white border border-[#e8e0d4] rounded-xl p-5 hover:border-[#7b1113]/20 hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-[#999]">
                      <span className="inline-flex items-center gap-1"><Calendar size={12} className="text-[#7b1113]" /> {evt.date}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12} /> {evt.time}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={12} /> {evt.venue}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1a1a1a] mb-1 leading-snug">&ldquo;{evt.title}&rdquo;</h3>
                    <p className="text-xs text-[#888]">{evt.speaker}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* PhD Admissions CTA */}
            <FadeIn delay={0.3}>
              <div className="mt-8 bg-[#7b1113] text-white rounded-2xl p-6">
                <h3 className="text-base font-bold mb-2">Ph.D Admissions</h3>
                <p className="text-sm text-white/70 mb-4">Apply for Ph.D admission through the Research Admission Portal</p>
                <a href="https://research.iitm.ac.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#7b1113] font-semibold rounded-xl text-sm">
                  Research Portal <ArrowRight size={14} />
                </a>
              </div>
            </FadeIn>

            {/* Department Events */}
            <FadeIn delay={0.35}>
              <div className="mt-6 bg-white border border-[#e8e0d4] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-4">Past Conferences & Events</h3>
                <div className="space-y-2.5">
                  {[
                    { name: 'NCOC 2025 — National Conference on Organic Chemistry', year: '2025' },
                    { name: 'Waterforlife 2022 — International Conference', year: '2022' },
                    { name: 'Molmatter 2022 — Molecular Matter Conference', year: '2022' },
                    { name: 'CiHS — Chemistry in High School Outreach', year: 'Annual' },
                    { name: 'Resonance — Departmental Festival', year: 'Annual' },
                  ].map((conf, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-[#555]">{conf.name}</span>
                      <span className="text-[10px] font-bold text-[#999] bg-[#faf8f4] px-2 py-0.5 rounded">{conf.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;
