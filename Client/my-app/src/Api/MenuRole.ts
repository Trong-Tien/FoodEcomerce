
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7004/api/MenuRole/",
});

export const getAllByRole = async (roleId : string) => {
  const { data } = await api.get(`GetAllByRole/${roleId}`);
  return data;
};