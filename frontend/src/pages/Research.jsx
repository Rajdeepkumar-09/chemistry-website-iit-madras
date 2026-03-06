import { Link } from 'react-router-dom';
import { ArrowRight, Atom, FlaskConical, Microscope, Beaker, Building2, BookOpen, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import FACULTY_DATA from '../data/facultyData';

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

const AREAS = [
  {
    slug: 'organic',
    title: 'Organic Chemistry',
    icon: <FlaskConical size={22} />,
    description: 'Research in organic chemistry spans synthetic methodology, total synthesis of natural products, medicinal chemistry, green chemistry, asymmetric catalysis, C-H activation, and heterocyclic synthesis.',
    topics: ['Total Synthesis', 'Medicinal Chemistry', 'Green Chemistry', 'Asymmetric Catalysis', 'C-H Activation', 'Domino Reactions', 'Carbene Chemistry', 'Peptide Chemistry'],
  },
  {
    slug: 'inorganic',
    title: 'Inorganic Chemistry',
    icon: <Atom size={22} />,
    description: 'The inorganic chemistry group focuses on coordination chemistry, boron chemistry, metallaboranes, supramolecular chemistry, bioinorganic chemistry, main group chemistry, and metal-organic frameworks.',
    topics: ['Coordination Chemistry', 'Boron Chemistry', 'Metallaboranes', 'Supramolecular Chemistry', 'Bioinorganic Chemistry', 'Main Group Chemistry', 'Porphyrin Chemistry'],
  },
  {
    slug: 'physical',
    title: 'Physical Chemistry',
    icon: <Microscope size={22} />,
    description: 'Physical chemistry research includes spectroscopy, electrochemistry, nanomaterials, polymer science, ionic liquids, thermodynamics, photochemistry, and surface science.',
    topics: ['Spectroscopy', 'Electrochemistry', 'Nanomaterials', 'Polymer Science', 'Ionic Liquids', 'Thermodynamics', 'Photochemistry', 'Atmospheric Chemistry'],
  },
  {
    slug: 'theoretical',
    title: 'Theoretical Chemistry',
    icon: <Beaker size={22} />,
    description: 'Theoretical and computational chemistry research covers quantum chemistry, statistical mechanics, computational modeling, molecular dynamics, machine learning for chemistry, and reaction dynamics.',
    topics: ['Quantum Chemistry', 'Statistical Mechanics', 'Computational Modeling', 'Machine Learning', 'Molecular Dynamics', 'Electronic Structure Theory'],
  },
];

const CENTERS = [
  {
    name: 'Thematic Unit of Excellence for Nanoscience (TUE)',
    description: 'Established to pursue fundamental research in nanoscience and nanotechnology, focusing on synthesis, characterization, and application of nanomaterials.',
  },
  {
    name: 'National Centre for Catalysis Research (NCCR)',
    description: 'A Department of Science & Technology initiative to address fundamental and applied problems in catalysis — the backbone of the chemical industry.',
  },
  {
    name: 'Centre for MRI & Spectroscopy',
    description: 'A facility for advanced magnetic resonance imaging and spectroscopy, supporting both biomedical and materials research.',
  },
];

const Research = () => {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">Research</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-4">Research at the Department</h1>
          <p className="text-[#888] text-sm max-w-2xl leading-relaxed">
            Faculty members are active in cutting-edge research in fundamental and applied areas, broadly categorized into four major branches of chemistry.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        {/* Research Areas */}
        <div className="space-y-6 mb-12">
          {AREAS.map((area, i) => {
            const facultyInArea = FACULTY_DATA.filter(f => f.branch === area.title.split(' ')[0]);
            return (
              <FadeIn key={area.slug} delay={i * 0.08}>
                <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#7b1113]/5 flex items-center justify-center text-[#7b1113] shrink-0">
                      {area.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">{area.title}</h2>
                      <p className="text-xs text-[#999]">{facultyInArea.length} faculty members</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {area.topics.map((t, j) => (
                      <span key={j} className="text-[11px] px-2.5 py-1 bg-[#faf8f4] border border-[#e8e0d4] rounded-lg text-[#666]">{t}</span>
                    ))}
                  </div>

                  {/* Faculty in this area */}
                  {facultyInArea.length > 0 && (
                    <div className="border-t border-[#e8e0d4] pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#999] mb-3">Faculty</p>
                      <div className="flex flex-wrap gap-2">
                        {facultyInArea.map(f => (
                          <Link key={f.slug} to={`/people/faculty/${f.slug}`} className="inline-flex items-center gap-2 bg-[#faf8f4] border border-[#e8e0d4] rounded-lg px-3 py-1.5 text-xs font-medium text-[#555] hover:border-[#7b1113]/25 hover:text-[#7b1113] transition-all">
                            <span className="w-5 h-5 rounded-full bg-[#7b1113] text-white text-[9px] font-bold flex items-center justify-center">{f.initials}</span>
                            {f.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </FadeIn>
            );
          })}
        </div>

        {/* Research Centers */}
        <FadeIn>
          <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-6">Centers of Excellence</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {CENTERS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-white border border-[#e8e0d4] rounded-2xl p-6 hover:border-[#7b1113]/25 hover:shadow-md transition-all">
                <Building2 size={20} className="text-[#7b1113] mb-3" />
                <h3 className="text-base font-bold text-[#1a1a1a] mb-2">{c.name}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{c.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Publications CTA */}
        <FadeIn>
          <div className="bg-[#7b1113] text-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Publications & Output</h2>
              <p className="text-sm text-white/70 max-w-lg">
                Our faculty publish in leading journals including JACS, Angew. Chem., Chem. Sci., ACS Catalysis, and many more.
              </p>
            </div>
            <Link to="/research/publications" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#7b1113] font-semibold rounded-xl hover:bg-[#faf8f4] transition-colors text-sm shrink-0">
              View Publications <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Research;
