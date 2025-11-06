import React from "react";

export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "outline" }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        variant === "outline"
          ? "border border-gray-300 text-gray-700"
          : "bg-blue-600 text-white"
      }`}
    >
      {children}
    </span>
  );
}
