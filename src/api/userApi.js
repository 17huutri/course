import axiosClient from "./axiosClient";

const userApi = {
  getUsers(params) {
    const url = "/User";
    return axiosClient.get(url);
  },
    get_user_profile() {
      const url = "/User/get-user-profile";
      return axiosClient.get(url);
    },
    update_user(params) {
      const url = "/User/update-user-profile";
      return axiosClient.put(url, params);
    },
    active_user(params){
      const url = "/User/update-user-status";
      return axiosClient.put(url,params)
    },
    get_course_user() {
      const url = "/Course/my-courses";
      return axiosClient.get(url);
    },
  };
  export default userApi;
