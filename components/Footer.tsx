import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-black/40 backdrop-blur-md border-t border-white/5 pt-12 pb-8 mt-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 text-center md:text-left">
            {/* Brand */}
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-white tracking-widest">TỬ VI TINH ANH</h3>
              <p className="text-slate-400 text-xs font-serif font-light italic">
                "Thấu hiểu bản thân là khởi nguồn của mọi trí tuệ."
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <h4 className="text-mystic-copper font-display font-bold text-[10px] uppercase tracking-[0.3em]">Kết Nối Tâm Linh</h4>
              <a
                href="https://www.youtube.com/@Thienluongtuvi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-slate-400 hover:text-red-500 transition-all duration-300"
              >
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest group-hover:mr-1 transition-all">YouTube</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-[10px] font-sans font-medium tracking-widest uppercase text-center md:text-left">
              © 2026 TỬ VI TINH ANH. SẢN PHẨM ĐƯỢC PHÁT TRIỂN BỞI <span className="text-mystic-copper">ANDY AI</span>
            </p>

            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="text-[10px] text-slate-500 hover:text-mystic-copper font-sans font-medium tracking-widest uppercase transition-colors underline decoration-slate-500/30 underline-offset-4"
            >
              Miễn trừ trách nhiệm
            </button>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal - Moved outside to avoid stacking context issues with blurred footer */}
      {isDisclaimerOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-fade-in">
          <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative scrollbar-hide">
            <button
              onClick={() => setIsDisclaimerOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-display font-bold text-white mb-8 pr-12">THÔNG BÁO MIỄN TRỪ TRÁCH NHIỆM</h3>

            <div className="space-y-6 text-sm text-slate-300 font-sans font-light leading-relaxed">
              <section>
                <h4 className="text-mystic-copper font-bold uppercase tracking-wider mb-2 text-xs">1. Bản chất dịch vụ</h4>
                <p>
                  "Tử Vi Tinh Anh" là một công cụ ứng dụng Công nghệ Trí tuệ Nhân tạo (AI) để phân tích và diễn giải dữ liệu tử vi học. Các thông tin cung cấp chỉ mang tính chất <strong>chiêm nghiệm, tham khảo và giải trí</strong>. AI không phải là chuyên gia con người và có thể đưa ra các diễn giải không hoàn toàn chính xác theo các quy chuẩn cổ điển.
                </p>
              </section>

              <section>
                <h4 className="text-mystic-copper font-bold uppercase tracking-wider mb-2 text-xs">2. Giới hạn trách nhiệm</h4>
                <p>
                  Chúng tôi <strong>không chịu bất kỳ trách nhiệm pháp lý</strong> nào đối với các tổn thất, thiệt hại hoặc hệ quả phát sinh từ việc người dùng áp dụng kết quả luận giải vào các quyết định quan trọng trong cuộc sống (bao gồm nhưng không giới hạn ở: tài chính, đầu tư, sức khỏe, hôn nhân, sự nghiệp).
                </p>
              </section>

              <section>
                <h4 className="text-mystic-copper font-bold uppercase tracking-wider mb-2 text-xs">3. Bảo mật & API Key</h4>
                <p>
                  Ứng dụng hoạt động dựa trên API Key cho chính người dùng cung cấp. Chúng tôi không thu thập, lưu trữ hay quản lý mã này. Người dùng cần tự bảo mật mã API của mình. Hệ thống xử lý dữ liệu hoàn toàn trên trình duyệt của người dùng (Client-Side), đảm bảo không có bên thứ ba nào tiếp cận được hình ảnh hay ghi chú cá nhân của bạn.
                </p>
              </section>

              <div className="pt-8 border-t border-white/5 mt-8 text-xs text-slate-500 italic">
                Bằng việc sử dụng dịch vụ, bạn xác nhận đã đọc, hiểu và đồng ý với toàn bộ các điều khoản trên.
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="px-8 py-3 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-mystic-copper hover:text-white transition-all rounded-sm"
              >
                Tôi đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;