import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { loginUser, registerUser, logout, db } from '../src/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [isKeyInstallerOpen, setIsKeyInstallerOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  // Magic Installer States
  const [isInstalling, setIsInstalling] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const fetchKey = async () => {
      const localKey = localStorage.getItem('GEMINI_API_KEY');
      if (localKey) {
        setHasKey(true);
      } else if (user) {
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isRegistering) {
        await registerUser(email, password, name);
      } else {
        await loginUser(email, password);
      }
      setIsAuthModalOpen(false);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err: any) {
      setAuthError(err.message || 'Có lỗi xảy ra, vui lòng kiểm tra lại.');
    }
  };

  const saveApiKey = async (rawKey: string) => {
    const trimmedKey = rawKey.trim();
    if (!trimmedKey.startsWith('AIza')) {
      alert("Mã API không hợp lệ. Vui lòng kiểm tra lại (Mã thường bắt đầu bằng 'AIza')");
      return;
    }

    setIsInstalling(true);
    localStorage.setItem('GEMINI_API_KEY', trimmedKey);
    setHasKey(true);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { apiKey: trimmedKey }, { merge: true });
      } catch (e) {
        console.error("Sync error:", e);
      }
    }

    setTimeout(() => {
      setIsInstalling(false);
      setIsKeyInstallerOpen(false);
      alert("Kích hoạt thành công! Bạn đã có thể bắt đầu luận giải.");
    }, 800);
  };

  const handleMagicPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim().startsWith('AIza')) {
        saveApiKey(text);
      } else {
        const manual = window.prompt("Chúng tôi không thấy mã trong bộ nhớ đệm. Vui lòng dán mã (Ctrl+V) vào đây:", "");
        if (manual) saveApiKey(manual);
      }
    } catch (err) {
      const manual = window.prompt("Vui lòng dán mã API Google Gemini của bạn vào đây:", "");
      if (manual) saveApiKey(manual);
    }
  };

  return (
    <>
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 glass-liquid transition-all duration-300">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-11 h-11 flex items-center justify-center bg-white/5 rounded-full shadow-lg border border-mystic-copper/30 group-hover:border-mystic-copper/60 transition-all duration-500">
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
              onClick={() => setIsKeyInstallerOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${hasKey ? 'border-green-500/50 text-green-400 bg-green-900/10' : 'border-mystic-copper/50 text-mystic-copper bg-orange-900/10 hover:bg-orange-900/20 shadow-[0_0_15px_rgba(253,186,116,0.2)]'}`}
            >
              <div className={`w-2 h-2 rounded-full animate-pulse ${hasKey ? 'bg-green-400' : 'bg-mystic-copper'}`}></div>
              <span className="hidden md:inline font-bold tracking-[0.1em] text-[10px]">
                {hasKey ? 'API SẴN SÀNG' : 'CHƯA CÓ CHÌA KHÓA'}
              </span>
            </button>
          </div>

          {!loading && (
            user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 border border-white/10 rounded-full pl-1 pr-3 py-0.5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mystic-copper to-orange-200 flex items-center justify-center text-slate-900 font-bold text-xs uppercase shadow-inner">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline lowercase text-[10px] tracking-widest max-w-[80px] truncate">
                    {user.displayName?.split(' ').pop() || user.email?.split('@')[0]}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 glass-liquid border border-white/10 rounded-xl overflow-hidden shadow-2xl py-2 animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                      <p className="text-[10px] text-slate-400 truncate font-sans lowercase">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        const el = document.getElementById('history');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs hover:text-mystic-copper transition-colors uppercase tracking-widest font-sans"
                    >
                      Lịch sử xem
                    </button>
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs text-red-400 transition-colors uppercase tracking-widest font-sans"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all"
              >
                Đăng nhập
              </button>
            )
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl max-w-sm w-full p-8 shadow-2xl relative">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-widest">{isRegistering ? 'Tạo tài khoản' : 'Đăng nhập'}</h3>
            <p className="text-xs text-slate-500 mb-8">Đăng nhập để lưu trữ lịch sử xem tử vi của bạn.</p>
            <form onSubmit={handleAuth} className="space-y-4">
              {isRegistering && (
                <div><label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">Tên hiển thị</label><input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-mystic-copper transition-colors" /></div>
              )}
              <div><label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-mystic-copper transition-colors" /></div>
              <div><label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-2">Mật khẩu</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-mystic-copper transition-colors" /></div>
              {authError && <p className="text-[10px] text-red-400">{authError}</p>}
              <button type="submit" className="w-full py-4 bg-white text-slate-900 font-display font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-mystic-copper hover:text-white transition-all shadow-lg">{isRegistering ? 'Đăng ký ngay' : 'Vào ứng dụng'}</button>
            </form>
            <div className="text-center pt-4"><button onClick={() => setIsRegistering(!isRegistering)} className="text-[10px] text-slate-500 hover:text-mystic-copper uppercase tracking-widest font-sans underline underline-offset-4 decoration-white/10">{isRegistering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}</button></div>
          </div>
        </div>
      )}

      {/* Magic API Key Installer Modal */}
      {isKeyInstallerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-white">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-mystic-copper/10 rounded-full blur-3xl"></div>

            <button onClick={() => setIsKeyInstallerOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-mystic-copper">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold uppercase tracking-widest text-white">Cài đặt Chìa Khóa</h3>
                  <p className="text-[10px] text-slate-400 tracking-wider">KÍCH HOẠT TRÍ TUỆ NHÂN TẠO GEMINI (MIỄN PHÍ)</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-mystic-copper/30 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-mystic-copper uppercase mb-1 block">Bước 1: Nhận mã</span>
                      <p className="text-xs text-slate-300 leading-relaxed">Nhấn nút bên cạnh để mở trang lấy mã API của Google (Hoàn toàn miễn phí).</p>
                    </div>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      className="whitespace-nowrap px-4 py-2 bg-mystic-copper text-slate-900 font-bold text-[10px] rounded-full hover:bg-orange-300 transition-all flex items-center gap-2"
                    >
                      MỞ TRANG LẤY MÃ
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-mystic-copper/30 transition-all">
                  <span className="text-[10px] font-bold text-mystic-copper uppercase mb-1 block">Bước 2: Kích hoạt ảo thuật</span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">Sau khi đã <strong className="text-white">Copy</strong> mã được Google cung cấp, hãy nhấn nút dưới đây để hệ thống tự động nhận diện và dán mã.</p>

                  <button
                    onClick={handleMagicPaste}
                    disabled={isInstalling}
                    className={`w-full py-3 rounded-xl font-display font-bold text-[10px] flex items-center justify-center gap-3 transition-all ${isInstalling ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-900 hover:bg-mystic-copper hover:text-white shadow-lg shadow-white/5'}`}
                  >
                    {isInstalling ? (
                      <>
                        <div className="w-3 h-3 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                        ĐANG KÍCH HOẠT...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-3.441 2.14-2.141c2.235-2.235 2.459-5.56.473-7.547-1.987-1.987-5.312-1.763-7.547.473-1.987-1.987-5.312-1.763-7.547.473L4.634 8.35c-2.235 2.235-2.459 5.56-.473 7.547 1.987 1.987 5.312 1.763 7.547-.473l2.14-2.141Zm0 0 2.51-2.225-1.183-5.013" />
                        </svg>
                        TỰ ĐỘNG DÁN & KÍCH HOẠT
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      const manual = window.prompt("Nhập mã API cá nhân của bạn:", "");
                      if (manual) saveApiKey(manual);
                    }}
                    className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest font-sans underline underline-offset-4 decoration-white/10"
                  >
                    Hoặc nhập mã thủ công
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;