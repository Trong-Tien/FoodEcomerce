
import axios from "axios";

const api = axios.create({
  baseURL: "http://foodecomerceapi.runasp.net/api/MenuRole/",
});

export const getAllByRole = async (roleId : string) => {
  const { data } = await api.get(`GetAllByRole/${roleId}`);
  return data;
};