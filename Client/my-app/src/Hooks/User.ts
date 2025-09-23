import { api } from "@/Api/BaseApi";
import type { AddUser } from "@/Type/AddUser";
import type { ResponseType } from "@/Type/ResponseType";
import type { UpdateUser } from "@/Type/UpdateUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["user", pageNumber, pagesize],
        queryFn: async () => {
            const { data } = await api.get(
                `/User/GetAll?pageNumber=${pageNumber}&pageSize=${pagesize}`,
            );
            return data;
        },
    });

export const useCreateUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (body: AddUser) => {
            const data = await api.post<ResponseType>(`/User/Create`, body)
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["createUser"] })
        }
    })
}
export const useUpdateUser = () => {
 const qc = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpdateUser) => {
            const data = await api.put<ResponseType>(`/User/Update`, body)
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["updateUser"] })
        }
    })
} 

export const useDeleteUser = () => {
 const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const data = await api.delete<ResponseType>(`/User/Delete?id=${id}` )
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["delete"] })
        }
    })
} 