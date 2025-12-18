import { api } from "@/Api/BaseApi";
import type { PaymentType } from "@/Type/PaymentType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type responsePayment={
  status : number,
  message : string ,
  url : string
}
export const useCreatePaymentLink = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (request: PaymentType) => {
      const { data } = await api.post<responsePayment>(
        "/Payment/create",
        request 
      );
      return data; 
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["paymentcreate"] });
    },
  });
};
