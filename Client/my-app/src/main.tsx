import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/Context/CartContext";
import { AuthProvider } from "@/Context/AuthContext"; // ✅ thêm dòng này
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";


const router = createRouter({ routeTree });
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="775183142029-p76aalh1m081anvtg4pu4l05m3tq46g7.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />  
            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>
);
