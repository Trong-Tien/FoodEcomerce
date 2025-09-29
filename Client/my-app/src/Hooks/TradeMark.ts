import { api } from "@/Api/BaseApi";
import { useQuery } from "@tanstack/react-query";


export const useGetTradeMark = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["getTradmark"],
        queryFn: async () => {
            const { data } = await api.get(`/TradeMark/Getall?pageNumber=${pageNumber}&pageSize=${pagesize}`)
            return data;
        },
    });

