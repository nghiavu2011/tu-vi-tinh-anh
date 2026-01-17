import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import YouTubeBanner from './components/YouTubeBanner';
import Footer from './components/Footer';
import SchoolSelector from './components/SchoolSelector';
import InputSection from './components/InputSection';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import InstructionModal from './components/InstructionModal';
import HistorySection from './components/HistorySection';
import { analyzeHoroscope } from './services/geminiService';
import { SchoolStyle } from './types';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { db } from './src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [school, setSchool] = useState<SchoolStyle>(SchoolStyle.THAI_THU_LANG);
  const [image, setImage] = useState<File | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Visitor Analytics
  useEffect(() => {
    const logVisitor = async () => {
      try {
        const country = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const referrer = document.referrer || 'Direct';
        const platform = navigator.platform;

        await addDoc(collection(db, 'analytics'), {
          timestamp: serverTimestamp(),
          country,
          referrer,
          platform,
          userAgent: navigator.userAgent,
          userId: user?.uid || 'anonymous',
          email: user?.email || 'anonymous'
        });
      } catch (e) {
        console.error("Error logging visitor:", e);
      }
    };
    logVisitor();
  }, [user]);

  const handleAnalyze = async () => {
    if (!image && !notes.trim()) {
      setError('Vui lòng tải lên ảnh lá số hoặc nhập mô tả chi tiết.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    const resultElement = document.getElementById('analyze-result');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const analysis = await analyzeHoroscope(image, notes, school);
      setResult(analysis);

      // Save to History if logged in
      if (user) {
        try {
          await addDoc(collection(db, 'horoscopes'), {
            userId: user.uid,
            timestamp: serverTimestamp(),
            school,
            notes: notes.substring(0, 200),
            result: analysis
          });
        } catch (e) {
          console.error("Error saving to history:", e);
        }
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra kết nối hoặc API Key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImage(null);
    setNotes('');
    setError(null);
    const topElement = document.getElementById('input-area');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-mystic-copper selection:text-black flex flex-col relative">
      <Header />

      {!result && (
        <>
          <HeroSection />
          <YouTubeBanner />
        </>
      )}

      <div id="input-area" className="pt-10"></div>

      <main className="flex-grow container mx-auto transition-all duration-500 relative z-10 px-4 md:px-0">
        {!result ? (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12 cursor-pointer group pt-10" onClick={() => setIsModalOpen(true)}>
              <div className="inline-block relative">
                <h3 className="text-xl md:text-2xl font-serif font-light text-slate-300 mb-2 group-hover:text-mystic-copper transition-colors italic">
                  "Ngay khi thực hiện theo hướng dẫn sẽ có luận giải ngay"
                </h3>
                <div className="h-px w-0 bg-mystic-copper mx-auto group-hover:w-full transition-all duration-500"></div>
                <div className="mt-2 text-xs text-slate-400 font-sans font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  (Nhấn để xem hướng dẫn)
                </div>
              </div>
            </div>

            <SchoolSelector selected={school} onSelect={setSchool} />

            <h3 className="text-center font-display font-bold text-2xl text-white mb-8 uppercase tracking-[0.2em] pt-8 drop-shadow-md">
              Thông Tin Lá Số
            </h3>

            <InputSection
              image={image}
              onImageSelect={setImage}
              notes={notes}
              onNotesChange={setNotes}
              isLoading={isLoading}
            />

            {error && (
              <div className="max-w-lg mx-auto mt-8 p-4 bg-red-900/30 border border-red-500/50 text-red-300 text-center text-sm font-sans font-medium rounded-lg animate-pop-in">
                {error}
              </div>
            )}

            <div className="mt-16 flex justify-center pb-20">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={!image && !notes}
                  className={`
                    px-12 py-5 bg-white text-slate-900 font-display font-bold text-lg uppercase tracking-[0.15em] transition-all duration-300 transform relative overflow-hidden group rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]
                    ${(!image && !notes)
                      ? 'opacity-50 cursor-not-allowed bg-slate-600 text-slate-400 shadow-none'
                      : 'hover:bg-mystic-copper hover:text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(253,186,116,0.6)]'
                    }
                  `}
                >
                  <span className="relative z-10">Bắt Đầu Luận Giải</span>
                </button>
              )}
            </div>

            {user && <HistorySection />}
          </div>
        ) : (
          <div id="analyze-result" className="space-y-12 animate-fade-in-up py-12">
            <ResultDisplay result={result} school={school} />

            <div className="flex justify-center pt-8 pb-12">
              <button
                onClick={handleReset}
                className="group px-8 py-3 bg-transparent border border-white/20 text-slate-300 hover:border-mystic-copper hover:text-mystic-copper transition-all duration-300 flex items-center gap-3 font-display font-bold uppercase text-sm tracking-widest rounded-full shadow-sm hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Luận giải lá số khác
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <InstructionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Admin Panel Link for Special User */}
      {user?.email === 'nghiavu2011@gmail.com' && (
        <a
          href="https://console.firebase.google.com/"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 left-4 z-[9999] px-3 py-1 bg-red-600 text-white text-[10px] rounded-full font-bold uppercase tracking-tighter hover:bg-red-700 transition-colors"
        >
          Admin Analytics
        </a>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;