import axios from "axios";
import StorageService from "./StorageService";
const uuid = StorageService.getUUID();

const api = axios.create({
  baseURL: process.env.REACT_APP_NODE_CLIENT_HOST,
  headers: {
    uuid: uuid,
  },
});
// api.defaults.headers['Authorization'] = JSON.parse(localStorage.getItem("_token") as any);
// api.defaults.withCredentials = true;
export default api;
