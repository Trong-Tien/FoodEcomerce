const API_BASE = "http://localhost:5292/api/Orders";

export const orderService = {
  async getAll(pageNumber = 1, pageSize = 10) {
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `${API_BASE}/GetAll?type=-1&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (res.status === 401) throw new Error("Phiên đăng nhập đã hết hạn");
    if (!res.ok) throw new Error("Không thể tải danh sách đơn hàng");

    // xử lý response an toàn hơn
    const text = await res.text();
    return text && text !== "null" ? JSON.parse(text) : [];
  },

  async getById(id: string) {
    const token = localStorage.getItem("access_token");

    const res = await fetch(`${API_BASE}/GetById?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (res.status === 401) throw new Error("Phiên đăng nhập đã hết hạn");
    if (!res.ok) throw new Error("Không thể tải chi tiết đơn hàng");

    const text = await res.text();
    return text && text !== "null" ? JSON.parse(text) : null;
  },
};
