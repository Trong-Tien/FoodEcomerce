import { Outlet } from "@tanstack/react-router";
import AIChatFloating from "@/Component/Home/AIChatFloating";

export default function RootLayout() {
  return (
    <div className="relative min-h-screen">
      <Outlet /> {/* nơi render các route con */}
      <AIChatFloating /> {/* icon chat luôn hiện */}
    </div>
  );
}
