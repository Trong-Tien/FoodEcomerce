"use client";

import { useState, useEffect } from "react";
import type { Product, ProductFilter } from "@/Type/Product";


interface Props {
  products: Product[]; // để lấy options tradeMark/placeProduct
  filter: ProductFilter;
  setFilter: (f: ProductFilter) => void;
}

export default function FilterSidebar({ products, filter, setFilter }: Props) {
  const [tradeMarks, setTradeMarks] = useState<{id: number; name: string}[]>([]);
  const [places, setPlaces] = useState<{id: number; name: string}[]>([]);

  useEffect(() => {
    // Lấy danh sách unique tradeMark và placeProduct từ products
    const tmMap: Record<number, string> = {};
    const plMap: Record<number, string> = {};

    products.forEach(p => {
      if (p.tradeMark) tmMap[p.tradeMark.id] = p.tradeMark.name;
      if (p.placeProduct) plMap[p.placeProduct.id] = p.placeProduct.name;
    });

    setTradeMarks(Object.entries(tmMap).map(([id, name]) => ({id: Number(id), name})));
    setPlaces(Object.entries(plMap).map(([id, name]) => ({id: Number(id), name})));
  }, [products]);

  const handleCheckbox = (key: keyof ProductFilter, value: any, checked: boolean) => {
    const current = filter[key] as any;
    if (Array.isArray(current)) {
      const newArr = checked ? [...current, value] : current.filter((v: any) => v !== value);
      setFilter({...filter, [key]: newArr});
    } else {
      setFilter({...filter, [key]: checked ? value : undefined});
    }
  }

  const handleToggle = (key: keyof ProductFilter) => {
    setFilter({...filter, [key]: !filter[key]});
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-slate-100 space-y-6 w-64">
      {/* Giá */}
      <div>
        <h3 className="font-semibold mb-2">Giá</h3>
        <div className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setFilter({...filter, priceRange: [0, 100000]})}
            className="text-left hover:text-emerald-600"
          >0 - 100k</button>
          <button
            onClick={() => setFilter({...filter, priceRange: [100000, 300000]})}
            className="text-left hover:text-emerald-600"
          >100k - 300k</button>
          <button
            onClick={() => setFilter({...filter, priceRange: [300000, 9999999]})}
            className="text-left hover:text-emerald-600"
          >300k+</button>
        </div>
      </div>

      {/* Thương hiệu */}
      <div>
        <h3 className="font-semibold mb-2">Thương hiệu</h3>
        <div className="flex flex-col gap-2 text-sm">
          {tradeMarks.map(tm => (
            <label key={tm.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.tradeMarkIds?.includes(tm.id) || false}
                onChange={(e) => handleCheckbox("tradeMarkIds", tm.id, e.target.checked)}
              />
              {tm.name}
            </label>
          ))}
        </div>
      </div>

      {/* Xuất xứ */}
      <div>
        <h3 className="font-semibold mb-2">Xuất xứ</h3>
        <div className="flex flex-col gap-2 text-sm">
          {places.map(pl => (
            <label key={pl.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.placeProductIds?.includes(pl.id) || false}
                onChange={(e) => handleCheckbox("placeProductIds", pl.id, e.target.checked)}
              />
              {pl.name}
            </label>
          ))}
        </div>
      </div>

      {/* Khuyến mãi */}
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filter.hasDiscount || false}
            onChange={() => handleToggle("hasDiscount")}
          />
          Sản phẩm đang giảm giá
        </label>
      </div>

      {/* Còn hàng */}
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filter.inStock || false}
            onChange={() => handleToggle("inStock")}
          />
          Còn hàng
        </label>
      </div>

      {/* Đánh giá */}
      <div>
        <h3 className="font-semibold mb-2">Đánh giá</h3>
        <div className="flex flex-col gap-2 text-sm">
          {[5,4,3].map(r => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                checked={filter.rating === r}
                onChange={() => setFilter({...filter, rating: r})}
              />
              {r} sao & hơn
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
