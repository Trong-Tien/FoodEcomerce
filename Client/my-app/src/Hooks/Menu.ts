import { create, deleteMenu, getAll, update } from "@/Api/Menu";
import type { UpdateMenu } from "@/Type/UpdateMenu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const qk = {
  menus: () => ["menus"] as const,
  menu: (id: string | number) => ["menus", id] as const,
};

export const useGetMenus = () =>
  useQuery({
    queryKey: qk.menus(),
    queryFn: getAll,
});

export const useCreateMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menus() });
    },
  });
};

export const useUpdateMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, menu }: { id: string; menu: UpdateMenu }) =>
    update(id, menu),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: qk.menus() });
      qc.invalidateQueries({ queryKey: qk.menu(variables.id) });
    },
  });
};

export const useDeleteMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id : string) => deleteMenu(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menus() });
    },
  });
};
