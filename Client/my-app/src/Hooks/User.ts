import { api } from "@/Api/BaseApi";
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
