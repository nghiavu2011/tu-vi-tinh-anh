import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Huyền Cơ Vũ Trụ & Vận Mệnh Con Người",
      title: "Thiên Bàn",
      highlight: "Định Số",
      subtitle: "Tinh Tú An Bài",
      desc: '"Mỗi ngôi sao trên bầu trời là một lời giải cho vận mệnh dưới trần gian". Khám phá bản đồ cuộc đời qua lăng kính Tử Vi Đẩu Số.',
      colorClass: "from-mystic-copper via-yellow-200 to-mystic-copper",
      badgeClass: "text-mystic-copper",
      descHighlightClass: "text-mystic-copper"
    },
    {
      badge: "Khám Phá Bí Ẩn Ngàn Năm",
      title: "Vận Mệnh",
      highlight: "Kỳ Thư",
      subtitle: "Giải Mã Cuộc Đời",
      desc: 'Khoa học dự đoán phương Đông giúp bạn thấu hiểu bản thân, nắm bắt thời cơ và làm chủ vận mệnh của chính mình.',
      colorClass: "from-blue-400 via-purple-300 to-blue-400",
      badgeClass: "text-blue-300",
      descHighlightClass: "text-blue-400"
    },
    {
      badge: "Tinh Hoa Lý Số Á Đông",
      title: "Càn Khôn",
      highlight: "Xoay Chuyển",
      subtitle: "Đạo Sống Ở Đời",
      desc: 'Không chỉ là dự đoán, Tử Vi còn là bài học về nhân sinh, giúp ta sống thuận theo tự nhiên và tu dưỡng phẩm hạnh.',
      colorClass: "from-yellow-300 via-amber-200 to-yellow-400",
      badgeClass: "text-yellow-300",
      descHighlightClass: "text-yellow-400"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToInput = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('input-area');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center">

      <div className="container mx-auto px-6 relative z-20 mt-10">
        <div className="flex flex-col items-center text-center gap-8">

          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
            >
              <div className={`glass-liquid px-8 py-3 rounded-full ${slide.badgeClass} text-xs md:text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 shadow-sm`}>
                {slide.badge}
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {slide.title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.colorClass} font-serif font-light italic`}>{slide.highlight}</span>
              </h2>

              <h3 className="text-2xl md:text-4xl font-serif font-light text-slate-300 italic -mt-4 tracking-wider mb-4">
                {slide.subtitle}
              </h3>

              <p className="text-slate-300 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-sans px-4">
                {slide.desc}
              </p>
            </div>
          ))}

          {/* Spacer to push buttons down since slides are absolute */}
          <div className="h-[300px] md:h-[350px]"></div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto relative z-30">
            <a
              href="#input-area"
              onClick={scrollToInput}
              className="relative overflow-hidden px-10 py-4 bg-white text-slate-900 font-display font-bold uppercase tracking-widest hover:bg-mystic-copper hover:text-white transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-sm text-center text-sm md:text-base group"
            >
              <span className="relative z-10">Luận Giải Ngay</span>
            </a>
            <a
              href="https://thienluong.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 glass-liquid text-white border border-white/20 font-display font-bold uppercase tracking-widest hover:bg-white/10 hover:border-mystic-copper hover:text-mystic-copper transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-center text-sm md:text-base rounded-sm"
            >
              Lấy Lá Số
            </a>
          </div>

          {/* Dots Navigation */}
          <div className="flex gap-3 justify-center mt-8 relative z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-mystic-copper w-8' : 'bg-white/20 hover:bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;