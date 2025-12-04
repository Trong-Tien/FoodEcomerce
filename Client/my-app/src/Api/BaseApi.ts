import axios from "axios";

export const api = axios.create({
  baseURL: "https://foodecomerceapi.runasp.net/api/",
  // withCredentials : true
  
});