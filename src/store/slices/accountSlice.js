import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLogin: false,
  notification: null,
  role: "",
  username: "",
  loading: false,
  error: null,
  success: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRole: (state, action) => {
      return { ...state, role: action.payload };
    },
    setIsLogin: (state, action) => {
      return { ...state, isLogin: action.payload };
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setRole, setIsLogin, setUsername } = accountSlice.actions;

export default accountSlice.reducer;
