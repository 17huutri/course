import axiosClient from "./axiosClient";

const adminApi = {
  create_catalog(params) {
    const url = "/Catalog/create";
    return axiosClient.post(url, params);
  },
  update_catalog(params) {
    const url = "/Catalog/update";
    return axiosClient.put(url, params);
  },
  delete_catalog(catalogId) {
    const url = `/Catalog/delete?ID=${catalogId}`;
    return axiosClient.delete(url);
  },
};
export default adminApi;
