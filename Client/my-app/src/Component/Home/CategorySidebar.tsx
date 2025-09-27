import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { categoryService } from "@/Services/CategoryService";
import type { Category } from "@/Type/Category";
import { ChevronRight, ChevronDown } from "lucide-react"; // icon mũi tên

function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIds, setOpenIds] = useState<string[]>([]); // quản lý mục đang mở

  useEffect(() => {
    categoryService
      .getAll()
      .then(setCategories)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderCategory = (c: Category) => {
    const hasChildren = c.categorys && c.categorys.length > 0;
    const isOpen = openIds.includes(c.id);

    return (
      <li key={c.id} className="list-none">
        <div
          className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-50 transition-colors"
          onClick={() => hasChildren && toggleOpen(c.id)}
        >
          <Link
            to="/category/$category"
            params={{ category: c.id }}
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 flex-1"
          >
            {c.imageUrl && (
              <img
                src={c.imageUrl}
                alt={c.name}
                className="w-6 h-6 object-cover rounded"
              />
            )}
            <span className="text-sm font-medium">{c.name}</span>
          </Link>

          {hasChildren && (
            <span className="text-gray-500">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </div>

        {hasChildren && isOpen && (
          <ul className="ml-8 list-disc list-outside text-gray-500 space-y-1">
            {c.categorys.map((child) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="bg-white shadow-md w-[260px] rounded-lg overflow-hidden">
      <ul>
        {loading && <li className="px-4 py-3 text-gray-500">Đang tải...</li>}
        {!loading && categories.map((c) => renderCategory(c))}
      </ul>
    </aside>
  );
}

export default CategorySidebar;
