import axiosClient from "./axiosClient";

const curriculumApi = {
  addSection(params, courseId) {
    const url = `/section?courseId=${courseId}`;
    return axiosClient.post(url, params);
  },
  editSection(params) {
    const url = "/section/update-section";
    return axiosClient.put(url, params);
  },
  deleteSection(id) {
    const url = `/section?id=${id}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
    });
  },
  addLesson(params) {
    const url = "/section/add-section";
    return axiosClient.post(url, params);
  },
  editLesson(params) {
    const url = "/section/update-section";
    return axiosClient.put(url, params);
  },
  deleteLesson(id) {
    const url = "/section/delete-section";
    return axiosClient.delete(url, id);
  },
};

export default curriculumApi;
