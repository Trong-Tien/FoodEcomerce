import type { AddCategory } from "@/Type/AddCategory";
import type { UpdateCategory } from "@/Type/UpdateCategory";
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7004/api/Category",
});

export const getAll = async (pageNumber: number, pageSize: number) => {
  const { data } = await api.get(`/GetAll?pageNumber=${pageNumber}&pagesize=${pageSize}`);
  return data;
};

export const create = async (item: AddCategory) => {
  console.log(item)
  const formData = new FormData();
  formData.append("id", item.id);
  formData.append("name", item.name);
  formData.append("description", item.description);
  if (item.imageUrl instanceof FileList && item.imageUrl.length > 0) {
    formData.append("imageUrl", item.imageUrl[0], item.imageUrl[0].name);
  }
  if (item.categoryParentId) {
    formData.append("categoryParentId", item.categoryParentId ?? null) ;
  }



  const { data } = await api.post("/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};



export const update = async (menu: UpdateCategory) => {
  const { data } = await api.put(`/Update/`, menu);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/Delete/${id}`);
  return data;
};
