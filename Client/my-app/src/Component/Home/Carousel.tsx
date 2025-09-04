import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop",
    title: "Siêu sale hàng tươi mỗi ngày",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1400&auto=format&fit=crop",
    title: "Combo tiết kiệm cho gia đình",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=1400&auto=format&fit=crop",
    title: "Freeship cho đơn từ 199K",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=1400&auto=format&fit=crop",
    title: "Freeship cho đơn từ 199K",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=1400&auto=format&fit=crop",
    title: "Freeship cho đơn từ 199K",
  },
];

const Carousel = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prevSlide = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setIdx((i) => (i + 1) % SLIDES.length);

  return (
    <div className="relative overflow-hidden">
      {SLIDES.map((s, i) => (
        <img
          key={s.id}
          src={s.img}
          alt={s.title}
          className={`w-full h-56 md:h-72 object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        />
      ))}

      {/* Overlay title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-3 left-4 text-white font-semibold drop-shadow">
        {SLIDES[idx].title}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === idx ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        aria-label="Next slide"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
