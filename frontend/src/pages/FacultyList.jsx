import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Users, ChevronRight } from 'lucide-react';
import { useInView } from 'framer-motion';
import FACULTY_DATA from '../data/facultyData';

const FadeIn = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>{children}</div>
  );
};

const BRANCHES = ['All', 'Organic', 'Inorganic', 'Physical', 'Theoretical'];

const FacultyList = () => {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('All');

  const filtered = FACULTY_DATA.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.area.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branch === 'All' || f.branch === branch;
    return matchSearch && matchBranch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">People</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-2">Faculty Directory</h1>
          <p className="text-[#888] text-sm max-w-xl">
            {FACULTY_DATA.length} faculty members across all branches of chemistry — Organic, Inorganic, Physical, and Theoretical.
          </p>

          {/* Head of Department highlight */}
          <Link
            to="/people/faculty/sekar"
            className="mt-8 flex items-center gap-4 bg-[#faf8f4] border border-[#e8e0d4] rounded-xl p-5 max-w-xl hover:border-[#7b1113]/25 hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-[#7b1113] flex items-center justify-center text-white font-bold text-lg shrink-0">
              GS
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7b1113] mb-0.5">Head of Department</p>
              <h3 className="text-base font-bold text-[#1a1a1a] group-hover:text-[#7b1113] transition-colors">Prof. G. Sekar</h3>
              <p className="text-xs text-[#888]">Asymmetric Synthesis · Catalysis</p>
            </div>
            <ArrowRight size={16} className="text-[#ccc] group-hover:text-[#7b1113] transition-colors shrink-0" />
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 max-w-7xl py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
            <input
              type="text"
              placeholder="Search faculty by name or area..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e8e0d4] rounded-xl text-sm focus:outline-none focus:border-[#7b1113]/40 focus:ring-2 focus:ring-[#7b1113]/10 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {BRANCHES.map(b => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${branch === b
                  ? 'bg-[#7b1113] text-white shadow-sm'
                  : 'bg-white border border-[#e8e0d4] text-[#555] hover:border-[#7b1113]/25 hover:text-[#7b1113]'
                  }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#999] mt-3">{filtered.length} faculty member{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      {/* Faculty Grid */}
      <div className="container mx-auto px-6 max-w-7xl pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((f, i) => (
            <FadeIn key={f.slug} delay={Math.min(i * 0.02, 0.3)}>
              <Link
                to={`/people/faculty/${f.slug}`}
                className="group flex items-start gap-3.5 bg-white border border-[#e8e0d4] rounded-xl p-4 hover:border-[#7b1113]/25 hover:shadow-[0_4px_16px_rgba(123,17,19,0.06)] transition-all duration-300 hover:-translate-y-0.5 h-full"
              >
                <div className="w-11 h-11 rounded-full bg-[#7b1113] flex items-center justify-center text-white font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                  {f.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-bold text-[#1a1a1a] group-hover:text-[#7b1113] transition-colors leading-tight">{f.name}</h3>
                  <p className="text-[11px] text-[#999] mt-0.5">{f.title}</p>
                  <p className="text-[11px] text-[#777] mt-0.5">{f.area}</p>
                  <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#7b1113]/60 bg-[#7b1113]/5 px-2 py-0.5 rounded">{f.branch}</span>
                </div>
                <ChevronRight size={14} className="text-[#ddd] group-hover:text-[#7b1113] transition-colors mt-1 shrink-0" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyList;
