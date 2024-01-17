import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseApi from "../../../api/courseApi";

export const createCourse = createAsyncThunk("course/create", async (data) => {
  const {
    nameCourse,
    description,
    outCome,
    priceCourse,
    imageMain,
    videoMain,
    category,
  } = data;
  console.log("data", data);

  const course_create = {
    name: nameCourse,
    description: description,
    price: priceCourse,
    image: imageMain,
    outcome: outCome,
    videoIntroduction: videoMain,
    catalogIDs: category,
  };

  console.log("course_create", course_create);

  try {
    const res = await courseApi.create_course(course_create);
    console.log(res);
  } catch (error) {
    throw error;
  }
});

export const updateCourse = createAsyncThunk("course/update", async (data) => {
  const {
    id,
    nameCourse,
    description,
    outCome,
    priceCourse,
    imageMain,
    videoMain,
    category,
  } = data;

  const course_update = {
    id,
    name: nameCourse,
    description: description,
    price: priceCourse,
    image: imageMain,
    outcome: outCome,
    videoIntroduction: videoMain,
    catalogIDs: category,
  };

  try {
    const res = await courseApi.update_course(course_update);
    console.log(res);
  } catch (error) {
    throw error;
  }
});

const initialState = {
  formValue: {
    id: "",
    nameCourse: "",
    description: "",
    outCome: "",
    priceCourse: 0,
    category: [],
    imageMain: "",
    videoMain: "",
  },
  isfillfull: false,
  error: true,
  isLoading: false,
  isUpdateForm: false,
  isUpdateSuccess: false,
};

const createCourseSlice = createSlice({
  name: "createCource",
  initialState,
  reducers: {
    isFillingfull: (state, action) => {
      const { data, newCategory, id } = action.payload;

      let idAction = data.id ? data.id : id;
      return {
        ...state,
        isUpdateSuccess: false,
        formValue: {
          id: idAction,
          nameCourse: data.nameCourse,
          description: data.description,
          outCome: data.outCome,
          priceCourse: data.priceCourse,
          category: newCategory ? newCategory : data.category,
          imageMain: data.imageMain,
          videoMain: data.videoMain,
        },
      };
    },
    isFulled: (state, action) => {
      return {
        ...state,
        isfillfull: action.payload,
      };
    },
    isUpdatingForm: (state, action) => {
      return {
        ...state,
        formValue: {
          id: action.payload.id,
          nameCourse: action.payload.name,
          description: action.payload.description,
          outCome: action.payload.outcome,
          priceCourse: action.payload.price,
          category: action.payload.catalogIDs,
          imageMain: action.payload.image,
          videoMain: action.payload.videoIntroduction,
        },
      };
    },
    isUpdatedForm: (state, action) => {
      return {
        ...state,
        isUpdateForm: action.payload,
      };
    },
    isCancelForm: (state, action) => {
      return {
        ...state,
        formValue: {
          nameCourse: "",
          description: "",
          outCome: "",
          priceCourse: 0,
          category: [],
          imageMain: "",
          videoMain: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCourse.pending, (state, action) => {
      return { ...state, error: false, isLoading: true };
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      return {
        ...state,
        error: false,
        isLoading: false,
        formValue: {
          nameCourse: "",
          description: "",
          outCome: "",
          priceCourse: 0,
          category: [],
          imageMain: "",
          videoMain: "",
        },
      };
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      return { ...state, error: true, isLoading: false };
    });
    builder.addCase(updateCourse.pending, (state, action) => {
      return { ...state, error: false, isLoading: true, isUpdateForm: true };
    });
    builder.addCase(updateCourse.rejected, (state, action) => {
      return { ...state, error: true, isLoading: false, isUpdateForm: true };
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      return {
        ...state,
        error: false,
        isLoading: false,
        isUpdateSuccess: true,
        formValue: {
          nameCourse: "",
          description: "",
          outCome: "",
          priceCourse: 0,
          category: [],
          imageMain: "",
          videoMain: "",
        },
      };
    });
  },
});

export const {
  isFillingfull,
  isFulled,
  isUpdatingForm,
  isUpdatedForm,
  isCancelForm,
} = createCourseSlice.actions;

export default createCourseSlice.reducer;
