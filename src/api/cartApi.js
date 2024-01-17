import axiosClient from "./axiosClient";

const cartApi = {
  getCart() {
    const url = "/cart";
    return axiosClient.get(url);
  },
  addToCart(id) {
    const url = "/cart/add-to-cart";
    return axiosClient.put(url, id);
  },
  removeItem(params) {
    const url = `/cart/remove-item`;

    return axiosClient.delete(url, {
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
export default cartApi;
