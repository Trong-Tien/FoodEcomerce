
import { api } from "@/Api/BaseApi";
import type { AddOrder } from "@/Type/AddOrder";
import type { ResponseType } from "@/Type/ResponseType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetOrders = (pageNumber : number , pagesize : number) =>
  useQuery({
    queryKey: ["orders"],
    queryFn: async () =>{
       const {data} = await api.get(`/Orders/GetAll?pageNumber=${pageNumber}&pageSize=${pagesize}`)
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


