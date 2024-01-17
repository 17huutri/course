import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instructorApi from "../../api/instructorApi";

const initialState = {
  isUpdate: false,
  isChanged: false,
  isField1Filled: false,
  instructor: null,
};
export const getInstructor = createAsyncThunk(
  "instructor/get_instructor",
  async () => {
    try {
      const response = await instructorApi.getInstructor();
      return response.data._data;
    } catch (error) {
      console.log(error);
    }
  }
);
const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    isUpdating: (state, action) => {
      return {
        ...state,
        isUpdate: action.payload,
      };
    },
    isChangePass: (state, action) => {
      return {
        ...state,
        isChanged: action.payload,
      };
    },
    isField1Filled: (state, action) => {
      return {
        ...state,
        isField1Filled: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    //getInstructor
    builder.addCase(getInstructor.fulfilled, (state, action) => {
      return { ...state, instructor: action.payload, error: "" };
    });
    builder.addCase(getInstructor.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export const { isUpdating, isChangePass, isField1Filled } =
  instructorSlice.actions;

export default instructorSlice.reducer;
