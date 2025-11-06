
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5292/api/MenuRole/",
=======
  baseURL: "http://localhost:5292/api/MenuRole/",
>>>>>>> 15de3b67f25597396e005d5e96777554070b92a4
});

export const getAllByRole = async (roleId : string) => {
  const { data } = await api.get(`GetAllByRole/${roleId}`);
  return data;
};