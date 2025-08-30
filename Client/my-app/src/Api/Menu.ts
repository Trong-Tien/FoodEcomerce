import type { AddMenu } from "@/Type/Addmenu";
import type { UpdateMenu } from "@/Type/UpdateMenu";
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7004/api/memu",
});

export const getAll = async () => {
  const { data } = await api.get("/getall");
  return data;
};

export const create = async (menu: AddMenu) => {
  const { data } = await api.post("/create", menu);
  return data;
};

export const update = async (id: string, menu: UpdateMenu) => {
  const { data } = await api.put(`/update/${id}`, menu);
  return data;
};

export const deletePost = async (id: number) => {
  const { data } = await api.delete(`/delete/${id}`);
  return data;
};
