import axios from "axios";

export const api = axios.create({
  baseURL: "http://foodecomerceapi.runasp.net/api/",
  // withCredentials : true
  
});