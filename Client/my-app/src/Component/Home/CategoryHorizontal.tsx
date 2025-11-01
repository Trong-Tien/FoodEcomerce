"use client"

import { useEffect, useRef, useState } from "react"
import { categoryService } from "@/Services/CategoryService"
import type { Category } from "@/Type/Category"
import { Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, Zap, Percent, Gift } from "lucide-react"

export default function CategoryHorizontal() {
  const [subCategories, setSubCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // ✅ Thêm danh mục đặc biệt
  const specialItems: Category[] = [
    {
      id: "flash-sale",
      name: "Flash Sale",
      description: "Chương trình giảm giá chớp nhoáng",
      imageUrl: "",
      categoryParentId: "",
      categorys: [],
    },
    {
      id: "weekend-sale",
      name: "Giảm giá cuối tuần",
      description: "Ưu đãi hấp dẫn cuối tuần",
      imageUrl: "",
      categoryParentId: "",
      categorys: [],
    },
    {
      id: "member-deal",
      name: "Ưu đãi thành viên",
      description: "Dành riêng cho thành viên",
      imageUrl: "",
      categoryParentId: "",
      categorys: [],
    },
  ]

  useEffect(() => {
    categoryService
      .getAll()
      .then((data) => {
        const allSubs = data.flatMap((c) => c.categorys || [])
        // ✅ Gộp danh mục đặc biệt + danh mục từ API
        setSubCategories([...specialItems, ...allSubs])
      })
      .catch((err) => console.error("❌ Lỗi tải danh mục:", err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      setCanScrollLeft(scrollRef.current.scrollLeft > 0)
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10,
      )
    }

    const element = scrollRef.current
    element?.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => element?.removeEventListener("scroll", handleScroll)
  }, [subCategories])

  if (loading || subCategories.length === 0) return null

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // ✅ Icon cho các mục đặc biệt
  const getSpecialIcon = (id: string) => {
    switch (id) {
      case "flash-sale":
        return <Zap className="w-5 h-5 text-red-500" />
      case "weekend-sale":
        return <Percent className="w-5 h-5 text-orange-500" />
      case "member-deal":
        return <Gift className="w-5 h-5 text-emerald-500" />
      default:
        return null
    }
  }

  return (
    <div className="relative bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm py-4 px-2 rounded-xl">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex items-center gap-8 overflow-x-auto px-12 scroll-smooth hide-scrollbar"
      >
        {subCategories.map((sub) => (
          <Link
            key={sub.id}
            to={`/category/${sub.id}`}
            className="flex-shrink-0 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-emerald-600 transition-all duration-200 group"
          >
            {getSpecialIcon(sub.id) ? (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-b from-red-50 to-red-100 group-hover:scale-110 transition-transform duration-200">
                {getSpecialIcon(sub.id)}
              </div>
            ) : (
              sub.imageUrl && (
                <div className="relative">
                  <img
                    src={sub.imageUrl || "/placeholder.svg"}
                    alt={sub.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-emerald-50 rounded-full -z-10 group-hover:bg-emerald-100 transition-colors duration-200" />
                </div>
              )
            )}

            <span className="text-xs font-semibold text-center whitespace-nowrap text-gray-700 group-hover:text-emerald-600 transition-colors duration-200">
              {sub.name}
            </span>
          </Link>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
