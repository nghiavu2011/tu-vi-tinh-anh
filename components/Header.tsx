import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { loginWithGoogle, logout, db } from '../src/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchKey = async () => {
      // 1. Check localStorage first
      const localKey = localStorage.getItem('GEMINI_API_KEY');
      if (localKey) {
        setHasKey(true);
      } else if (user) {
        // 2. If logged in and no local key, check Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().apiKey) {
            const apiK = userDoc.data().apiKey;
            localStorage.setItem('GEMINI_API_KEY', apiK);
            setHasKey(true);
          }
        } catch (e) {
          console.error("Error fetching key from Firestore:", e);
        }
      }
    };

    if (!loading) {
      fetchKey();
    }
  }, [user, loading]);

  const scrollToInput = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('input-area');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSetupKey = async () => {
    const currentKey = localStorage.getItem('GEMINI_API_KEY') || '';
    const newKey = window.prompt("Nhập mã API Google Gemini của bạn:", currentKey);

    if (newKey !== null) {
      const trimmedKey = newKey.trim();
      localStorage.setItem('GEMINI_API_KEY', trimmedKey);
      setHasKey(!!trimmedKey);

      if (trimmedKey && user) {
        // Sync to Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), { apiKey: trimmedKey }, { merge: true });
          alert("Đã lưu API Key vào tài khoản của bạn!");
        } catch (e) {
          console.error("Error syncing to Firestore:", e);
        }
      } else if (trimmedKey) {
        alert("Đã lưu API Key thành công!");
      }
    }
  };

  return (
    <>
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleSetupKey}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${hasKey ? 'border-green-500/50 text-green-400 bg-green-900/10' : 'border-mystic-copper/50 text-mystic-copper bg-orange-900/10 hover:bg-orange-900/20'}`}
              title="Cài đặt Google API Key"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              <span className="hidden md:inline">{hasKey ? 'Đã có Key' : 'Nhập Key'}</span>
            </button>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-600 text-slate-400 hover:text-mystic-copper hover:border-mystic-copper transition-colors"
              title="Hướng dẫn lấy API Key"
            >
              ?
            </button>
          </div>

          {!loading && (
            user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 border border-white/10 rounded-full pr-3 py-0.5 hover:bg-white/5 transition-colors"
                >
                  <img src={user.photoURL || ''} alt="avatar" className="w-8 h-8 rounded-full border border-mystic-copper/50" />
                  <span className="hidden sm:inline lowercase text-[10px] tracking-widest">{user.displayName?.split(' ').pop()}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 glass-liquid border border-white/10 rounded-xl overflow-hidden shadow-2xl py-2 animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { window.location.hash = 'history'; setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs hover:text-mystic-copper transition-colors"
                    >
                      Lịch sử xem
                    </button>
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs text-red-400 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all"
              >
                Đăng nhập
              </button>
            )
          )}
        </nav>
      </header>

      {/* API Key Instructions Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="bg-[#0f172a] border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-4">Hướng dẫn lấy API Key (Miễn phí)</h3>
            <ol className="list-decimal list-inside text-slate-300 space-y-3 mb-6 font-sans text-sm leading-relaxed">
              <li>Truy cập <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-mystic-copper hover:underline font-bold">Google AI Studio</a>.</li>
              <li>Đăng nhập bằng tài khoản Google của bạn.</li>
              <li>Nhấn vào nút <strong className="text-white">Create API Key</strong>.</li>
              <li>Chọn dự án mới hoặc một dự án có sẵn.</li>
              <li>Sao chép mã Key vừa tạo (bắt đầu bằng <code className="bg-slate-800 px-1 py-0.5 rounded text-yellow-300">AIza...</code>).</li>
              <li>Quay lại đây, nhấn nút <strong>"Nhập Key"</strong> và dán vào.</li>
            </ol>

            <div className="flex justify-end">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2 bg-mystic-copper text-slate-900 font-bold rounded-lg hover:bg-orange-300 transition-colors"
              >
                Lấy Key Ngay
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;