// src/routes/GioHang/index.tsx
import CartPage from "@/Pages/CardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/GioHang/")({
  component: CartPage,
});
