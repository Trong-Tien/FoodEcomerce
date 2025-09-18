import { api } from "./BaseApi";

export const getFile = async (path: string) => {
  const res = await api.get(`File/image?path=${path}`, { responseType: "blob" });
  return URL.createObjectURL(res.data);
};
