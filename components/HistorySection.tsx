import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { db } from '../src/lib/firebase';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';

interface HistoryItem {
    id: string;
    timestamp: any;
    school: string;
    notes: string;
    result: string;
}

const HistorySection: React.FC = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const q = query(
                    collection(db, 'horoscopes'),
                    where('userId', '==', user.uid),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                );
                const querySnapshot = await getDocs(q);
                const items: HistoryItem[] = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() } as HistoryItem);
                });
                setHistory(items);
            } catch (e) {
                console.error("Error fetching history:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    if (!user) return null;

    return (
        <section id="history" className="container mx-auto px-6 py-20 border-t border-white/5">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-display font-bold text-white tracking-widest uppercase">Lịch Sử Luận Giải</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-mystic-copper/50 to-transparent"></div>
            </div>

            {loading ? (
                <p className="text-slate-400 animate-pulse">Đang tải lịch sử...</p>
            ) : history.length === 0 ? (
                <div className="text-center py-20 glass-liquid rounded-2xl border border-white/5">
                    <p className="text-slate-400">Bạn chưa có lượt luận giải nào được lưu lại.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {history.map((item) => (
                        <div key={item.id} className="glass-liquid p-6 rounded-2xl border border-white/5 hover:border-mystic-copper/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-bold text-mystic-copper uppercase tracking-widest">Phái: {item.school}</span>
                                <span className="text-[10px] text-slate-500">{item.timestamp?.toDate().toLocaleString('vi-VN')}</span>
                            </div>
                            <p className="text-slate-300 text-sm line-clamp-3 mb-4 font-serif italic">"{item.notes || 'Không có ghi chú'}"</p>
                            <button
                                onClick={() => {
                                    // This is a placeholder for showing full result modal
                                    alert("Kết quả chi tiết:\n\n" + item.result.substring(0, 200) + "...");
                                }}
                                className="text-xs text-white/60 hover:text-white underline underline-offset-4 decoration-mystic-copper/30 transition-all"
                            >
                                Xem lại chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default HistorySection;
