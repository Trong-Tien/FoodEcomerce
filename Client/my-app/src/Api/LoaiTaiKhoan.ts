
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7004/api/Role/",
});

export const getAll = async (pageNumber: number , pageSize : number) => {
  const { data } = await api.get(`GetAll?pageNumber=${pageNumber}&pagesize=${pageSize}`);
  return data;
};