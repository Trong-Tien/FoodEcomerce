// src/routes/GioHang/index.tsx
import VoucherUserPage from "@/Pages/VoucherUserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/PhieuMuaHang/")({
  component: VoucherUserPage,
});
