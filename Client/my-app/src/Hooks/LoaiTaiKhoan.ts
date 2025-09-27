import { getAll, permission } from "@/Api/LoaiTaiKhoan";
import type { MenuRole } from "@/Type/MenuRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const qk = {
    loaiTaiKhoanPage: (pageNumber: number, pagesize: number) => ["loaiTaiKhoanPage"] as const,
    loaiTaiKhoans: () => ["loaiTaiKhoans"] as const,
};

export const useGetLoaiTaiKhoan = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: qk.loaiTaiKhoanPage(pageNumber, pagesize),
        queryFn: () => getAll(pageNumber, pagesize),
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
