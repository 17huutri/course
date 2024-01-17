import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import accountApi from "../../api/accountApi";

const initialState = {
  isChangingPassword: false,
  changePasswordError: "",
};

export const changePasswordThunk = createAsyncThunk(
  "Authorization/changePasswordThunk",
  async (profile, { rejectWithValue }) => {
    try {
      const res = await accountApi.changePassword(profile);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePasswordThunk.fulfilled, (state, action) => {
      toast.success("Password changed successfully!");
      return { ...state, isChangingPassword: true };
    });
    builder.addCase(changePasswordThunk.rejected, (state, action) => {
      toast.error(action.payload._message[0]);

      return {
        ...state,
        isChangingPassword: false,
        changePasswordError: action.payload._message,
      };
    });
  },
});

// export const {} = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
