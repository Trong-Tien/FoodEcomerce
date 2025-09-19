import { api } from "@/Api/BaseApi";
import type { ResponseType } from "@/Type/ResponseType";
import type { Register } from "@/Types/RegisterForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Register) => {
       const {data} = await api.post<ResponseType>(`/Auth/Register` ,body )
       return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey:["register"] });
    },
  });
};

export const useSendOtp = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post<ResponseType>(`/Auth/send-otp?email=${email}`); 
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["send-otp"] });
    },
  });
};
