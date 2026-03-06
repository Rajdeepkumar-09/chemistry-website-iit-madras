import React, { useState, useEffect } from 'react';
import { BookOpen, FlaskConical, Users, ArrowRight, Globe, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [notices, setNotices] = useState([]);
  
  // ADDED: Check who is currently logged in by looking at the browser's memory
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // Automated Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  // Fetch notices on load (This is a public route, so no token needed here)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/notices')
      .then(response => response.json())
      .then(data => setNotices(data))
      .catch(error => console.error("Error fetching notices:", error));
  }, []);

  // ADDED: Logic to determine if the user is allowed to post notices
  const canPostNotice = userRole === 'admin' || userRole === 'faculty' || userRole === 'lab_manager';

  return (
    <div className="w-full flex-grow flex flex-col bg-white">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden text-white pt-28 pb-32 px-6 text-center border-b border-[#1f2937]">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#1f2937]/30"></div>

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
        </div>
      </section>

      {/* Overview Metric Banner */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border border-[#e5e7eb] bg-white shadow-sm ring-1 ring-black/5">
          <div className="lg:w-1/3 p-10 flex flex-col justify-center bg-[#f5f6f8] border-b lg:border-b-0 lg:border-r border-[#e5e7eb]">
             <h2 className="text-2xl font-bold text-[#1f2937] tracking-tight">At a Glance</h2>
             <div className="w-10 h-1 bg-[#b45309] mt-4 mb-4"></div>
             <p className="text-[#4b5563] font-medium leading-relaxed">A leading institutional hub for chemical research, rigorous education, and global scientific discovery.</p>
          </div>
          
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

      {/*ADDED by rajdeep  Notice Board Section */}
      <section className="w-full py-12 px-6 bg-[#f9fafb] border-y border-[#e5e7eb]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Bell className="text-[#b45309]" size={28} />
            <div>
              <h2 className="text-3xl font-bold text-[#1f2937]">Department Notices</h2>
              <div className="w-16 h-[3px] bg-[#b45309] mt-3"></div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDE: The Notices List */}
            {/* If they CANNOT post (like a student), this takes up the full width (w-full). Otherwise, 2/3 width. */}
            <div className={`${canPostNotice ? 'lg:w-2/3' : 'w-full'} grid grid-cols-1 md:grid-cols-2 gap-6 h-fit`}>
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <div key={notice.id} className="bg-white p-6 border-l-4 border-[#b45309] shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#1f2937] mb-3">{notice.title}</h3>
                    <p className="text-[#4b5563] mb-4 leading-relaxed">{notice.content}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500 font-semibold bg-gray-100 inline-block px-3 py-1 rounded">
                        {notice.author}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{notice.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500 italic bg-white border border-dashed border-gray-300">
                  No notices available at this time.
                </div>
              )}
            </div>

            {/* RIGHT SIDE: The Submission Form (ONLY SHOWS IF AUTHORIZED) */}
            {canPostNotice && (
              <div className="lg:w-1/3 bg-white p-8 border border-[#e5e7eb] shadow-sm rounded-sm h-fit">
                <h3 className="text-xl font-bold text-[#1f2937] mb-6">Post a New Notice</h3>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newNotice = {
                      title: formData.get('title'),
                      content: formData.get('content'),
                      // ADDED: Deadline payload
                      deadline: formData.get('deadline') 
                      // REMOVED: author is no longer here, backend handles it!
                    };

                    const token = localStorage.getItem('token');

                    try {
                      const res = await fetch('http://127.0.0.1:8000/api/notices', {
                        method: 'POST',
                        headers: { 
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}` 
                        },
                        body: JSON.stringify(newNotice)
                      });

                      if (res.ok) {
                        const data = await res.json();
                        setNotices([data, ...notices]); 
                        e.target.reset(); 
                        alert("Notice published successfully!");
                      } else {
                        const errorData = await res.json();
                        alert(`The Server Bouncer says: ${errorData.msg || errorData.error}`);
                      }
                    } catch (err) {
                      console.error("Failed to post notice:", err);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notice Title</label>
                    <input name="title" required type="text" className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-[#b45309]" placeholder="e.g. Lab Closure" />
                  </div>
                  
                  {/* MODIFIED: Replaced Author Name with Expiration Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Expiration Deadline</label>
                    <input name="deadline" type="datetime-local" className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-[#b45309]" />
                    <p className="text-xs text-gray-500 mt-1">Leave blank for permanent notice.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Details</label>
                    <textarea name="content" required rows="4" className="w-full p-2.5 border border-gray-300 focus:outline-none focus:border-[#b45309]" placeholder="Enter notice details here..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#1f2937] hover:bg-black text-white font-bold py-3 mt-2 transition-colors">
                    Publish Notice
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="w-full py-20 px-6 bg-[#ffffff]">
        {/* ... (Pillars section remains exactly the same) ... */}
        <div className="container mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-[#1f2937] mb-4">Focus Areas</h2>
            <div className="w-16 h-[3px] bg-[#b45309]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <BookOpen size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Academic Programs</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">BS, Dual Degree, MSc, and PhD programs designed to forge the next generation of scientists.</p>
              <Link to="/academics" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                View Curriculum <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <FlaskConical size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Research Facilities</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">State-of-the-art facilities ranging from theoretical catalysis to advanced materials and energy storage.</p>
              <Link to="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                Explore Research <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-[#f5f6f8] p-8 border border-[#e5e7eb] hover:border-[#b45309] transition-colors group">
              <Users size={28} className="text-[#1f2937] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-3 text-[#1f2937]">Our Community</h3>
              <p className="text-[#4b5563] mb-6 text-sm leading-relaxed">A diverse and vibrant community of globally recognized faculty, brilliant students, and notable alumni.</p>
              <Link to="/people" className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>
            
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
