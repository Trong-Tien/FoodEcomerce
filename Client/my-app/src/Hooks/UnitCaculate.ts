
import { api } from "@/Api/BaseApi";
import type { AddUnitCacaulate } from "@/Type/AddUnitCaculate";
import type { ResponseType } from "@/Type/ResponseType";
import type { UnitCacaulate } from "@/Type/UnitCaculate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetUnitCaculate = (pageNumber : number , pagesize : number) =>
  useQuery({
    queryKey: ["getAll"],
    queryFn: async () =>{
       const {data} = await api.get(`/UnitCaculate/Getall?pageNumber=${pageNumber}&pageSize=${pagesize}`)
       return data;
    } ,
  });
export const useGetByParent = () =>
  useQuery({
    queryKey: ["getByParent"],
    queryFn: async () =>{
       const {data} = await api.get<UnitCacaulate[]>(`/UnitCaculate/GetByParent`)
       return data;
    } ,
  });
export const useCreateUnitCaculate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: AddUnitCacaulate) => {
       const {data} = await api.post<ResponseType>(`/UnitCaculate/Create`, body)
       return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["createUnitCaculate"] });
    },
  });
};


export const useUpdateUnitCaculate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: UnitCacaulate) =>
      {
         const {data} = await api.put<ResponseType>(`/UnitCaculate/Update`, body )
         return data;
      },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["updateUnitCaculte"] });
    },
  });
};

export const useDeleteUnitCucalate= () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
       const {data} = await api.delete<ResponseType>(`/UnitCaculate/Delete/${id}`)
       return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey:["deleteUnitCaculate"] });
    },
  });
};
