import { getFile } from "@/Api/FileApi";
import { useQuery } from "@tanstack/react-query";

export const useFile = (path : string) =>
  useQuery({
    queryKey: ["file", path],
    queryFn: () => getFile(path),
  });
