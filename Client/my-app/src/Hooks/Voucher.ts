
import { api } from "@/Api/BaseApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "@/Type/ResponseType";
import type { AddVoucher } from "@/Type/AddVoucher";
import type { UpdateVoucher } from "@/Type/UpdateVoucher";
export const useGetVoucher = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["voucher", pageNumber, pagesize],
        queryFn: async () => {
            const { data } = await api.get(`/Voucher/GetAll`)
            return data;
        },
    });


export const useCreateVoucher = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (request: AddVoucher) => {
            const formData = new FormData();
            formData.append("code", request.code);
            formData.append("name", request.name);
            formData.append("description", request.description);
            formData.append("discountType", request.discountType);
            formData.append("discountValue", request.discountValue.toString());
            formData.append("minOrderAmount", request.minOrderAmount.toString());
            formData.append("maxDiscountAmount", request.maxDiscountAmount.toString());
            formData.append("startDate", request.startDate.toISOString());
            formData.append("endTime", request.endTime.toISOString());
            formData.append("usageLimit", request.usageLimit.toString());
            formData.append("active", request.isActive.toString());
            if (request.imageUrl instanceof FileList && request.imageUrl.length > 0) {
                formData.append("imageUrl", request.imageUrl[0]);
            }

            const { data } = await api.post<ResponseType>(`/Voucher/Create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            return data;

        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["panner"] });
        },
    });
};

export const useUpdateVoucher = () => {
    const qc = useQueryClient();

    return useMutation<ResponseType, Error, UpdateVoucher>({
        mutationFn: async (request: UpdateVoucher) => {
            const formData = new FormData();
            formData.append("id", (request.id ?? "").toString() );
            formData.append("name", request.name);
            formData.append("description", request.description);
            formData.append("discountType", request.discountType);
            formData.append("discountValue", request.discountValue.toString());
            formData.append("minOrderAmount", request.minOrderAmount.toString());
            formData.append("maxDiscountAmount", request.maxDiscountAmount.toString());
            formData.append("startDate",  request.startDate.toISOString());
            formData.append("endTime", request.endTime.toISOString());
            formData.append("usageLimit", request.usageLimit.toString());
            formData.append("active", request.isActive.toString());
            if (request.imageUrl instanceof File) {
                formData.append("imageUrl", request.imageUrl);
            }

            const { data } = await api.put<ResponseType>(
                "/Voucher/Update",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["updateVoucher"] });
        },
    });
};

export const useDeleteVoucher = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await api.delete<ResponseType>(`/Voucher/Delete/${id}`)
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["deleteVoucher"] });
        },
    });
};
