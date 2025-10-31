"use client"

import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { categoryService } from "@/Services/CategoryService"
import type { Category } from "@/Type/Category"
import { ChevronRight, ChevronDown, Leaf } from "lucide-react"

function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [openIds, setOpenIds] = useState<string[]>([])

  useEffect(() => {
    categoryService
      .getAll()
      .then(setCategories)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const renderCategory = (c: Category, level = 0) => {
    const hasChildren = c.categorys && c.categorys.length > 0
    const isOpen = openIds.includes(c.id)
    const isParent = level === 0

    return (
      <li key={c.id} className="list-none">
        <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 ${
            isParent
              ? "hover:bg-emerald-50 border-l-4 border-transparent hover:border-emerald-500"
              : "hover:bg-gray-50 ml-2"
          }`}
          onClick={() => hasChildren && toggleOpen(c.id)}
        >
          <Link
            to="/category/$category"
            params={{ category: c.id }}
            className={`flex items-center gap-3 flex-1 transition-colors ${
              isParent
                ? "text-gray-700 hover:text-emerald-600 font-medium"
                : "text-gray-600 hover:text-emerald-600 text-sm"
            }`}
          >
            {c.imageUrl ? (
              <img
                src={c.imageUrl || "/placeholder.svg"}
                alt={c.name}
                className={`object-cover rounded-md transition-transform hover:scale-110 ${
                  isParent ? "w-6 h-6" : "w-5 h-5"
                }`}
              />
            ) : (
              <Leaf
                className={`text-emerald-500 transition-transform hover:scale-110 ${isParent ? "w-5 h-5" : "w-4 h-4"}`}
              />
            )}
            <span>{c.name}</span>
          </Link>

          {hasChildren && (
            <span className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </span>
          )}
        </div>

        {hasChildren && isOpen && (
          <ul className="space-y-1 border-l-2 border-emerald-100 ml-6 pl-0">
            {c.categorys.map((child) => renderCategory(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <aside className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-transparent">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600" />
          Danh mục sản phẩm
        </h3>
      </div>

      <ul className="space-y-1 p-2">
        {loading && <li className="px-4 py-3 text-gray-500 text-sm animate-pulse">Đang tải...</li>}
        {!loading && categories.length > 0 && categories.map((c) => renderCategory(c))}
        {!loading && categories.length === 0 && (
          <li className="px-4 py-3 text-gray-500 text-sm text-center">Chưa có danh mục</li>
        )}
      </ul>
    </aside>
  )
}

export default CategorySidebar
