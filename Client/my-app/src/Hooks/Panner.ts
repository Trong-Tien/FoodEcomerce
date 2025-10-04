import { api } from "@/Api/BaseApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "@/Type/ResponseType";
import type { AddPanner } from "@/Type/AddPanner";
import type { UpdatePanner } from "@/Type/UpdatePanner";
export const useGetPanner = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["panner", pageNumber, pagesize],
        queryFn: async () => {
            const { data } = await api.get(`/Panner/getall`)
            return data;
        },
    });


export const useCreatePanner = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (request: AddPanner) => {
            console.log(request)
            const formData = new FormData();
            formData.append("name", request.name);
            formData.append("active", request.active.toString());
            if (request.imageUrl instanceof FileList && request.imageUrl.length > 0) {
                formData.append("imageUrl", request.imageUrl[0]);
            }

            const { data } = await api.post<ResponseType>(`/Panner/create`,
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

export const useUpdatePanner = () => {
    const qc = useQueryClient();

    return useMutation<ResponseType, Error, UpdatePanner>({
        mutationFn: async (request: UpdatePanner) => {
            const formData = new FormData();
            formData.append("id", request.id);
            formData.append("name", request.name);
            formData.append("active", request.active.toString());

            if (request.imageUrl instanceof File) {
                formData.append("imageUrl", request.imageUrl);
            }

            const { data } = await api.put<ResponseType>(
                "/Panner/update",
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
            qc.invalidateQueries({ queryKey: ["updatePanner"] });
        },
    });
};

export const useDeleteCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete<ResponseType>(`/Panner/delete/${id}`)
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["deletePanner"] });
        },
    });
};
