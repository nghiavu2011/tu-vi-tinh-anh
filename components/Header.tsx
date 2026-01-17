import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    const key = localStorage.getItem('GEMINI_API_KEY');
    setHasKey(!!key);
  }, []);

  const scrollToInput = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('input-area');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSetupKey = () => {
    const currentKey = localStorage.getItem('GEMINI_API_KEY') || '';
    const newKey = window.prompt("Nhập mã API Google Gemini của bạn:", currentKey);
    if (newKey !== null) {
      localStorage.setItem('GEMINI_API_KEY', newKey.trim());
      setHasKey(!!newKey.trim());
      alert("Đã lưu API Key thành công!");
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 glass-liquid transition-all duration-300">
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="relative w-11 h-11 flex items-center justify-center bg-white/5 rounded-full shadow-lg border border-mystic-copper/30 group-hover:border-mystic-copper/60 transition-all duration-500">
          {/* Custom Tu Vi Icon (Yin Yang / Bagua Stylized) */}
          <svg viewBox="0 0 100 100" className="w-8 h-8 text-mystic-copper drop-shadow-[0_0_8px_rgba(253,186,116,0.5)]">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#FDBA74', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" stroke="url(#grad1)" strokeWidth="2" fill="none" />
            <path d="M50 5 A45 45 0 0 1 50 95 A22.5 22.5 0 0 1 50 50 A22.5 22.5 0 0 0 50 5" fill="url(#grad1)" opacity="0.9" />
            <circle cx="50" cy="27.5" r="6" fill="#1e293b" />
            <circle cx="50" cy="72.5" r="6" fill="url(#grad1)" />
          </svg>
        </div>
        <h1 className="hidden md:block text-xl md:text-2xl font-display font-bold text-white tracking-wider hover:text-mystic-copper transition-colors">
          Tử Vi Tinh Anh
        </h1>
      </div>

      <nav className="flex items-center gap-4 md:gap-8 text-sm font-sans font-medium tracking-widest text-slate-300 uppercase">
        <button
          onClick={handleSetupKey}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${hasKey ? 'border-green-500/50 text-green-400 bg-green-900/10' : 'border-mystic-copper/50 text-mystic-copper bg-orange-900/10 hover:bg-orange-900/20'}`}
          title="Cài đặt Google API Key"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <span className="hidden md:inline">{hasKey ? 'Đã có Key' : 'Nhập API Key'}</span>
        </button>

        <a href="#input-area" onClick={scrollToInput} className="hover:text-mystic-copper transition-colors relative group">
          Luận Giải
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mystic-copper group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="https://thienluong.net/" target="_blank" rel="noopener noreferrer" className="hover:text-mystic-copper transition-colors relative group hidden sm:block">
          Lấy Lá Số
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mystic-copper group-hover:w-full transition-all duration-300"></span>
        </a>
      </nav>
    </header>
  );
};

export default Header;