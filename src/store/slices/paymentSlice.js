import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentApi from "../../api/paymentApi";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "./cartSlice";

const initialState = {
  paymentURL: "",
  paymentInfo: null,
  isLoading: false,
  error: "",
};

export const createPaymentURLThunk = createAsyncThunk(
  "payment/create_link",
  async (payload) => {
    try {
      const res = await paymentApi.createPaymentURL(payload);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // createCheckoutItems: (state, action) => {
    //   const { amount, paymentCart } = action.payload;
    //   console.log(action);
    //   const newItemsToCheckout = {
    //     amount,
    //     courseId: paymentCart,
    //   };
    //   return {
    //     ...state,
    //     checkoutItems: newItemsToCheckout,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createPaymentURLThunk.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(createPaymentURLThunk.fulfilled, (state, action) => {
      // const dispatch = useDispatch();
      // dispatch(deleteCartItem(action.payload._data.courseId))
      window.open(action.payload._data.paymentUrl, "_blank");
      window.close();
      return {
        ...state,
        paymentURL: action.payload._data.paymentUrl,
        paymentInfo: action.payload._data,
        isLoading: false,
      };
    });

    builder.addCase(createPaymentURLThunk.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { createCheckoutItems } = paymentSlice.actions;
export default paymentSlice.reducer;
