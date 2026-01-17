import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-t-4 border-mystic-copper animate-spin"></div>
        
        {/* Inner Yin Yang Simulation */}
        <div className="absolute inset-4 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden animate-pulse border border-slate-200">
             <div className="w-full h-1/2 bg-slate-800 absolute top-0"></div>
             <div className="w-full h-1/2 bg-white absolute bottom-0"></div>
        </div>
      </div>
      <p className="mt-6 text-slate-600 font-display font-bold text-lg animate-pulse">Đang luận giải thiên cơ...</p>
      <p className="text-slate-400 text-sm mt-1 font-sans font-medium">Quá trình này có thể mất vài giây</p>
    </div>
  );
};

export default LoadingSpinner;