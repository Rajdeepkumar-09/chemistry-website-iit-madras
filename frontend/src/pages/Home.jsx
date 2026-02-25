import React, { useState, useEffect } from 'react';
import { BookOpen, FlaskConical, Users, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80", // Glassware / Science
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80", // Laboratory Research
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"  // Modern University Campus Building
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Automated Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5s crossfade interval
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex-grow flex flex-col bg-white">
      
      {/* Hero Section with Crossfade Slider */}
      <section className="relative w-full overflow-hidden text-white pt-28 pb-32 px-6 text-center border-b border-[#1f2937]">
        
        {/* Dynamic Background Image Layers */}
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        
        {/* Dark Overlays for Readability and Institutional Tone */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#1f2937]/30"></div>

        {/* Hero Content (Elevated z-index) */}
        <div className="relative z-10 container mx-auto max-w-5xl flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white drop-shadow-md">
              Department of Chemistry
              <span className="block text-gray-200 mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">
                Indian Institute of Technology Madras
              </span>
            </h1>
            <div className="w-16 h-1 bg-[#b45309] mb-8 shadow-sm"></div>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-10 leading-relaxed font-semibold drop-shadow-sm">
              Pioneering research, world-class education, and interdisciplinary innovation in chemical sciences at India's premier institute.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4">
               <Link to="/about/overview" className="bg-[#b45309] hover:bg-[#92400e] text-white font-semibold py-3.5 px-8 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm">
                 Discover More
               </Link>
               <Link to="/academics" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-3.5 px-8 transition-colors border border-white/30 flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm">
                 Academic Programs
               </Link>
            </div>
            
            {/* Slider Navigation Indicators */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-2.5">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    index === currentImage ? 'bg-[#b45309] w-8' : 'bg-white/50 hover:bg-white w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
        </div>
      </section>

      {/* Overview Metric Banner */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-black/5">
          {/* Header Block */}
          <div className="lg:w-1/3 p-10 flex flex-col justify-center bg-[#f5f6f8] border-b lg:border-b-0 lg:border-r border-[#e5e7eb]">
             <h2 className="text-2xl font-bold text-[#1f2937] tracking-tight">At a Glance</h2>
             <div className="w-10 h-1 bg-[#b45309] mt-4 mb-4"></div>
             <p className="text-[#4b5563] font-medium leading-relaxed">A leading institutional hub for chemical research, rigorous education, and global scientific discovery.</p>
          </div>
          
          {/* Metrics Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e7eb]">
             
             <div className="p-10 flex flex-col justify-center items-center text-center group">
               <div className="text-5xl font-extrabold text-[#1f2937] group-hover:text-[#b45309] transition-colors duration-300">50+</div>
               <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mt-4">Faculty Members</div>
             </div>
             
             <div className="p-10 flex flex-col justify-center items-center text-center group bg-[#fafafa]">
               <div className="text-5xl font-extrabold text-[#1f2937] group-hover:text-[#b45309] transition-colors duration-300">4</div>
               <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mt-4">Research Centers</div>
             </div>
             
             <div className="p-10 flex flex-col justify-center items-center text-center group">
               <div className="text-5xl font-extrabold text-[#1f2937] group-hover:text-[#b45309] transition-colors duration-300">100s</div>
               <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mt-4">Yearly Publications</div>
             </div>

          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="w-full py-20 px-6 bg-[#ffffff]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-[#1f2937] mb-4">Focus Areas</h2>
            <div className="w-16 h-[3px] bg-[#b45309]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <BookOpen size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Academic Programs</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">BS, Dual Degree, MSc, and PhD programs designed to forge the next generation of scientists.</p>
              <Link to="/academics" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                View Curriculum <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <FlaskConical size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Research Facilities</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">State-of-the-art facilities ranging from theoretical catalysis to advanced materials and energy storage.</p>
              <Link to="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                Explore Research <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <Users size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Our Community</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">A diverse and vibrant community of globally recognized faculty, brilliant students, and notable alumni.</p>
              <Link to="/people" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>
            
             {/* Card 4 */}
             <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <Globe size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Global Collaborations</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">Fostering strong partnerships with national and international universities and industry alliances.</p>
              <Link to="/collaborations/international" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                View Partnerships <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
