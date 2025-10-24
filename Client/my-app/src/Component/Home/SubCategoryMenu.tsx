import React from "react";
import { useNavigate } from "@tanstack/react-router";

interface SubCategory {
  id: string;
  name: string;
  icon?: string; // URL hình danh mục (nếu có)
}

interface Props {
  subCategories: SubCategory[];
  activeId?: string; // danh mục hiện tại
}

/**
 * SubCategoryMenu
 * - Hiển thị danh mục con theo hàng ngang, có thể cuộn.
 * - Nút đang chọn được tô màu xanh.
 * - Có thể hiển thị hình đại diện (nếu backend trả imageUrl).
 */
const SubCategoryMenu: React.FC<Props> = ({ subCategories, activeId }) => {
  const navigate = useNavigate();

  if (subCategories.length === 0) return null;

  return (
    <nav className="bg-white border-t border-b border-green-200 shadow-sm sticky top-[120px] z-[10]">
      <div className="max-w-7xl mx-auto flex overflow-x-auto gap-3 px-3 py-3 scrollbar-hide">
        {subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() =>
              navigate({
                to: "/category/$category",
                params: { category: sub.id },
              })
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition duration-200 ${
              activeId === sub.id
                ? "bg-green-600 text-white shadow"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {sub.icon && (
              <img
                src={sub.icon}
                alt={sub.name}
                className="w-6 h-6 object-cover rounded-md border border-green-200"
              />
            )}
            <span className="truncate">{sub.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SubCategoryMenu;
