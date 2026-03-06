import { Link } from 'react-router-dom';
import { Microscope, Download, ExternalLink, ArrowRight } from 'lucide-react';
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

const INSTRUMENTS = [
  { name: 'NMR Spectrometers', detail: '400 & 500 MHz', category: 'Spectroscopy', desc: 'High-resolution nuclear magnetic resonance spectrometers for structural elucidation of organic and inorganic compounds.' },
  { name: 'HR-QTOF Mass Spectrometer', detail: 'High Resolution', category: 'Mass Spectrometry', desc: 'Quadrupole Time-of-Flight mass spectrometer for accurate mass determination and structural analysis.' },
  { name: 'ESI-Mass Spectrometer', detail: 'Electrospray Ionization', category: 'Mass Spectrometry', desc: 'Electrospray ionization mass spectrometer for analysis of polar and biomolecular species.' },
  { name: 'GC-MS/MS', detail: 'Tandem Mass Spectrometry', category: 'Mass Spectrometry', desc: 'Gas chromatography coupled with tandem mass spectrometry for trace-level analysis.' },
  { name: 'SEM', detail: 'Scanning Electron Microscopy', category: 'Microscopy', desc: 'High-resolution imaging of surface morphology & elemental analysis using EDS.' },
  { name: 'TEM', detail: 'Transmission Electron Microscopy', category: 'Microscopy', desc: 'Imaging at the nanoscale for nanomaterials characterization and crystallography.' },
  { name: 'AFM', detail: 'Atomic Force Microscopy', category: 'Microscopy', desc: 'Surface topography imaging at nanometer resolution.' },
  { name: 'XRD', detail: 'X-Ray Diffraction', category: 'X-Ray Techniques', desc: 'Powder and single-crystal X-ray diffractometers for crystal structure determination.' },
  { name: 'XPS', detail: 'X-Ray Photoelectron Spectroscopy', category: 'X-Ray Techniques', desc: 'Surface chemical composition and electronic state analysis.' },
  { name: 'ESR/EPR', detail: 'Electron Spin Resonance', category: 'Spectroscopy', desc: 'Paramagnetic species characterization and free radical detection.' },
  { name: 'FT-IR', detail: 'Fourier Transform Infrared', category: 'Spectroscopy', desc: 'Infrared spectroscopy for functional group identification.' },
  { name: 'Fluorimeters', detail: 'Fluorescence Spectroscopy', category: 'Spectroscopy', desc: 'Steady-state and time-resolved fluorescence measurements.' },
  { name: 'UV-Vis Spectrophotometers', detail: 'UV-Visible', category: 'Spectroscopy', desc: 'Electronic absorption measurements for quantitative analysis.' },
  { name: 'DSC', detail: 'Differential Scanning Calorimetry', category: 'Thermal Analysis', desc: 'Thermal transition and heat flow measurement.' },
  { name: 'TGA', detail: 'Thermogravimetric Analysis', category: 'Thermal Analysis', desc: 'Weight loss measurement as a function of temperature.' },
  { name: 'CHN Analyzer', detail: 'Elemental Analysis', category: 'Analytical', desc: 'Carbon, hydrogen, and nitrogen content determination.' },
  { name: 'MALDI', detail: 'Mass Spectrometry', category: 'Mass Spectrometry', desc: 'Matrix-assisted laser desorption/ionization for high molecular weight species.' },
  { name: 'GC-FTIR', detail: 'Coupled GC-FTIR', category: 'Spectroscopy', desc: 'Gas chromatography coupled with FTIR for product identification.' },
  { name: 'Calvet-type Calorimeter', detail: 'Calorimetry', category: 'Thermal Analysis', desc: 'High-sensitivity heat flow calorimetry.' },
  { name: 'Chemisorption Apparatus', detail: 'Surface Analysis', category: 'Analytical', desc: 'Temperature programmed desorption (TPD) and reduction (TPR) for catalyst characterization.' },
  { name: 'TPD & TPR', detail: 'Temperature Programmed', category: 'Analytical', desc: 'Surface acidity/basicity and reducibility studies of catalysts.' },
];

const Facilities = () => {
  const categories = [...new Set(INSTRUMENTS.map(i => i.category))];

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      {/* Hero */}
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">Infrastructure</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-4">Core Research Facilities</h1>
          <p className="text-[#888] text-sm max-w-2xl leading-relaxed">
            {INSTRUMENTS.length} state-of-the-art instruments available to departmental and external researchers. Most facilities offer open access at nominal cost.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        {categories.map((cat, ci) => (
          <FadeIn key={cat} delay={ci * 0.05}>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#7b1113] rounded-full" /> {cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INSTRUMENTS.filter(i => i.category === cat).map((inst, i) => (
                  <div key={i} className="bg-white border border-[#e8e0d4] rounded-xl p-5 hover:border-[#7b1113]/25 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <Microscope size={18} className="text-[#7b1113] group-hover:scale-110 transition-transform" />
                      <h3 className="text-sm font-bold text-[#1a1a1a]">{inst.name}</h3>
                    </div>
                    <p className="text-[11px] text-[#7b1113] font-medium mb-1">{inst.detail}</p>
                    <p className="text-xs text-[#888] leading-relaxed">{inst.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        ))}

        {/* CTA */}
        <FadeIn>
          <div className="bg-[#7b1113] text-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Instrument Booking & SOPs</h2>
              <p className="text-sm text-white/70">Contact the department office for instrument booking schedules and standard operating procedures.</p>
            </div>
            <a href="mailto:cyoffice@iitm.ac.in" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#7b1113] font-semibold rounded-xl text-sm shrink-0">
              Contact Office <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Facilities;
