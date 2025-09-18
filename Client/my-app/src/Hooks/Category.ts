import { api } from "@/Api/BaseApi";
import { create, deleteCategory, getAll, update } from "@/Api/DanhMuc";
import type { AddCategory } from "@/Type/AddCategory";
import type { UpdateCategory } from "@/Type/UpdateCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "@/Type/ResponseType";
export const useGetCategory = (pageNumber: number, pagesize: number) =>
    useQuery({
        queryKey: ["categorys", pageNumber, pagesize],
        queryFn: () => getAll(pageNumber, pagesize),
    });

export const useCreateCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: AddCategory) => create(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["category"] });
        },
    });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();

  return useMutation<ResponseType, Error, UpdateCategory>({
    mutationFn: async (category: UpdateCategory) => {
      const formData = new FormData();
      formData.append("id", category.id);
      formData.append("name", category.name);
      formData.append("description", category.description ?? "");
      
      if (category.imageUrl instanceof File) {
        formData.append("imageUrl", category.imageUrl);
      }
      if (category.categoryParentId) {
        formData.append("categoryParentId", category.categoryParentId);
      }

      const { data } = await api.put<ResponseType>(
        "/Category/update",
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
      qc.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deleteCategory" ] });
    },
  });
};
