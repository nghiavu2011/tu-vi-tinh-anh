import React, { useRef, useState } from 'react';

interface InputSectionProps {
  onImageSelect: (file: File | null) => void;
  onNotesChange: (text: string) => void;
  image: File | null;
  notes: string;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  onImageSelect, 
  onNotesChange, 
  image, 
  notes,
  isLoading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Image Upload Area */}
        <div 
          className={`relative h-64 border-2 border-dashed transition-all duration-500 ease-out flex flex-col items-center justify-center cursor-pointer overflow-hidden group rounded-2xl glass-liquid
            ${dragActive 
              ? 'border-mystic-copper bg-white/10 scale-[1.02]' 
              : image 
                ? 'border-mystic-copper/50' 
                : 'border-slate-600 hover:border-mystic-copper/50 hover:bg-white/5'
            }
            ${isLoading ? 'opacity-50 pointer-events-none grayscale' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden"
          />
          
          {image ? (
            <div className="flex flex-col items-center z-10 w-full h-full p-4">
               <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
               <div className="absolute bottom-2 left-0 w-full text-center">
                  <span className="text-xs text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full font-sans">Nhấn để thay đổi</span>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 z-10">
               <div className="mb-4 text-slate-500 group-hover:text-mystic-copper transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
               </div>
              <p className="font-display font-bold text-lg text-slate-300 group-hover:text-mystic-copper transition-colors">Tải lên Ảnh Lá Số</p>
              <p className="text-xs mt-2 text-slate-500 font-sans font-medium">JPG, PNG hoặc PDF</p>
            </div>
          )}
        </div>

        {/* Notes Area */}
        <div className="flex flex-col h-64">
           <div className="flex-1 glass-liquid rounded-2xl border border-slate-600 p-1 focus-within:border-mystic-copper/50 focus-within:bg-white/5 transition-all relative">
              <textarea
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Ghi chú thêm về băn khoăn của bạn (Tình duyên, Sự nghiệp...)..."
                className="w-full h-full bg-transparent p-6 text-slate-200 placeholder:text-slate-500 focus:outline-none font-sans font-normal text-sm resize-none rounded-xl"
                disabled={isLoading}
              />
              <div className="absolute bottom-4 right-4">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                 </svg>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;