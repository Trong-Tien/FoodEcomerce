import { api } from "@/Api/BaseApi";
import { getAll } from "@/Api/DanhMuc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "@/Type/ResponseType";
import type { AddProduct } from "@/Type/AddProduct";
export const useGetCategory = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["categorys", pageNumber, pagesize],
        queryFn: () => getAll(pageNumber, pagesize),
    });

export const useGetProduct = (pageNumber: number ,pagesize : number) =>
    useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const { data } = await api.get(`/Product/getall?pageNumber=${pageNumber}&pageSize=${pagesize}&ids=00000000-0000-0000-0000-000000000000`)
            return data;
        },
        refetchOnWindowFocus: false,  
        refetchOnReconnect: false,  
        refetchOnMount: false,     
    });

export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (request: AddProduct) => {
            const formData = new FormData();
            formData.append("id", request.id);
            formData.append("managementCode", request.managementCode);
            formData.append("name", request.name);
            formData.append("description", request.description);
            formData.append("unitPrice", request.unitPrice.toString());
            formData.append("quantityInStock", request.quantityInStock.toString());
            formData.append("discount", request.discount.toString());
            formData.append("isActive", request.isActive.toString());
            formData.append("expiry", request.expiry);
            formData.append("preserve", request.preserve);
            formData.append("unitCaculateId", request.unitCaculateId);
            formData.append("tradeMarkId", request.tradeMarkId);
            formData.append("placeProductId", request.placeProductId);
            formData.append("inventory", request.inventory.toString());
            request.imageUrl.forEach(file => {
                formData.append("ImageUrl", file);
            });
            request.categoryId.forEach(c => {
                formData.append("categoryId", c);
            })
            const { data } =await api.post<ResponseType>(`/Product/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["category"] });
        },
    });
};


export const useGetProductImage = (productId : string) =>
    useQuery({
        queryKey: ["productImage", productId],
        queryFn: async () => {
            const { data } = await api.get(`/Product/GetProductImage/${productId}`)
            return data;
        },
        refetchOnWindowFocus: false,  
        refetchOnReconnect: false,  
        refetchOnMount: false,    
        enabled: !!productId,  
    });

