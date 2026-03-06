import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, ExternalLink, BookOpen, Award, GraduationCap, FlaskConical, ChevronRight } from 'lucide-react';
import FACULTY_DATA from '../data/facultyData';

const FacultyProfile = () => {
  const { slug } = useParams();
  const faculty = FACULTY_DATA.find(f => f.slug === slug);

  if (!faculty) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#faf8f4]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Faculty Not Found</h1>
          <p className="text-sm text-[#888] mb-6">The requested faculty profile does not exist.</p>
          <Link to="/people/faculty" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b1113] text-white rounded-lg text-sm font-semibold hover:bg-[#601012] transition-colors">
            <ArrowLeft size={14} /> Back to Faculty
          </Link>
        </div>
      </div>
    );
  }

  // Find adjacent faculty for navigation
  const currentIndex = FACULTY_DATA.findIndex(f => f.slug === slug);
  const prevFaculty = currentIndex > 0 ? FACULTY_DATA[currentIndex - 1] : null;
  const nextFaculty = currentIndex < FACULTY_DATA.length - 1 ? FACULTY_DATA[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
          <Link to="/people/faculty" className="inline-flex items-center gap-2 text-sm text-[#7b1113] hover:text-[#601012] font-medium mb-6 transition-colors">
            <ArrowLeft size={14} /> Faculty Directory
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[#7b1113] flex items-center justify-center text-white font-bold text-3xl shrink-0 shadow-[0_4px_16px_rgba(123,17,19,0.2)]">
              {faculty.initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b1113] bg-[#7b1113]/5 px-2 py-0.5 rounded">{faculty.branch} Chemistry</span>
                {faculty.slug === 'sekar' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#7b1113] px-2 py-0.5 rounded">Head of Department</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight mb-1">{faculty.name}</h1>
              <p className="text-sm text-[#888] mb-3">{faculty.designation}</p>
              <p className="text-sm text-[#555] font-medium">{faculty.area}</p>

              {/* Contact row */}
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#777]">
                {faculty.email && (
                  <a href={`mailto:${faculty.email}`} className="inline-flex items-center gap-1.5 hover:text-[#7b1113] transition-colors">
                    <Mail size={13} className="text-[#7b1113]" /> {faculty.email}
                  </a>
                )}
                {faculty.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone size={13} className="text-[#7b1113]" /> {faculty.phone}
                  </span>
                )}
                {faculty.office && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#7b1113]" /> {faculty.office}
                  </span>
                )}
                {faculty.website && (
                  <a href={faculty.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#7b1113] transition-colors">
                    <ExternalLink size={13} className="text-[#7b1113]" /> Lab Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            {faculty.bio && (
              <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Biography
                </h2>
                <p className="text-sm text-[#555] leading-relaxed">{faculty.bio}</p>
              </section>
            )}

            {/* Research Interests */}
            {faculty.researchInterests && faculty.researchInterests.length > 0 && (
              <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Research Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {faculty.researchInterests.map((interest, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#faf8f4] border border-[#e8e0d4] rounded-lg text-sm text-[#555] font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Publications */}
            {faculty.publications && faculty.publications.length > 0 && (
              <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#7b1113] rounded-full" />
                  <BookOpen size={16} className="text-[#7b1113]" /> Representative Publications
                </h2>
                <ul className="space-y-3">
                  {faculty.publications.map((pub, i) => (
                    <li key={i} className="text-sm text-[#555] leading-relaxed pl-4 border-l-2 border-[#e8e0d4] hover:border-[#7b1113] transition-colors">
                      {pub}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {faculty.education && faculty.education.length > 0 && (
              <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#7b1113]" /> Education
                </h3>
                <ul className="space-y-2">
                  {faculty.education.map((edu, i) => (
                    <li key={i} className="text-xs text-[#555] leading-relaxed pl-3 border-l-2 border-[#e8e0d4]">{edu}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Awards */}
            {faculty.awards && faculty.awards.length > 0 && (
              <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                  <Award size={16} className="text-[#7b1113]" /> Honors & Recognitions
                </h3>
                <ul className="space-y-2">
                  {faculty.awards.map((award, i) => (
                    <li key={i} className="text-xs text-[#555] leading-relaxed flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#7b1113] mt-1.5 shrink-0" />
                      {award}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Quick Links */}
            <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-3">Quick Links</h3>
              <div className="space-y-2">
                {faculty.website && (
                  <a href={faculty.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#7b1113] hover:text-[#601012] font-semibold transition-colors">
                    <ExternalLink size={12} /> Lab Website
                  </a>
                )}
                <a href={`https://scholar.google.com/scholar?q=${encodeURIComponent(faculty.name.replace('Prof. ', '').replace('Dr. ', ''))}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#7b1113] hover:text-[#601012] font-semibold transition-colors">
                  <ExternalLink size={12} /> Google Scholar
                </a>
                <a href={`https://chem.iitm.ac.in/faculty/${faculty.slug}/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#7b1113] hover:text-[#601012] font-semibold transition-colors">
                  <ExternalLink size={12} /> Official IITM Page
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Faculty navigation */}
        <div className="mt-12 pt-8 border-t border-[#e8e0d4] flex flex-col sm:flex-row justify-between gap-4">
          {prevFaculty ? (
            <Link to={`/people/faculty/${prevFaculty.slug}`} className="group flex items-center gap-3 bg-white border border-[#e8e0d4] rounded-xl p-4 hover:border-[#7b1113]/25 transition-all flex-1">
              <ArrowLeft size={14} className="text-[#ccc] group-hover:text-[#7b1113] transition-colors" />
              <div>
                <p className="text-[10px] text-[#999] uppercase tracking-wider">Previous</p>
                <p className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#7b1113] transition-colors">{prevFaculty.name}</p>
              </div>
            </Link>
          ) : <div />}
          {nextFaculty ? (
            <Link to={`/people/faculty/${nextFaculty.slug}`} className="group flex items-center justify-end gap-3 bg-white border border-[#e8e0d4] rounded-xl p-4 hover:border-[#7b1113]/25 transition-all flex-1 text-right">
              <div>
                <p className="text-[10px] text-[#999] uppercase tracking-wider">Next</p>
                <p className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#7b1113] transition-colors">{nextFaculty.name}</p>
              </div>
              <ChevronRight size={14} className="text-[#ccc] group-hover:text-[#7b1113] transition-colors" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
