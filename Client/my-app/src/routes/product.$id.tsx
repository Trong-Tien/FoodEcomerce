// src/routes/product.$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import DetailProduct from "@/Pages/ProductDetail";

export const Route = createFileRoute("/product/$id")({
  component: DetailProduct,
});
