
export type ImageProduct = {
  id: string;
  imageUrl: string;
};

export type ProductCategory = {
  productId: string;
  categoryId: string;
};

export type Product = {
  id: string;
  managementCode: string;
  name: string;
  description: string;
  unitPrice: number;
  quantityInStock: number;
  discount: number;
  isActive: boolean;
  inventory: number;
  expiry: string;
  preserve: string;
  rating?: number;
   unitCaculate?: {
    id: string;
    name: string;
  };

  unitCaculateId: string;
  images?: string; 
  tradeMarkId: string;
  placeProductId: string;
  imageProducts?: ImageProduct[];
  productCategories?: ProductCategory[];
  categoryId: string;
  image? : string

  

  tradeMark?: {
    id: number;
    name: string;
    imageUrl?: string | null;
    discription?: string | null;
    isDelete?: boolean;
  };

  placeProduct?: {
    id: number;
    name: string;
    discription?: string | null;
  };
};

export type CartItem = {
  id: string; 
  cartId: string; 
  productId: string;
  unitCaculateId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number; 
  discount?: number; 
  images?: string; 
  name?: string; 
};

export type ProductFilter = {
  priceRange?: [number, number];
  tradeMarkIds?: number[];
  placeProductIds?: number[];
  rating?: number;
  hasDiscount?: boolean;
  inStock?: boolean;
}