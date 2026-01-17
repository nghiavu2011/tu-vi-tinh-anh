import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black/20 backdrop-blur-md border-t border-white/10 pt-16 pb-12 mt-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white">Tử Vi Tinh Anh</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-serif font-light italic">
              "Thấu hiểu bản thân là khởi nguồn của mọi trí tuệ."
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center">
            <h4 className="text-mystic-copper font-display font-bold text-xs uppercase tracking-[0.2em] mb-6">Khám Phá</h4>
            <ul className="space-y-4 text-sm text-slate-300 font-sans font-medium tracking-wide">
              <li><a href="#" className="hover:text-mystic-copper transition-colors">Trang Chủ</a></li>
              <li><a href="#input-area" className="hover:text-mystic-copper transition-colors">Luận Giải</a></li>
              <li><a href="https://thienluong.net/" className="hover:text-mystic-copper transition-colors">Lấy Lá Số</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="text-center md:text-right">
             <h4 className="text-mystic-copper font-display font-bold text-xs uppercase tracking-[0.2em] mb-6">Kết Nối</h4>
             <a 
              href="https://www.youtube.com/@Thienluongtuvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-slate-400 text-xs font-sans font-medium tracking-wider uppercase">
            © 2026 Tử Vi Tinh Anh.- design by Andy AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;