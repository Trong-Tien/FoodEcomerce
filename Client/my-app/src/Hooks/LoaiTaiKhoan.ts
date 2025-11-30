import { api } from "@/Api/BaseApi";
import {  permission } from "@/Api/LoaiTaiKhoan";
import type { MenuRole } from "@/Type/MenuRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const qk = {
    loaiTaiKhoanPage: () => ["loaiTaiKhoanPage"] as const,
    loaiTaiKhoans: () => ["loaiTaiKhoans"] as const,
};

export const useGetLoaiTaiKhoan = (pageNumber: number, pagesize: number) =>
    useQuery({
      queryKey: ["loaitaikhoan"],
         queryFn: async () =>{
            const {data} = await api.get(`Role/GetAll?pageNumber=${pageNumber}&pagesize=${pagesize}`)
            return data;
         } ,
    });
export const usePermissionMenu = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: MenuRole[]) => permission(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: qk.loaiTaiKhoans() });
        },
    });
};
