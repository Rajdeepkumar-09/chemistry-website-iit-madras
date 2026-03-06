import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award, Building2, FlaskConical, Atom, Calendar, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
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

const About = () => {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">About</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-4">The Department at a Glance</h1>
          <p className="text-[#888] text-sm max-w-2xl leading-relaxed">
            One of the founding departments of IIT Madras, the Department of Chemistry has been advancing chemical sciences through rigorous research and education since 1959.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        {/* History */}
        <FadeIn>
          <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-10 mb-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> History & Heritage
            </h2>
            <div className="text-sm text-[#555] leading-relaxed space-y-4">
              <p>
                The Department of Chemistry is one of the first departments to function after the Indian Institute of Technology Madras was founded in 1959. The Department began with one Professor and one lecturer as faculty members, to conduct classes for the undergraduate engineering programme of the Institute.
              </p>
              <p>
                The Department conducted its classes initially in A.C. College of Technology, Madras University. Later, it moved to occupy the "Building Sciences Block" in 1961 — the first-ever building raised in the Institute. The Department started its own and independent M.Sc programme in 1963 with three students. In 1968, the foundation was laid for a new Chemistry building, which was completed in 1971.
              </p>
              <p>
                Ever since, the Department has grown in multiple dimensions. Today it has 36 faculty members, and 27 technical and administrative staff members. The Department is home to around 100 M.Sc students and 300 Ph.D students at any given time. A new wing was constructed in 2014 to meet additional space requirements.
              </p>
              <p>
                The Department is among the best in the country in both teaching and research and is well recognized throughout the world through many of its Alumni, who have been excelling in their chosen professions. A significant number of them have been awarded by IIT Madras as its Distinguished Alumni.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Stats Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { num: '1959', label: 'Year Established' },
              { num: '36', label: 'Faculty Members' },
              { num: '300+', label: 'Ph.D Scholars' },
              { num: '100+', label: 'M.Sc Students' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-[#e8e0d4] rounded-2xl p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#7b1113] mb-1">{s.num}</div>
                <div className="text-xs text-[#888] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Research Areas */}
        <FadeIn delay={0.15}>
          <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-10 mb-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Research Areas
            </h2>
            <p className="text-sm text-[#555] leading-relaxed mb-6">
              The areas of research include atmospheric chemistry, bio-inorganic chemistry, bio-organic chemistry, boron chemistry, carbohydrate chemistry, clean energy, colloidal and interfacial chemistry, coordination chemistry, electrochemistry, fuel cells, green chemistry, homogeneous and heterogeneous catalysis, ionic liquids and phase equilibria, main group chemistry, materials chemistry, molecular spectroscopy, nanoporous materials, NMR spectroscopy and imaging, photochemistry, polymer chemistry, quantum chemistry, solid state chemistry, statistical mechanics, supramolecular chemistry, synthetic organic chemistry, total synthesis of natural products, and medicinal chemistry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'TUE — Nanoscience', full: 'Thematic Unit of Excellence for Nanoscience' },
                { name: 'NCCR', full: 'National Centre for Catalysis Research' },
                { name: 'MRI Centre', full: 'Centre for MRI & Spectroscopy' },
              ].map((c, i) => (
                <div key={i} className="bg-[#faf8f4] border border-[#e8e0d4] rounded-xl p-4">
                  <Building2 size={18} className="text-[#7b1113] mb-2" />
                  <h3 className="text-sm font-bold text-[#1a1a1a] mb-0.5">{c.name}</h3>
                  <p className="text-[11px] text-[#888]">{c.full}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Academic Programs */}
        <FadeIn delay={0.2}>
          <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-10 mb-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Academic Programs
            </h2>
            <div className="text-sm text-[#555] leading-relaxed space-y-3 mb-6">
              <p>The Department offers three academic programmes:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'BS in Chemistry', entry: 'IAT (IISER Aptitude Test)', desc: '4-year undergraduate program with MS upgrade option', to: '/admissions/bs' },
                { name: 'M.Sc in Chemistry', entry: 'JAM', desc: "Master's program with advanced coursework and research", to: '/academics/msc' },
                { name: 'Ph.D in Chemistry', entry: 'GATE / CSIR-UGC / INSPIRE', desc: 'Doctoral research at the frontier of chemical sciences', to: '/academics/phd' },
              ].map((p, i) => (
                <Link key={i} to={p.to} className="group bg-[#faf8f4] border border-[#e8e0d4] rounded-xl p-5 hover:border-[#7b1113]/25 transition-all">
                  <h3 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#7b1113] transition-colors mb-1">{p.name}</h3>
                  <p className="text-xs text-[#888] mb-2">{p.desc}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7b1113]/60">{p.entry}</span>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Head's Message */}
        <FadeIn delay={0.25}>
          <section className="bg-[#7b1113] text-white rounded-2xl p-6 md:p-10 mb-8">
            <h2 className="text-xl font-bold mb-4">Message from the Head</h2>
            <blockquote className="text-sm text-white/80 leading-relaxed italic border-l-2 border-white/30 pl-4 mb-4">
              "I am excited to announce the launch of our new Bachelor of Science (BS) in Chemistry program. This program has been a long-standing aspiration of our department, and several faculty colleagues have dedicated their time and energy to bring it to fruition. Our faculty members are committed to delivering high-quality education and fostering an environment of innovation and discovery."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">GS</div>
              <div>
                <p className="text-sm font-semibold">Prof. G. Sekar</p>
                <p className="text-xs text-white/60">Head, Department of Chemistry</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={0.3}>
          <section className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-10">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#555]">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#7b1113] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-1">Address</p>
                  <p>Department of Chemistry<br />IIT Madras, Chennai — 600 036<br />Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#7b1113] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-1">Phone</p>
                  <a href="tel:+914422574200" className="hover:text-[#7b1113] transition-colors">+91 44 2257 4200</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#7b1113] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-1">Email</p>
                  <a href="mailto:cyoffice@iitm.ac.in" className="hover:text-[#7b1113] transition-colors">cyoffice@iitm.ac.in</a>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
};

export default About;
