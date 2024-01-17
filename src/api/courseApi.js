import axiosClient from "./axiosClient";

const courseApi = {
  // getAllCourses() {
  //   const url = "/Course";
  //   return axiosClient.get(url);
  // },

  //base on params, we can get courses by many ways: allcourses, top courses, ...
  getCourses(params) {
    const { offset, limit, minPrice, maxPrice, catalogIDs, courseSort } =
      params;

    let url = `/Course/filter?offset=${offset}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}&courseSort=${courseSort}`;

    if (!!catalogIDs) {
      url = `/Course/filter?offset=0&limit=${limit}&minPrice=0&maxPrice=9999&catalogIDs=${catalogIDs}&courseSort=${courseSort}`;
    }

    return axiosClient.get(url);
  },

  getCatalog() {
    const url = "/Catalog";
    return axiosClient.get(url);
  },
  getCoursesByIns(params) {
    const { offset, limit } = params;
    let url = `/Course/get-by-instructor?offset=${offset}&limit=${limit}`;
    return axiosClient.get(url);
  },
  create_course(params) {
    const url = "/Course/create";
    return axiosClient.post(url, params);
  },
  update_course(params) {
    const url = "/Course/update";
    return axiosClient.put(url, params);
  },
  delete_course(id) {
    const url = `/Course/delete?id=${id}`;
    return axiosClient.delete(url);
  },
  getCourseByName(courseName) {
    const url = `/Course/filter?offset=0&limit=100&minPrice=0&maxPrice=555&courseName=${courseName}`;
    return axiosClient.get(url);
  },
  
  getCourseByInstructor(instructorName) {
    const url = `/Course/filter?offset=0&limit=100&minPrice=0&maxPrice=555&instructorName=${instructorName}`;
    return axiosClient.get(url);
  },
  
   
  getCourseDetail(courseID) {
    const url = `/Course/course-detail/${courseID}`;
    return axiosClient.get(url);
  },
  getMyCourseDetail(courseId) {
    const url = `/Course/my-courses/course-detail/${courseId}`;
    return axiosClient.get(url);
  },
};

export default courseApi;
