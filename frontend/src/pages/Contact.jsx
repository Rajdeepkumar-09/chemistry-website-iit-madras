import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
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

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <div className="bg-white border-b border-[#e8e0d4]">
        <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#7b1113]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7b1113]">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-4">Get in Touch</h1>
          <p className="text-[#888] text-sm max-w-xl">Reach us for queries regarding admissions, research collaborations, or general information.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <FadeIn>
              <div className="bg-white border border-[#e8e0d4] rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Department Office</h2>
                <div className="space-y-5 text-sm text-[#555]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#7b1113]/5 flex items-center justify-center text-[#7b1113] shrink-0"><MapPin size={18} /></div>
                    <div>
                      <p className="font-semibold text-[#1a1a1a] mb-1">Address</p>
                      <p>Department of Chemistry<br />Indian Institute of Technology Madras<br />Chennai — 600 036, Tamil Nadu, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#7b1113]/5 flex items-center justify-center text-[#7b1113] shrink-0"><Phone size={18} /></div>
                    <div>
                      <p className="font-semibold text-[#1a1a1a] mb-1">Phone</p>
                      <a href="tel:+914422574200" className="hover:text-[#7b1113] transition-colors">+91 44 2257 4200</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#7b1113]/5 flex items-center justify-center text-[#7b1113] shrink-0"><Mail size={18} /></div>
                    <div>
                      <p className="font-semibold text-[#1a1a1a] mb-1">Email</p>
                      <a href="mailto:cyoffice@iitm.ac.in" className="hover:text-[#7b1113] transition-colors">cyoffice@iitm.ac.in</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#7b1113]/5 flex items-center justify-center text-[#7b1113] shrink-0"><Clock size={18} /></div>
                    <div>
                      <p className="font-semibold text-[#1a1a1a] mb-1">Office Hours</p>
                      <p>Monday – Friday: 9:00 AM – 5:30 PM<br />Saturday – Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white border border-[#e8e0d4] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-4">Useful Links</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'IIT Madras Main Website', url: 'https://www.iitm.ac.in/' },
                    { label: 'Research Admission Portal', url: 'https://research.iitm.ac.in/' },
                    { label: 'Central Library', url: 'https://www.cenlib.iitm.ac.in/' },
                    { label: 'Academic Calendar', url: 'https://www.iitm.ac.in/calendar' },
                    { label: 'BS-IAT Admission Portal', url: 'https://ugadmissions.iitm.ac.in/bsiat/index.php' },
                  ].map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#555] hover:text-[#7b1113] transition-colors">
                      <ExternalLink size={12} className="text-[#7b1113] shrink-0" /> {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Map */}
          <FadeIn delay={0.15}>
            <div className="bg-white border border-[#e8e0d4] rounded-2xl overflow-hidden h-full min-h-[400px]">
              <iframe
                title="IIT Madras Chemistry Department"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8372927613345!2d80.23099131482218!3d12.991123990849034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526787978a0469%3A0x9fbe3c2c68fffbed!2sDepartment%20of%20Chemistry%2C%20IIT%20Madras!5e0!3m2!1sen!2sin!4v1709283828000!5m2!1sen!2sin"
                className="w-full h-full min-h-[400px] border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;
