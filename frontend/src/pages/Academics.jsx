import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, BookOpen, Calendar, ExternalLink, Download, CheckCircle } from 'lucide-react';
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

const PROGRAMS = [
  {
    name: 'BS in Chemistry',
    duration: '4 years',
    entry: 'IAT (IISER Aptitude Test)',
    seats: '~20',
    overview: 'A rigorous 4-year undergraduate program with an MS upgrade option. Students can exit after 3rd year with a BSc degree, or continue to a 5th year for an integrated MS.',
    features: [
      'Basic & advanced courses in Chemistry',
      'Strong laboratory component for hands-on learning',
      'Courses in Mathematics, Physics, Life Sciences, Humanities',
      'BS and MS with major and minor streams (e.g., BS Chemistry with Data Science)',
      'Large number of elective courses enabling choice-based learning',
      'Early exit option at 3rd year with BSc degree',
    ],
    portal: 'https://ugadmissions.iitm.ac.in/bsiat/index.php',
    syllabusLink: 'https://chem.iitm.ac.in/wp-content/uploads/2025/03/Downlaod-Course-Syllabus.pdf',
    creditLink: 'https://chem.iitm.ac.in/wp-content/uploads/2025/03/Download-Credit-Strucutre-1.pdf',
    to: '/admissions/bs',
  },
  {
    name: 'M.Sc in Chemistry',
    duration: '2 years',
    entry: 'JAM (Joint Admission test for M.Sc)',
    seats: '~50',
    overview: "A Master's program with advanced coursework and research exposure under leading faculty. Students are selected through the national-level JAM examination organized jointly by all the IITs.",
    features: [
      'Advanced coursework in all branches of chemistry',
      'Research project under faculty guidance',
      'Access to state-of-the-art instrumentation facilities',
      'Opportunities for interdisciplinary research',
      'Teaching assistantship opportunities',
    ],
    portal: 'https://jam.iitk.ac.in/',
    to: '/academics/msc',
  },
  {
    name: 'Ph.D in Chemistry',
    duration: '4–5 years',
    entry: 'GATE / CSIR-UGC JRF / INSPIRE',
    seats: '~60/year',
    overview: 'Doctoral research at the frontier of chemical sciences across 36 research groups. Selection is via pre-qualification in GATE, CSIR-UGC/JRF, or DST-INSPIRE, followed by an in-person interview.',
    features: [
      'Cutting-edge research in all areas of chemistry',
      'Monthly fellowship support',
      'Access to world-class research facilities',
      'Teaching assistantship experience',
      'Opportunity to publish in top-tier journals',
      'National and international conference participation',
    ],
    portal: 'https://research.iitm.ac.in/',
    to: '/academics/phd',
  },
];

const COURSES = [
  { level: 'Undergraduate (BS)', link: 'https://chem.iitm.ac.in/wp-content/uploads/2025/03/Downlaod-Course-Syllabus.pdf' },
  { level: 'Undergraduate (B.Tech)', link: 'https://chem.iitm.ac.in/courses/undergraduate/' },
  { level: 'Postgraduate (M.Sc)', link: 'https://chem.iitm.ac.in/courses/postgraduate/' },
  { level: 'Graduate (Ph.D)', link: 'https://chem.iitm.ac.in/courses/graduate/' },
];

const Academics = () => {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">Academics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-4">Academic Programs</h1>
          <p className="text-[#888] text-sm max-w-2xl leading-relaxed">
            The Department offers three academic programmes — BS, M.Sc, and Ph.D — designed to produce world-class chemists.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        {/* Programs */}
        <div className="space-y-8 mb-14">
          {PROGRAMS.map((prog, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <section className="bg-white border border-[#e8e0d4] rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-[#1a1a1a]">{prog.name}</h2>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#888]">
                        <span className="inline-flex items-center gap-1"><Calendar size={12} className="text-[#7b1113]" /> {prog.duration}</span>
                        <span className="inline-flex items-center gap-1"><GraduationCap size={12} className="text-[#7b1113]" /> {prog.entry}</span>
                        <span className="inline-flex items-center gap-1"><BookOpen size={12} className="text-[#7b1113]" /> ~{prog.seats} seats</span>
                      </div>
                    </div>
                    <a href={prog.portal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b1113] text-white font-semibold rounded-xl text-sm hover:bg-[#601012] transition-colors shrink-0">
                      Apply Now <ExternalLink size={12} />
                    </a>
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed mb-5">{prog.overview}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prog.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#555]">
                        <CheckCircle size={14} className="text-[#7b1113] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {(prog.syllabusLink || prog.creditLink) && (
                  <div className="bg-[#faf8f4] border-t border-[#e8e0d4] px-6 md:px-8 py-4 flex flex-wrap gap-4">
                    {prog.syllabusLink && (
                      <a href={prog.syllabusLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-[#7b1113] font-semibold hover:text-[#601012] transition-colors">
                        <Download size={12} /> Download Course Syllabus
                      </a>
                    )}
                    {prog.creditLink && (
                      <a href={prog.creditLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-[#7b1113] font-semibold hover:text-[#601012] transition-colors">
                        <Download size={12} /> Download Credit Structure
                      </a>
                    )}
                  </div>
                )}
              </section>
            </FadeIn>
          ))}
        </div>

        {/* Course Catalog */}
        <FadeIn>
          <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-6">Course Catalog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {COURSES.map((c, i) => (
              <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#e8e0d4] rounded-xl p-5 hover:border-[#7b1113]/25 hover:shadow-md transition-all text-center">
                <BookOpen size={20} className="mx-auto mb-3 text-[#7b1113]" />
                <h3 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#7b1113] transition-colors">{c.level}</h3>
                <p className="text-[11px] text-[#999] mt-1 inline-flex items-center gap-1">View Courses <ExternalLink size={10} /></p>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Academics;
