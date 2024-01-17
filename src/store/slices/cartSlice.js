import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../../api/cartApi";
import { createPaymentURLThunk } from "./paymentSlice";
export const getCart = createAsyncThunk("cart", async () => {
  try {
    const res = await cartApi.getCart();
    return res.data._data;
  } catch (error) {
    throw error;
  }
});

export const addToCartS = createAsyncThunk("cart/add-to-cart", async (data) => {
  const { id } = data;
  const addToData = {
    courseID: id,
  };

  try {
    const res = await cartApi.addToCart(addToData);
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteCartItem = createAsyncThunk(
  "cart/delete-cart-item",
  async (data) => {
    const id = data;
    const deleteItem = {
      courseID: id,
    };

    try {
      const res = await cartApi.removeItem(deleteItem);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  error: "",
  totalQuantity: 0,
  coursesInOrder: [],
  paymentCart: [],
  amount: 0,
  paymentCartQuantity: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSelectToPayment: (state, action) => {
      const { paymentCart } = state;
      const { course } = action.payload;
      console.log(course);
      const isInPaymentCart = paymentCart.some(
        (item) => item.courseID === course.courseID
      );

      if (isInPaymentCart === false) {
        const newPaymentCart = [...paymentCart, course];
        return {
          ...state,
          paymentCart: newPaymentCart,
          paymentCartQuantity: newPaymentCart.length,
        };
      } else {
        const newPaymentCart = paymentCart.filter(
          (item) => item.courseID !== course.courseID
        );

        return {
          ...state,
          paymentCart: newPaymentCart,
          paymentCartQuantity: newPaymentCart.length,
        };
      }
    },

    selectAllToPayment: (state, aciton) => {
      const { paymentCart, coursesInOrder } = state;

      if (paymentCart.length === coursesInOrder.length) {
        return {
          ...state,
          paymentCart: [],
          paymentCartQuantity: 0,
        };
      } else {
        const newPaymentCart = [...coursesInOrder];
        return {
          ...state,
          paymentCart: newPaymentCart,
          paymentCartQuantity: newPaymentCart.length,
        };
      }
    },

    calAmount: (state, action) => {
      return {
        ...state,
        amount: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      return {
        ...state,
        coursesInOrder: action.payload.items,
        totalQuantity: [action.payload.items.length],
      };
    });
    builder.addCase(addToCartS.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(addToCartS.fulfilled, (state, action) => {
      const { coursesInOrder } = state;
      let newItem = action.payload;
      const courseID = newItem.id;
      newItem = { ...newItem, courseID };
      const newCart = [...coursesInOrder, newItem];
      return {
        ...state,
        coursesInOrder: newCart,
        totalQuantity: newCart.length,
        isLoading: false,
      };
    });

    builder.addCase(deleteCartItem.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      const { coursesInOrder } = state;
      const idDelete = action.payload.data._data.courseID;
      console.log(action.payload);
      const newCart = coursesInOrder.filter(
        (item) => item.courseID !== idDelete
      );
      return {
        ...state,
        coursesInOrder: newCart,
        totalQuantity: newCart.length,
        isLoading: false,
      };
    });
    builder.addCase(createPaymentURLThunk.fulfilled, (state, action) => {
      // dispat
    });
  },
});

export const { selectAllToPayment, toggleSelectToPayment, calAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
