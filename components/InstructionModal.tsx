import React from 'react';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content - Glass White */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl max-w-2xl w-full shadow-2xl animate-pop-in overflow-hidden">
        
        {/* Decorative Header Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-mystic-copper to-transparent opacity-50"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-display font-bold text-slate-800">
              Hướng Dẫn Lấy Lá Số Chuẩn
            </h3>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-red-500 transition-colors bg-slate-100 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 font-sans font-normal text-slate-600">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-mystic-copper flex items-center justify-center font-bold border border-orange-200 shadow-sm">1</div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">Truy cập ThienLuong.net</h4>
                <p className="text-sm">Nhấn vào nút "Lấy Lá Số" trên menu hoặc truy cập trực tiếp website <a href="https://thienluong.net" target="_blank" className="text-mystic-copper underline decoration-dotted font-medium">thienluong.net</a>.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-mystic-copper flex items-center justify-center font-bold border border-orange-200 shadow-sm">2</div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">Nhập thông tin cá nhân</h4>
                <p className="text-sm">Điền đầy đủ: Họ tên, Ngày/Tháng/Năm sinh (Dương lịch hoặc Âm lịch), và đặc biệt là <strong>Giờ sinh</strong> chính xác.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-mystic-copper flex items-center justify-center font-bold border border-orange-200 shadow-sm">3</div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">Chụp ảnh lá số</h4>
                <p className="text-sm">Sau khi lá số hiện ra, hãy chụp ảnh màn hình (Screenshot) hoặc tải ảnh về máy. Đảm bảo ảnh rõ nét, nhìn thấy rõ các cung và sao.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-mystic-copper flex items-center justify-center font-bold border border-orange-200 shadow-sm">4</div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">Tải lên ứng dụng</h4>
                <p className="text-sm">Quay lại đây, kéo thả ảnh vào khung "Tải lên hình ảnh" và nhấn "Bắt Đầu Luận Giải".</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button 
              onClick={onClose}
              className="bg-slate-800 text-white hover:bg-mystic-copper px-8 py-3 rounded-full font-bold font-display uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;