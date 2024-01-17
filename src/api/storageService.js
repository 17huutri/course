import config from "../config/config";

const { storageKeys } = config;

const storageService = {
  setAccessToken(token) {
    localStorage.setItem(storageKeys.ACCESS_KEY, token);
  },

  getAccessToken() {
    return localStorage.getItem(storageKeys.ACCESS_KEY);
  },

  removeAccessToken() {
    localStorage.removeItem(storageKeys.ACCESS_KEY);
  },

  setRole(role) {
    localStorage.setItem("role", role);
  },

  getRole() {
    return localStorage.getItem("role");
  },

  removeRole() {
    localStorage.removeItem("role");
  },
};

export default storageService;
