const API_BASE = "http://foodecomerceapi.runasp.net/api/VoucherUser"; // ⚠️ nếu Swagger của bạn chạy port 5292 thì đổi lại thành 5292

export const voucherUserService = {
  // Lấy toàn bộ (dành cho admin)
  async getAll() {
    const res = await fetch(`${API_BASE}/GetAll`);
    if (!res.ok) throw new Error("Không thể tải danh sách voucher");
    const data = await res.json();
    return data.items || [];
  },

  // Lấy voucher theo UserId
  async getByUserId(userId: string) {
    const res = await fetch(`${API_BASE}/GetByUserId/${userId}`);
    if (!res.ok) throw new Error("Không thể tải voucher của người dùng");
    const data = await res.json();
    // API này trả về mảng []
    return Array.isArray(data) ? data : data.items || [];
  },
};
