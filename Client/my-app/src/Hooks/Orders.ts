
import { api } from "@/Api/BaseApi";
import type { AddOrder } from "@/Type/AddOrder";
import type { ResponseType } from "@/Type/ResponseType";
import type { OrdersDetail } from "@/Type/SubOrderDetail";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetOrders = (pageNumber : number , pagesize : number , role : string | null) =>
  useQuery({
    queryKey: ["orders"],
    queryFn: async () =>{
       const {data} = await api.get(`/Orders/GetAll?pageNumber=${pageNumber}&pageSize=${pagesize}&role=${role}`)
       return data;
    } ,
  });

export const useCreateOrders = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: AddOrder) => {
       const {data} = await api.post<ResponseType>(`/Orders/Create`, body)
       return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["createOrders"] });
    },
  });
};


export const useGetOrdersDetail = (orderId: string, enabled: boolean) =>
  useQuery({
    queryKey: ["ordersDetail", orderId],
    queryFn: async () => {
      const { data } = await api.get<OrdersDetail[]>(
        `/Orders/GetDetailByOrderId/${orderId}`
      );
      return data;
    },
    enabled: enabled && !!orderId,
  });
