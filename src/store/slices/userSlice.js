import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

export const fetchUserProfile = createAsyncThunk(
  "user/get_user_profile",
  async () => {
    try {
      const response = await userApi.get_user_profile();
      return response.data._data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update_user",
  async (userProfile) => {
    try {
      const response = await userApi.update_user(userProfile);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getYourCourse = createAsyncThunk(
  "user/get_your_course",
  async () => {
    try {
      const response = await userApi.get_course_user();
      return response.data._data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: "idle",
    error: null,
    valuesUpdate: null,
    yourCourse: null,
  },
  reducers: {
    setValuesUpdate: (state, action) => {
      return {
        ...state,
        valuesUpdate: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getYourCourse.fulfilled, (state, action) => {
      return { ...state, yourCourse: action.payload, error: "" };
    });
    builder.addCase(getYourCourse.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.profile = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      const { valuesUpdate } = state;
      return {
        ...state,
        loading: "succeeded",
        profile: valuesUpdate,
      };
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});
export const { setValuesUpdate } = userSlice.actions;

export default userSlice.reducer;
