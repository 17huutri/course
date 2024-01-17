import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import adminApi from "../../api/adminApi";
import courseApi from "../../api/courseApi";
import userApi from "../../api/userApi";
import accountApi from "../../api/accountApi";
import { toast } from "react-toastify";
const initialState = {
  catalog: null,
  users: null,
  isFlag: false,
};
export const getCatalog = createAsyncThunk(
  "admin/getCatalog",
  async (_, { dispatch }) => {
    try {
      const res = await courseApi.getCatalog();
      const catalogData = res.data._data;

      const catalogPromises = catalogData.map(async (catalog) => {
        const coursesRes = await courseApi.getCourses({
          catalogIDs: catalog.id,
        });
        catalog.courseCount = coursesRes.data._data.list.length;
        return catalog;
      });

      await Promise.all(catalogPromises);

      return catalogData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUsers = createAsyncThunk("admin/get_users", async () => {
  try {
    const res = await userApi.getUsers();
    return res.data._data;
  } catch (error) {
    throw error;
  }
});
export const registerInstructor = createAsyncThunk(
  "admin/register_instructor",
  async (instructorData, { rejectWithValue }) => {
    try {
      const response = await accountApi.registerInstructor(instructorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCoursesByCatalog = createAsyncThunk(
  "course/getCourseByCatalog",
  async ({ catalogIDs }) => {
    const CourseParams = {
      offset: 0,
      limit: 999,
      minPrice: 0,
      maxPrice: 9999,
      catalogIDs: catalogIDs,
      courseSort: 0,
    };
    try {
      const res = await courseApi.getCourses(CourseParams);
      return res.data._data.list;
    } catch (error) {
      throw error;
    }
  }
);
export const updateActiveUser = createAsyncThunk(
  "admin/active_user",
  async (userData) => {
    try {
      const res = await userApi.active_user(userData);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const createCatalog = createAsyncThunk(
  "catalog/createCatalog",
  async (catalogData) => {
    try {
      const response = await adminApi.create_catalog(catalogData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateCatalog = createAsyncThunk(
  "catalog/updateCatalog",
  async (catalogData) => {
    try {
      const response = await adminApi.update_catalog(catalogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCatalog = createAsyncThunk(
  "catalog/deleteCatalog",
  async (catalogId) => {
    try {
      const response = await adminApi.delete_catalog(catalogId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCatalog.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...state, isFlag: true };
    });
    builder.addCase(deleteCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCatalog.fulfilled, (state, action) => {
      return { ...state, catalog: action.payload, isFlag: false };
    });
    builder.addCase(getCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload, isFlag: false };
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(registerInstructor.fulfilled, (state, action) => {
      toast.success("Register Successfully!!!");
      return { ...state, isFlag: true };
    });
    builder.addCase(registerInstructor.rejected, (state, action) => {
      toast.error(action.payload._message[0]);
      return { ...state, error: action.payload };
    });
    builder.addCase(updateActiveUser.fulfilled, (state, action) => {
      return { ...state, isFlag: true };
    });
    builder.addCase(updateActiveUser.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(createCatalog.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...state, catalog: [...state.catalog, action.payload._data] };
    });
    builder.addCase(createCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(updateCatalog.fulfilled, (state, action) => {
      return { ...state, isFlag: true };
    });
    builder.addCase(updateCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export const { deleteCatalogItem } = adminSlice.actions;

export default adminSlice.reducer;
