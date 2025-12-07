const API_BASE = "https://foodecomerceapi.runasp.net/api/PaymentMethod";

export const paymentMethodService = {
  // Lấy toàn bộ
  async getAll() {
    const res = await fetch(`${API_BASE}/GetAll`);
    if (!res.ok) throw new Error("Không thể tải danh sách phương thức thanh toán");
    return res.json();
  },

  // Lấy theo ID
  async getById(id: number) {
    const res = await fetch(`${API_BASE}/GetById?id=${id}`);
    if (!res.ok) throw new Error("Không tìm thấy phương thức thanh toán");
    return res.json();
  },

  // Thêm mới
  async create(data: any) {
    const res = await fetch(`${API_BASE}/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  // Cập nhật
  async update(data: any) {
    const res = await fetch(`${API_BASE}/Update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  // Xóa
  async delete(id: number) {
    const res = await fetch(`${API_BASE}/Delete?id=${id}`, { method: "DELETE" });
    return res.ok;
  },
};
