const API_STATUS = "https://foodecomerceapi.runasp.net/api/OrderStatus";

// Helper chung (giống orderService)
async function fetchWithErrorHandling(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) throw new Error("Phiên đăng nhập đã hết hạn");
  if (!res.ok) throw new Error(await res.text() || "Không thể tải dữ liệu");

  const text = await res.text();
  return text && text !== "null" ? JSON.parse(text) : null;
}

export const orderStatusService = {
  async getAll() {
    const data = await fetchWithErrorHandling(`${API_STATUS}/GetAll?pageNumber=1&pageSize=10`);
    return data?.items || [];
  },
};
