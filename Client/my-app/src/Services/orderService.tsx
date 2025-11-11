const API_BASE = "http://localhost:5292/api/Orders";

const storedRole = localStorage.getItem("role");
const roleId: string = storedRole ? JSON.parse(storedRole) : "";

export const orderService = {
  async getAll(pageNumber = 1, pageSize = 10) {
    const res = await fetch(`${API_BASE}/GetAll?type=-1&pageNumber=${pageNumber}&pageSize=${pageSize}&roleId=${roleId}`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Không thể tải danh sách đơn hàng");

    const text = await res.text();
    return text ? JSON.parse(text) : [];
  },


  async getById(id: string) {
    const res = await fetch(`${API_BASE}/GetById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!res.ok) throw new Error("Không thể tải chi tiết đơn hàng");

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },
};
