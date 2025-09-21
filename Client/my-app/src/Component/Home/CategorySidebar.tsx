import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// Kiểu dữ liệu Category từ API
interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string; // Backend trả về relative path
}

const API_BASE = "http://localhost:5292/api";

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/Category/GetAll`);
  if (!res.ok) throw new Error("Không thể tải danh mục");
  const data = await res.json();
  return data.items || [];
}

function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="bg-white shadow-md w-[260px] rounded-lg overflow-hidden">
      <ul>
        {loading && <li className="px-4 py-3 text-gray-500">Đang tải...</li>}
        {!loading &&
          categories.map((c) => (
            <li key={c.id}>
              <Link
                to="/category/$category"
                params={{ category: c.id }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                {c.imageUrl && (
                  <img
                    src={`${API_BASE}/File/image?path=${encodeURIComponent(c.imageUrl)}`}
                    alt={c.name}
                    className="w-6 h-6 object-cover rounded"
                  />
                )}
                <span className="text-sm font-medium">{c.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}

export default CategorySidebar;
