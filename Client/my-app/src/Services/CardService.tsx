// src/Services/CartService.ts
import type { CartItem, Product } from "@/Type/Product";
import { CartItemService } from "./CartItemService";

export const CartService = {
  async getCart(): Promise<CartItem[]> {
    return await CartItemService.getByCartId();
  },

  async addToCart(product: Product, qty = 1): Promise<CartItem[]> {
    await CartItemService.create(product, qty);
    return await CartItemService.getByCartId();
  },

  async updateQuantity(id: string, qty: number): Promise<CartItem[]> {
    await CartItemService.update(id, qty);
    return await CartItemService.getByCartId();
  },

  async removeFromCart(id: string): Promise<CartItem[]> {
    await CartItemService.delete(id);
    return await CartItemService.getByCartId();
  },

  async clearCart(): Promise<CartItem[]> {
    const items = await CartItemService.getByCartId();
    for (const item of items) {
      await CartItemService.delete(item.id);
    }
    return [];
  },
};
