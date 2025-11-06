import { api } from "@/Api/BaseApi";
import type { ResponseType } from "@/Type/ResponseType";
import type { Register } from "@/Type/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginResponse } from "@/Type/LoginResponse";

/* ============ REGISTER ============ */
// ✅ Đăng ký bằng Gmail + OTP + Password
export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Register) => {
      const { data } = await api.post<ResponseType>(`/Auth/Register`, body);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["register"] });
    },
  });
};

/* ============ SEND OTP ============ */
// ✅ Gửi OTP qua Gmail (query param)
export const useSendOtp = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post<ResponseType>(
        `/Auth/send-otp?email=${encodeURIComponent(email)}`
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["send-otp"] });
    },
  });
};


export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const { data } = await api.post<ResponseType>(`/Auth/Login`, body);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["login"] });
    },
  });
};

export const loginWithGoogle  = () => {
   const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { token : string }) => {
      const { data } = await api.post<LoginResponse>(`/Auth/LoginWithGoogle`, body);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["login"] });
    },
  });
}
