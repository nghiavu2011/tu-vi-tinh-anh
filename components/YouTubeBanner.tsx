import React from 'react';

const YouTubeBanner: React.FC = () => {
  return (
    <a 
      href="https://www.youtube.com/@Thienluongtuvi" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full bg-gradient-to-r from-red-900 via-red-700 to-red-900 border-y border-red-500/30 hover:border-red-400/50 transition-all group overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-4 relative z-10">
        <div className="bg-white text-red-600 rounded-lg p-1 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <span className="font-bold text-white text-sm md:text-base tracking-wide uppercase">
            Thiên Lương Tử Vi
          </span>
          <span className="hidden md:inline text-red-200">|</span>
          <span className="text-red-100 text-xs md:text-sm group-hover:text-white transition-colors">
            Xem video nghiệm lý và kiến thức Tử Vi chuyên sâu
          </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </a>
  );
};

export default YouTubeBanner;