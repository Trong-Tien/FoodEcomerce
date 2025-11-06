import type { MenuForm } from "@/Type/Addmenu";
import type { Menu } from "@/Type/Menu";
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5292/api/Menu",
=======
  baseURL: "http://localhost:5292/api/Menu",
>>>>>>> 15de3b67f25597396e005d5e96777554070b92a4
});

export const getAll = async (pageNumber: number, pageSize: number) => {
  const { data } = await api.get(`GetAll?pageNumber=${pageNumber}&pagesize=${pageSize}`);
  return data;
};

export const getByPermission = async (roleId: string) => {
  const { data } = await api.get(`GetByPermission/${roleId}`)
  return data;
}

export const create = async (menu: MenuForm) => {
  const { data } = await api.post("/create", menu);
  return data;
};


export const update = async (menu: Menu) => {
  const { data } = await api.put(`/Update/`, menu);
  return data;
};

export const deleteMenu = async (id: string) => {
  const { data } = await api.delete(`/Delete/${id}`);
  return data;
};
