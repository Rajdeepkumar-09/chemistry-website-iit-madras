import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import logo from '../assets/logo/IITM_LOGO.png';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8] text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-x-clip">

      {/* Global Navigation Bar */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Structured Institutional Footer with relative z-20 to cover the canvas */}
      <footer className="relative z-20 bg-[#eef1f4] border-t border-[#e5e7eb] py-14 mt-auto">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={logo} alt="IIT Madras Logo" className="h-16 w-auto object-contain mix-blend-darken opacity-90" />
            <div>
              <div className="text-[#1f2937] font-bold text-xl mb-1 tracking-tight">
                Department of Chemistry
              </div>
              <p className="text-sm text-[#4b5563] max-w-sm leading-relaxed mt-2">
                Indian Institute of Technology Madras<br />
                Chennai 600036, Tamil Nadu, India
              </p>
            </div>
          </div>

          <div className="text-sm text-[#4b5563] flex flex-col items-center md:items-end">
            <div className="flex gap-6 mb-4 font-medium">
              <a href="#" className="hover:text-[#b45309] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#b45309] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#b45309] transition-colors">Sitemap</a>
              <a href="#" className="hover:text-[#b45309] transition-colors">Contact Directory</a>
            </div>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} IIT Madras. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Layout;