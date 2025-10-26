const API_BASE = "https://localhost:7004/api/Auth";

export const AuthService = {

  async register(payload: {
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    otp: string;
  }) {
    const body = {
      id: crypto.randomUUID(),
      userName: payload.userName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      password: payload.password,
      otp: payload.otp,
      acvite: true,
      isAdmin: false,
      statusId: 1,
      roleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isDelete: false,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      deleteAt: null,
      createUser: payload.userName,
      updateUser: payload.userName,
    };

    const res = await fetch(`${API_BASE}/Register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || "Đăng ký thất bại");
    return data;
  },

  // ==========================
  // 👉 Đăng nhập (có cartId)
  // ==========================
  async login(payload: { phoneNumber: string; password: string }) {
  const res = await fetch(`${API_BASE}/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.accessToken) {
    throw new Error(data?.message || "Sai tài khoản hoặc mật khẩu");
  }

  // ✅ Lưu thông tin user và token
  const userData = {
    id: data.id,
    name: data.userName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    roleId: data.roleId,
    cartId: data.cartId ?? null,
  };

  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(userData));

  // ✅ Thêm 2 dòng này để ProfilePage hoạt động đúng
  localStorage.setItem("userId", data.id);
  localStorage.setItem("userName", data.userName);

  console.log("✅ User login success:", userData);

  return { token: data.accessToken, user: userData };
},

  // ==========================
  // 👉 Đăng xuất
  // ==========================
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },

  // ==========================
  // 👉 Kiểm tra trạng thái đăng nhập
  // ==========================
  isLoggedIn() {
    return !!localStorage.getItem("access_token");
  },

  // ==========================
  // 👉 Gửi OTP
  // ==========================
  async sendOtp(email: string) {
    const res = await fetch(
      `${API_BASE}/send-otp?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || "Gửi OTP thất bại");
    return data;
  },
};
