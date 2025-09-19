import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/Context/CartContext"; // 👈 thêm dòng này
import { Toaster } from "react-hot-toast";


const router = createRouter({ routeTree });
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" /> {/* 👈 thêm toaster */}
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
