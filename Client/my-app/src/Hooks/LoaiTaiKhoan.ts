import { getAll } from "@/Api/LoaiTaiKhoan";
import { useQuery } from "@tanstack/react-query";
const qk = {
    loaiTaiKhoanPage: (pageNumber: number, pagesize: number) => ["loaiTaiKhoanPage"] as const,
};

export const useGetLoaiTaiKhoan = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: qk.loaiTaiKhoanPage(pageNumber, pagesize),
        queryFn: () => getAll(pageNumber, pagesize),
    });
