import { api } from "@/Api/BaseApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaceOfProduct = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["PlaceOfProduct"],
        queryFn: async () => {
            const { data } = await api.get(`/PlaceOfProduct/GetAll?pageNumber=${pageNumber}&pageSize=${pagesize}`)
            return data;
        },
    });

