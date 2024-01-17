import axios from "axios";
import { BASEURL } from "./constant_api";
import storageService from "./storageService";

const axiosPayment = axios.create({
  baseURL: BASEURL,
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosPayment.interceptors.request.use(async (currentConfig) => {
  const customHeaders = {};
  const accessToken = storageService.getAccessToken();
  if (accessToken) {
    customHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  return {
    ...currentConfig,
    headers: {
      ...customHeaders, // Attach token
      ...currentConfig.headers, // The remain data
    },
  };
});

axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      // return success
      if (response.status === 200 || response.status === 201) {
        return response;
      }
      // reject errors & warnings
      return Promise.reject(response);
    }
    // default fallback
    return Promise.reject(response);
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosPayment;
