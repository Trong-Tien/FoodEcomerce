import { api } from "@/Api/BaseApi";
import type { ReportTotal } from "@/Type/ReportTotal";
import { useQuery } from "@tanstack/react-query";


export const useGetResult = (type: number) =>
  useQuery({
    queryKey: ["report-total", type], 
    queryFn: async () => {
      const { data } = await api.get<ReportTotal>(`/Result/report-total/${type}`);
      return data;
    },
    enabled: !!type, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

