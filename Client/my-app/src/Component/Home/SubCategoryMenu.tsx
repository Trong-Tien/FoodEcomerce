import React from "react";
import { useNavigate } from "@tanstack/react-router";

interface SubCategory {
  id: string;
  name: string;
  icon?: string; // URL hình danh mục (nếu có)
}

interface Props {
  parentCategory?: SubCategory; // Category cha
  subCategories: SubCategory[];  // Danh sách subcategory
  activeId?: string;             // ID category hiện tại
}

/**
 * SubCategoryMenuV2
 * - Hiển thị category cha + subcategory theo hàng ngang
 * - Nút active được tô màu xanh
 * - Icon được hiển thị nếu có
 * - Có scroll mượt khi danh mục nhiều
 */
const SubCategoryMenu: React.FC<Props> = ({ parentCategory, subCategories, activeId }) => {
  const navigate = useNavigate();

  if (!parentCategory && subCategories.length === 0) return null;

  // Ghép parent + subcategory vào 1 mảng
  const categoriesToShow: SubCategory[] = parentCategory
    ? [parentCategory, ...subCategories]
    : [...subCategories];

  return (
    <nav className="bg-white border-t border-b border-green-200 shadow-sm sticky top-[120px] z-[10]">
      <div className="max-w-7xl mx-auto flex overflow-x-auto gap-3 px-3 py-3 scrollbar-hide">
        {categoriesToShow.map((cat) => (
          <button
  key={cat.id}
  onClick={() =>
    navigate({
      to: "/category/$category",
      params: { category: cat.id },
    })
  }
  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition duration-200 ${
    activeId === cat.id
      ? "bg-green-600 text-white shadow"
      : "bg-green-50 text-green-700 hover:bg-green-100"
  }`}
>
  {cat.icon && (
    <img
      src={cat.icon}
      alt={cat.name}
      className="w-6 h-6 object-cover rounded-md border border-green-200"
    />
  )}
  <span className="truncate">{cat.name}</span>
</button>

        ))}
      </div>
    </nav>
  );
};

export default SubCategoryMenu;
