
import type { AddUnitCacaulate } from "@/Type/AddUnitCaculate";
import type { UnitCacaulate } from "@/Type/UnitCaculate";
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5292/api/UnitCaculate",
=======
  baseURL: "http://localhost:5292/api/UnitCaculate",
>>>>>>> 15de3b67f25597396e005d5e96777554070b92a4
});

export const getAll = async (pageNumber: number, pageSize: number) => {
  const { data } = await api.get(`GetAll?pageNumber=${pageNumber}&pagesize=${pageSize}`);
  return data;
};

export const create = async (request: AddUnitCacaulate) => {
  const { data } = await api.post("/create", request);
  return data;
};


export const update = async (request: UnitCacaulate) => {
  const { data } = await api.put(`/Update/`, request);
  return data;
};

export const deleteUnitCaulate = async (id: string) => {
  const { data } = await api.delete(`/Delete/${id}`);
  return data;
};
