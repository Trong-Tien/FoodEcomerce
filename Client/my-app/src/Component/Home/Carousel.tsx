"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
]

const Carousel = () => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 4000)
    return () => clearInterval(t)
  }, [])

  const prevSlide = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const nextSlide = () => setIdx((i) => (i + 1) % SLIDES.length)

  return (
    <div className="relative w-full overflow-hidden rounded-lg group">
      {SLIDES.map((s, i) => (
        <img
          key={s.id}
          src={s.img || "/placeholder.svg"}
          alt={s.title}
          className={`w-full h-56 md:h-96 object-cover transition-all duration-1000 ${
            i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 absolute inset-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute bottom-6 left-8 md:bottom-10 md:left-10">
        <h2 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">{SLIDES[idx].title}</h2>
      </div>

      <div className="absolute bottom-6 right-8 md:bottom-10 md:right-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`transition-all duration-300 ${
              i === idx ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default Carousel
