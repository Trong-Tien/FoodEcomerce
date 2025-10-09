// src/Hooks/useAuth.ts
export function useAuth() {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return {
    isLoggedIn: !!token,
    user,
    token,
  };
}
