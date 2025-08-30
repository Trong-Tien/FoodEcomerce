import {
  FaHotjar,
  FaDrumstickBite,
  FaLeaf,
  FaWineBottle,
  FaCheese,
  FaBacon,
  FaIceCream,
  FaFish,
  FaBroom,
  FaBaby,
  FaCookieBite,
} from "react-icons/fa";

const CATS = [
  { name: "Khuyến mãi sốc", icon: <FaHotjar /> },
  { name: "Thịt, cá, trứng, hải sản", icon: <FaDrumstickBite /> },
  { name: "Rau, củ, nấm, trái cây", icon: <FaLeaf /> },
  { name: "Bia, nước giải khát", icon: <FaWineBottle /> },
  { name: "Sữa các loại", icon: <FaCheese /> },
  { name: "Gạo, bột, đồ khô", icon: <FaBacon /> },
  { name: "Kem, sữa chua", icon: <FaIceCream /> },
  { name: "Thực phẩm đông mát", icon: <FaFish /> },
  { name: "Vệ sinh nhà cửa", icon: <FaBroom /> },
  { name: "Mẹ & bé", icon: <FaBaby /> },
  { name: "Bánh kẹo các loại", icon: <FaCookieBite /> },
  { name: "Khuyến mãi sốc1", icon: <FaHotjar /> },
  { name: "Thịt, cá, trứng, hải sản1", icon: <FaDrumstickBite /> },
  { name: "Rau, củ, nấm, trái cây1", icon: <FaLeaf /> },
  { name: "Bia, nước giải khát1", icon: <FaWineBottle /> },
  { name: "Sữa các loại1", icon: <FaCheese /> },
];

// CategorySidebar.tsx
function CategorySidebar() {
  return (
    <aside className="bg-white shadow-md w-[319 px]">
      <ul>
        {CATS.map((c) => (
          <li key={c.name}>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
              <span className="text-green-600">{c.icon}</span>
              <span className="text-sm font-medium">{c.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}




export default CategorySidebar;
