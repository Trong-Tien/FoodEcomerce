import type { ReactNode } from "react";

export type QuickMenuItem = {
  name: string;
  icon: ReactNode;
};

interface QuickMenuProps {
  items: QuickMenuItem[];
}

function QuickMenu({ items }: QuickMenuProps) {
  return (
    <div className="bg-white shadow-sm border-b py-2">
      <div className="max-w-7xl mx-auto px-4 flex gap-4 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <button
            key={item.name}
            className="flex flex-col items-center justify-center min-w-[60px] p-2 bg-white rounded-lg hover:bg-green-50 transition shadow-sm"
          >
            <div className="text-green-600 text-2xl">{item.icon}</div>
            <span className="text-xs mt-1 text-center">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickMenu;
