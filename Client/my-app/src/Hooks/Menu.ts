import { api } from "@/Api/BaseApi";
import { create, deleteMenu, getByPermission, update } from "@/Api/Menu";
import type { MenuForm } from "@/Type/Addmenu";
import type { Menu } from "@/Type/Menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const qk = {
  menus: () => ["menus"] as const,
  menu: (id: string | number) => ["menus", id] as const,
};

export const useGetMenus = (pageNumber: number, pagesize: number) =>
  useQuery({
     queryKey: ["orders"],
       queryFn: async () =>{
          const {data} = await api.get(`GetAll?pageNumber=${pageNumber}&pagesize=${pagesize}}`)
          return data;
       } ,
  });

export const useGetMenusByPermission = (roleId: string) =>
  useQuery({
    queryKey: ["menusByPermission", roleId],
    queryFn: () => getByPermission(roleId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

export const useCreateMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: MenuForm) => create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menus() });
    },
  });
};


export const useUpdateMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (menu: Menu) =>
      update(menu),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: qk.menus() });
      qc.invalidateQueries({ queryKey: qk.menu(variables.id) });
    },
  });
};

export const useDeleteMenu = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMenu(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menus() });
    },
  });
};
