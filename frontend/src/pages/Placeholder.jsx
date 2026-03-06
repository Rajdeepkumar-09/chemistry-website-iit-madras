import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';

const Placeholder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Format the URL path into a readable title
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageTitle = pathParts.length > 0 
    ? pathParts[pathParts.length - 1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Page Overview';

  return (
    <div className="w-full flex-grow flex items-center justify-center py-20 px-6 min-h-[60vh] bg-[#f5f6f8]">
      <div className="max-w-xl w-full bg-white border border-black/[0.04] rounded-2xl p-10 md:p-14 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        
        <div className="flex flex-col items-center">
          <Settings size={40} className="text-[#1f2937] mb-6 opacity-60" strokeWidth={1} />
          
          <h1 className="text-2xl font-semibold text-[#1f2937] mb-2 tracking-tight">{pageTitle}</h1>
          
          <div className="text-[#4b5563] font-semibold text-[11px] uppercase tracking-widest mb-6">
            Under Maintenance
          </div>
          
          <p className="text-[#6b7280] mb-10 max-w-sm mx-auto leading-relaxed text-[15px] font-normal">
            The requested section <span className="font-mono bg-[#f5f6f8] text-[#1f2937] px-2 py-1 text-[13px] rounded-md border border-black/[0.05]">{location.pathname}</span> is currently being structured and will be available shortly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="px-6 py-3 bg-white text-[#1f2937] text-[14px] font-medium transition-colors border border-[#e5e7eb] rounded-xl hover:bg-[#f9fafb] flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
            <Link 
              to="/" 
              className="px-6 py-3 bg-[#1f2937] hover:bg-[#111827] text-white text-[14px] font-medium transition-colors border border-[#1f2937] rounded-xl"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
