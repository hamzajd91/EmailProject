import {v4 as uuidv4} from "uuid";

const StorageService = {
  setUser: function(data: any) {
    localStorage.setItem("_user", JSON.stringify(data));
  },

  setToken: function(data: any) {
    localStorage.setItem("_token", JSON.stringify(data));
  },

  getToken: function() {
    return localStorage.getItem("_token") == null ? null : JSON.parse(localStorage.getItem("_token") as any);
  },

  getUser: function() {
    return localStorage.getItem("_user") == null ? {} : JSON.parse(localStorage.getItem("_user") as any);
  },

  getCompanies: function() {
    return localStorage.getItem("_companies") == null ? {} : JSON.parse(localStorage.getItem("_companies") as any);
  },

  getUUID: function() {
    let _uuid = localStorage.getItem("_uuid");
    if (_uuid) {
      return JSON.parse(_uuid as any);
    } else {
      _uuid = uuidv4();
      localStorage.setItem("_uuid", JSON.stringify(_uuid));
      return _uuid;
    }
  },

  clearLogin: function() {
    localStorage.removeItem("_login");
    localStorage.removeItem("_token");
    localStorage.removeItem("_user");
  },
};
export default StorageService;
