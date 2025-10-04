const API_BASE = "http://localhost:5292/api/Auth";

export const AuthService = {
  // ==========================
  // 👉 Đăng ký tài khoản
  // ==========================
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

  async login(payload: { phoneNumber: string; password: string }) {
    const res = await fetch(`${API_BASE}/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    // ⚠️ Backend trả accessToken, không phải token
    if (!res.ok || !data?.accessToken) {
      throw new Error(data?.message || "Sai tài khoản hoặc mật khẩu");
    }

    return {
      token: data.accessToken,
      user: {
        id: data.id,
        name: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId,
      },
    };
  },

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
