import { getFile } from "@/Api/FileApi";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useFile = (path : string) =>
  useQuery({
    queryKey: ["file", path],
    queryFn: () => getFile(path),
  });

  export const useFiles = (paths: string[]) => {
  return useQueries({
    queries: paths.map((path) => ({
      queryKey: ["file", path],
      queryFn: () => getFile(path),
      enabled: !!path,
    })),
  });
};