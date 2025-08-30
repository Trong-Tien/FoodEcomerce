// src/components/common/BrandCard.tsx
import React from "react";
import type { Brand } from "../../Types/brand";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <a
      href={brand.link}
      className="block shadow hover:shadow-lg overflow-hidden transition transform hover:scale-105 h-full"
    >
      <img
        src={brand.img}
        alt={brand.name}
        className="w-full h-full object-cover"
      />
    </a>
  );
};

export default BrandCard;
