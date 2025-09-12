import { getAllByRole } from "@/Api/MenuRole";
import { useQuery } from "@tanstack/react-query";


const qk = {
//menuPages : (pageNumber : number , pagesize : number) => ["menus"] as const,
  menus: () => ["menus"] as const,
  menuRole: (id: string | number) => ["menus", id] as const,
};

export const useGetAllMenuByRole = (roleId : string) =>
  useQuery({
    queryKey: qk.menuRole(roleId),
    queryFn: ()  => getAllByRole(roleId),
    enabled: !!roleId,
});