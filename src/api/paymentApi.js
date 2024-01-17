import axiosPayment from "./axiosPayment";

const paymentApi = {
  createPaymentURL(params) {
    const url = "create-payment-url";
    return axiosPayment.post(url, params);
  },
};
export default paymentApi;
