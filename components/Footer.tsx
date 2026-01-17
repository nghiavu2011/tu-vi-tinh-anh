import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black/20 backdrop-blur-md border-t border-white/10 pt-16 pb-12 mt-20 relative overflow-hidden">

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white">Tử Vi Tinh Anh</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-serif font-light italic">
              "Thấu hiểu bản thân là khởi nguồn của mọi trí tuệ."
            </p>
          </div>

          {/* Column 2: Legal Disclaimer */}
          <div className="col-span-1 md:col-span-2 text-justify">
            <h4 className="text-mystic-copper font-display font-bold text-xs uppercase tracking-[0.2em] mb-6">Miễn Trừ Trách Nhiệm</h4>
            <div className="space-y-4 text-xs text-slate-400 font-sans font-light leading-relaxed border-l-2 border-slate-700 pl-4">
              <p>
                <strong>1. Về Kết Quả Luận Giải:</strong> Các thông tin và phân tích được cung cấp bởi hệ thống AI ("Tử Vi Tinh Anh") chỉ mang tính chất tham khảo, giải trí và chiêm nghiệm cá nhân dựa trên các tài liệu tử vi học. Chúng tôi <strong>không chịu trách nhiệm pháp lý</strong> cho bất kỳ quyết định cá nhân, tài chính, y tế hoặc đầu tư nào của người sử dụng dựa trên kết quả này.
              </p>
              <p>
                <strong>2. Về Dữ Liệu & Bảo Mật:</strong> Ứng dụng hoạt động theo cơ chế <em>"Client-Side Only"</em> (Xử lý trực tiếp trên trình duyệt của bạn). Chúng tôi <strong>không lưu trữ</strong> hình ảnh lá số, ghi chú cá nhân hay API Key của bạn trên bất kỳ máy chủ nào. Mọi dữ liệu được gửi trực tiếp từ máy của bạn đến Google AI Server và bị hủy ngay sau khi phiên làm việc kết thúc.
              </p>
              <p>
                <strong>3. Về API Google:</strong> Việc sử dụng API Key cá nhân tuân thủ theo chính sách của Google. Người dùng tự chịu trách nhiệm về chi phí hoặc giới hạn hạn ngạch (nếu có) từ Google.
              </p>
            </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <p className="mt-4 text-xs text-slate-500">Contact for work: nguyenminh@nmstudio.vn</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-slate-500 text-[10px] font-sans font-medium tracking-wider uppercase">
            © 2026 Tử Vi Tinh Anh. All rights reserved. <br />
            Sản phẩm được phát triển bởi NM Studio & Andy AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;