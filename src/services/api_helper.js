import axios from 'axios';
import StorageService from './StorageService';


// pass new generated access token here
const token = "JWT " + StorageService.getToken();

// apply base url for axios
const API_URL = process.env.REACT_APP_NODE_CLIENT_HOST;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common.Authorization = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function get(url, config = {}) {
  return axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function postApi(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data);
}

export async function putCall(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
