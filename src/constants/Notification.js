import { toast } from "react-toastify";

const Notification = {
  registerSuccessNotify(message) {
    toast.success(message);
  },

  registerFailNotify(error) {
    toast.error(error);
  },
};

export default Notification;
