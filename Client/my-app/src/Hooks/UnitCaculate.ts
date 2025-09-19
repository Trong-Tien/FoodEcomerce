
import { create, deleteUnitCaulate, getAll, update } from "@/Api/UnitCaculate";
import type { AddUnitCacaulate } from "@/Type/AddUnitCaculate";
import type { UnitCacaulate } from "@/Type/UnitCaculate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const qk = {
  menus: () => ["menus"] as const,
  menu: (id: string | number) => ["menus", id] as const,
};

export const useGetUnitCaculate = (pageNumber: number, pagesize: number) =>
  useQuery({
    queryKey: ["getAll",pageNumber , pagesize],
    queryFn: () => getAll(pageNumber, pagesize),
  });




export const useCreateMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AddUnitCacaulate) => create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menus() });
    },
  });
};


export const useUpdateUnitCaculate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (menu: UnitCacaulate) =>
      update(menu),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: qk.menus() });
      qc.invalidateQueries({ queryKey: qk.menu(variables.id) });
    },
  });
};

export const useDeleteUnitCucalate= () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUnitCaulate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menus() });
    },
  });
};
