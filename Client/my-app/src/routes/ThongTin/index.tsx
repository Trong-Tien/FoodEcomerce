// src/routes/GioHang/index.tsx
import ProfilePage from "@/Pages/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ThongTin/")({
  component: ProfilePage,
});
