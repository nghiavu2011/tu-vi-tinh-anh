import React from 'react';
import { SchoolStyle } from '../types';

interface SchoolSelectorProps {
  selected: SchoolStyle;
  onSelect: (school: SchoolStyle) => void;
}

const SchoolSelector: React.FC<SchoolSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thai Thu Lang Card */}
        <div 
          onClick={() => onSelect(SchoolStyle.THAI_THU_LANG)}
          className={`cursor-pointer relative p-8 transition-all duration-500 group overflow-hidden rounded-2xl
            ${selected === SchoolStyle.THAI_THU_LANG 
              ? 'glass-liquid border-mystic-copper shadow-[0_0_20px_rgba(253,186,116,0.2)] transform -translate-y-2' 
              : 'bg-white/5 border-transparent hover:bg-white/10 hover:shadow-lg hover:border-white/20'
            } border`}
        >
          <div className="flex flex-col items-center text-center relative z-10">
            <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center border transition-colors
              ${selected === SchoolStyle.THAI_THU_LANG ? 'border-mystic-copper text-mystic-copper bg-orange-900/20' : 'border-slate-600 text-slate-500 bg-white/5'}`}>
              <span className="font-display font-bold text-2xl">I</span>
            </div>
            
            <h4 className={`font-display font-bold text-xl tracking-wider mb-2 ${selected === SchoolStyle.THAI_THU_LANG ? 'text-white' : 'text-slate-400'}`}>
              Thái Thứ Lang
            </h4>
            
            <div className={`h-px w-12 my-3 ${selected === SchoolStyle.THAI_THU_LANG ? 'bg-mystic-copper' : 'bg-slate-600'}`}></div>

            <p className="font-serif font-light text-sm text-slate-300 leading-relaxed italic">
              "Tử Vi Đẩu Số Tân Biên"
            </p>
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide font-bold">
              Hệ thống • Chi tiết • Chính thống
            </p>
          </div>
        </div>

        {/* Thien Luong Card */}
        <div 
          onClick={() => onSelect(SchoolStyle.THIEN_LUONG)}
          className={`cursor-pointer relative p-8 transition-all duration-500 group overflow-hidden rounded-2xl
            ${selected === SchoolStyle.THIEN_LUONG 
              ? 'glass-liquid border-mystic-copper shadow-[0_0_20px_rgba(253,186,116,0.2)] transform -translate-y-2' 
              : 'bg-white/5 border-transparent hover:bg-white/10 hover:shadow-lg hover:border-white/20'
            } border`}
        >
          <div className="flex flex-col items-center text-center relative z-10">
            <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center border transition-colors
              ${selected === SchoolStyle.THIEN_LUONG ? 'border-mystic-copper text-mystic-copper bg-orange-900/20' : 'border-slate-600 text-slate-500 bg-white/5'}`}>
              <span className="font-display font-bold text-2xl">II</span>
            </div>
            
            <h4 className={`font-display font-bold text-xl tracking-wider mb-2 ${selected === SchoolStyle.THIEN_LUONG ? 'text-white' : 'text-slate-400'}`}>
              Thiên Lương
            </h4>
            
            <div className={`h-px w-12 my-3 ${selected === SchoolStyle.THIEN_LUONG ? 'bg-mystic-copper' : 'bg-slate-600'}`}></div>

            <p className="font-serif font-light text-sm text-slate-300 leading-relaxed italic">
              "Tử Vi Nghiệm Lý"
            </p>
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide font-bold">
              Nhân quả • Đạo đức • Ý chí
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSelector;