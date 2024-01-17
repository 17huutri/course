import instructorReducer from "./slices/instructorSlice";
import courseReducer from "./slices/courseSlice/courseSlice";
import createCourseReducer from "./slices//courseSlice/createCourseSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import accountReducer from "./slices/accountSlice";
import adminReducer from "./slices/adminSlice";
import changePasswordReducer from "./slices/changePassSlice";
import curricullumReducer from "./slices/courseSlice/curriculumSlice";
import paymentReducer from "./slices/paymentSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    instructorReducer,
    courseReducer,
    accountReducer,
    cartReducer: cartReducer,
    createCourseReducer: createCourseReducer,
    userReducer: userReducer,
    adminReducer: adminReducer,
    changePasswordReducer: changePasswordReducer,
    curricullumReducer: curricullumReducer,
    paymentReducer: paymentReducer,
  },
});

export default store;
