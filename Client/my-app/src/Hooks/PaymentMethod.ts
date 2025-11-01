import { api } from "@/Api/BaseApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentMethod = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["paymentMethod", pageNumber, pagesize],
        queryFn: async () => {
            const { data } = await api.get(`/PaymentMethod/GetAll?pageNumber=${pageNumber}&pageSize=${pagesize}`)
            return data;
        },
    });
