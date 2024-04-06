import axios from "axios";
import StorageService from "./StorageService";

const appApi = axios.create();
const authToken = StorageService.getToken();
const uuid = StorageService.getUUID();

appApi.interceptors.request.use(
  async config => {
    // config.baseURL = process.env.REACT_APP_NODE_CLIENT_HOST + "/api/";
    config.baseURL = process.env.REACT_APP_NODE_CLIENT_HOST;
    config.headers = {
      Authorization: `JWT ${authToken}`,
      uuid: uuid,
      Accept: "application/json",
    };

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// const appApi = axios.create({
//   baseURL: process.env.REACT_APP_APP_CLIENT_HOST,
// });

// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// axios.defaults.headers.common["Authorization"] = `JWT ${authToken}`;
// axios.defaults.headers.post["Content-Type"] = "application/json";

// axios.interceptors.request.use(
//   request => {
//     console.log(request);
//     return request;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

appApi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    // if (error.message === "Network Error") {
    //   return cogoToast.error(
    //     "Please make sure you are connected to the internet and then reload your browser.",
    //     toastoptions
    //   );
    // }
    // if (error.response.status === 401 && error.response.data.error.login) {
    //   return store.dispatch({type: authActions.LOGOUT, payload: error});
    // }
    return Promise.reject(error);
  }
);

export default appApi;
