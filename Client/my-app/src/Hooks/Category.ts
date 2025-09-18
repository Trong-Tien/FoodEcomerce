import { create, deleteCategory, getAll, update } from "@/Api/DanhMuc";
import type { AddCategory } from "@/Type/AddCategory";
import type { UpdateCategory } from "@/Type/UpdateCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


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
    return useMutation({
        mutationFn: (data: UpdateCategory) =>
            update(data),
        onSuccess: (_data) => {
            qc.invalidateQueries({ queryKey: ["category"]});
        },
    });
};

export const useDeleteCategory = (id : string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deleteCategory" ,id] });
    },
  });
};
