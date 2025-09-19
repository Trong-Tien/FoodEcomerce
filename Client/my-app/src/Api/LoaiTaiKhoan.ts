
import type { MenuRole } from "@/Type/MenuRole";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5292/api/Role/",
});

export const getAll = async (pageNumber: number , pageSize : number) => {
  const { data } = await api.get(`GetAll?pageNumber=${pageNumber}&pagesize=${pageSize}`);
  return data;
};

export const permission = async (modal : MenuRole[]) => {
  const {data} = await api.post(`/Permission/${modal[0].roleId}`, modal)
  return data;
}