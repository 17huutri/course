import axiosClient from "./axiosClient";

const accountApi = {
  login(params) {
    const url = "/Authorization/Login";
    return axiosClient.post(url, params);
  },
  loginWithGoogle(params) {
    const url = "/Authorization/google-login";
    return axiosClient.post(url, params);
  },

  registerUser(params) {
    const url = "/Authorization/register-user";
    return axiosClient.post(url, params);
  },

  registerInstructor(params) {
    const url = "/Authorization/register-instructor";
    return axiosClient.post(url, params);
  },
  changePassword(params) {
    const url = "/Authorization/change-password";
    return axiosClient.post(url, params);
  },
};

export default accountApi;
