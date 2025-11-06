
import type { MenuRole } from "@/Type/MenuRole";
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5292/api/Role/",
=======
  baseURL: "http://localhost:5292/api/Role/",
>>>>>>> 15de3b67f25597396e005d5e96777554070b92a4
});

export const getAll = async (pageNumber: number , pageSize : number) => {
  const { data } = await api.get(`GetAll?pageNumber=${pageNumber}&pagesize=${pageSize}`);
  return data;
};

export const permission = async (modal : MenuRole[]) => {
  const {data} = await api.post(`/Permission/${modal[0].roleId}`, modal)
  return data;
}