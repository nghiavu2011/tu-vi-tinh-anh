import React, { useState } from 'react';
import { SchoolStyle } from '../types';
import { exportToPDF } from '../services/pdfService';

interface ResultDisplayProps {
  result: string;
  school: SchoolStyle;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, school }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Determine style based on school
  const isThaiThuLang = school === SchoolStyle.THAI_THU_LANG;
  const borderColor = isThaiThuLang ? 'border-amber-500/30' : 'border-emerald-500/30';
  const accentColor = isThaiThuLang ? 'text-amber-400' : 'text-emerald-400';
  const bgHeader = isThaiThuLang ? 'bg-amber-900/20' : 'bg-emerald-900/20';
  const btnColor = 'bg-white text-slate-900 hover:bg-slate-200';

  // ID for PDF generation
  const resultContainerId = "horoscope-result-content";

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `Luan-Giai-Tu-Vi-${school === SchoolStyle.THAI_THU_LANG ? 'ThaiThuLang' : 'ThienLuong'}-${dateStr}.pdf`;
    
    await exportToPDF(resultContainerId, fileName);
    setIsGeneratingPdf(false);
  };

  // Simple processing
  const processText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('###') || line.startsWith('**')) {
         const cleanLine = line.replace(/^###\s*/, '').replace(/\*\*/g, '');
         return <h3 key={idx} className={`text-lg font-display font-bold mt-6 mb-3 ${accentColor} uppercase tracking-wide`}>{cleanLine}</h3>
      }
      if (line.startsWith('- ')) {
        return <li key={idx} className="ml-4 list-disc pl-2 mb-2 text-slate-300 font-sans font-light">{line.replace('- ', '')}</li>
      }
      
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="mb-3 leading-relaxed text-slate-300 font-sans font-normal">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in-up">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPdf}
          className={`${btnColor} px-6 py-2 rounded-full font-display font-bold text-sm shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isGeneratingPdf ? (
            <>
              <svg className="animate-spin h-4 w-4 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tạo PDF...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Tải kết quả PDF
            </>
          )}
        </button>
      </div>

      <div id={resultContainerId} className={`relative rounded-3xl overflow-hidden glass-liquid border ${borderColor} shadow-2xl transition-all duration-700 bg-black/40`}>
        {/* Header */}
        <div className={`p-8 border-b ${borderColor} ${bgHeader} flex justify-between items-center backdrop-blur-sm`}>
           <div className="flex flex-col">
             <h2 className="font-display font-bold text-xl md:text-2xl text-white">
               Luận Giải Chi Tiết
             </h2>
             <span className="text-xs text-slate-400 mt-1 font-sans font-medium">Tử Vi Tinh Anh - Phân tích bởi AI</span>
           </div>
           <div className={`px-4 py-2 rounded-full text-xs font-bold border ${isThaiThuLang ? 'border-amber-500/50 text-amber-300 bg-amber-900/40' : 'border-emerald-500/50 text-emerald-300 bg-emerald-900/40'}`}>
             {isThaiThuLang ? 'THÁI THỨ LANG' : 'THIÊN LƯƠNG'}
           </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 min-h-[400px]">
           <div className="prose prose-invert max-w-none font-sans font-normal animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             {processText(result)}
           </div>
           
           {/* Watermark */}
           <div className="mt-12 pt-6 border-t border-white/10 flex justify-between text-xs text-slate-500 font-sans font-light">
             <span>Ngày luận giải: {new Date().toLocaleDateString('vi-VN')}</span>
             <span>tuvi-tinhanh.web.app</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;