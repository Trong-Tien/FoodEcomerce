const API_BASE = "http://localhost:8080/api/Auth";

export const AuthService = {
  // Đăng ký
  async register(payload: {
    userName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    otp?: string;
    password: string;
    confirmPassword?: string;
    phoneNumber?: string;
  }) {
    const res = await fetch(`${API_BASE}/Register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Đăng ký thất bại");
    }
    return res.json();
  },

  // Đăng nhập
  async login(payload: { identity: string; password: string }) {
    const res = await fetch(`${API_BASE}/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Đăng nhập thất bại");
    }
    return res.json();
  },

  // Gửi OTP
  async sendOtp(email: string) {
    const res = await fetch(`${API_BASE}/send-otp?email=${encodeURIComponent(email)}`, {
      method: "POST",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Gửi OTP thất bại");
    }
    return res.json();
  },
};
