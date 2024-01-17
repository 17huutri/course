import axiosClient from "./axiosClient";
const instructorApi = {
  get_intructor_profile(instructorId) {
    const url = `/Instructor/get-public-profile?instructorId=${instructorId}`;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
    });
  },
  getInstructor() {
    const url = "/Instructor/all-get-public-profile";
    return axiosClient.get(url);
  },
 
};
export default instructorApi;
