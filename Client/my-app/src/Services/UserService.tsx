import type { User } from "@/Type/User";

const API_BASE = "http://localhost:5292/api/User";

export const UserService = {
  // ✅ Lấy thông tin user theo ID
  async getById(userId: string): Promise<User | null> {
    try {
      const res = await fetch(`${API_BASE}/GetById?id=${userId}`);
      if (!res.ok) throw new Error("Không thể tải thông tin người dùng");

      try {
        return await res.json();
      } catch {
        console.warn("⚠️ API trả về rỗng hoặc JSON không hợp lệ");
        return null;
      }
    } catch (err) {
      console.error("❌ Lỗi getById:", err);
      return null;
    }
  },

  // ✅ Cập nhật thông tin user
  async update(user: User): Promise<boolean> {
    // Chuẩn hóa dữ liệu theo đúng backend cần
    const body = {
      id: user.id,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password ?? "123456", 
      address: user.address ?? "",
      acvite: user.active ?? true, 
      isAdmin: false,
      statusId: user.statusId ?? 0,
      roleId: user.role?.id ?? "e791c54a-15fc-401a-b376-b4f3e088c284",
    };

    try {
      const res = await fetch(`${API_BASE}/Update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error("❌ Lỗi update:", msg);
        return false;
      }

      return true;
    } catch (err) {
      console.error("❌ Lỗi update:", err);
      return false;
    }
  },
};

export default UserService;
