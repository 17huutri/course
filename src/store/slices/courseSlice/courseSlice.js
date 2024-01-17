import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseApi from "../../../api/courseApi";
const initialState = {
  catalog: null,
  error: "",
  isLoading: false,
  courses: null,
  courseDetail: null,
  listCourseOfCatalog: null,
  listCoursesNew: null,
  listCoursesRate: null,
  listCoursesPopular: null,
  currentPage: 1,
  perPage: 12,
  courseSort: 0,
  page: 0,
  currentStep: 0,
  isSelected: null,
};

export const getCatalog = createAsyncThunk("course/get_catalog", async () => {
  try {
    const res = await courseApi.getCatalog();
    return res.data._data;
  } catch (error) {
    console.log(error);
  }
});

// Course
export const getCourses = createAsyncThunk(
  "course/get_top_course",
  async ({ limit, catalogIDs, courseSort }) => {
    const CourseParams = {
      offset: 0,
      limit: 999,
      minPrice: 0,
      maxPrice: 9999,
      catalogIDs: catalogIDs,
      courseSort: courseSort,
    };
    try {
      const res = await courseApi.getCourses(CourseParams);
      return res.data._data.list;
    } catch (error) {
      throw error;
    }
  }
);
export const getCoursesOfCatalog = createAsyncThunk(
  "course/get_course_of_catalog",
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
export const getCoursesPopular = createAsyncThunk(
  "course/get_Courses_Popular",
  async ({ catalogIDs }) => {
    const CourseParams = {
      offset: 0,
      limit: 10,
      minPrice: 0,
      maxPrice: 9999,
      catalogIDs: catalogIDs,
      courseSort: 1,
    };
    try {
      const res = await courseApi.getCourses(CourseParams);
      const sortedCourses = res.data._data.list.sort(
        (a, b) => b.learnerQuantity - a.learnerQuantity
      );

      return sortedCourses;
    } catch (error) {
      throw error;
    }
  }
);
export const getCoursesNew = createAsyncThunk(
  "course/get_Courses_New",
  async ({ catalogIDs }) => {
    const CourseParams = {
      offset: 0,
      limit: 10,
      minPrice: 0,
      maxPrice: 9999,
      catalogIDs: catalogIDs,
      courseSort: 3,
    };
    try {
      const res = await courseApi.getCourses(CourseParams);
      return res.data._data.list;
    } catch (error) {
      throw error;
    }
  }
);
export const getCoursesRate = createAsyncThunk(
  "course/get_Courses_Rate",
  async ({ catalogIDs }) => {
    const CourseParams = {
      offset: 0,
      limit: 10,
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
//Pagination
export const fetchCoursesByPage = createAsyncThunk(
  "course/fetchCoursesByPage",
  async (page, { getState }) => {
    const state = getState();
    const perPage = state.courseReducer.perPage;
    const offset = (page - 1) * perPage;

    try {
      const res = await courseApi.getCourses({
        offset,
        limit: 999,
        minPrice: 0,
        maxPrice: 9999,
        catalogIDs: state.courseReducer.catalogIDs,
        courseSort: state.courseReducer.courseSort,
      });
      return res.data._data.list;
    } catch (error) {
      throw error;
    }
  }
);

export const getCoursesIns = createAsyncThunk(
  "course/get-by-instructor",
  async ({ limit }) => {
    const CourseInsParams = {
      offset: 0,
      limit: limit,
    };
    try {
      const res = await courseApi.getCoursesByIns(CourseInsParams);
      return res.data._data.list;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCourse = createAsyncThunk("course/delete", async (id) => {
  try {
    const res = await courseApi.delete_course(id);
    return res;
  } catch (error) {
    throw error;
  }
});

// course detail
export const getCourseDetailById = createAsyncThunk(
  "course/course_detail_by_id",
  async (courseId) => {
    try {
      const res = await courseApi.getCourseDetail(courseId);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    increDecrePage: (state, action) => {
      const { currentPage } = state;
      return {
        ...state,
        currentPage: currentPage + action.payload,
      };
    },
    setFilter: (state, action) => {
      state.courseSort = action.payload;
    },
    changeStep: (state, action) => {
      if (action.payload !== 0) {
        const ans = state.currentStep + action.payload;
        return {
          ...state,
          currentStep: ans,
        };
      } else {
        return {
          ...state,
          currentStep: 0,
        };
      }
    },
    clearCourses: (state) => {
      return {
        ...state,
        courses: null,
      };
    },
    setIsSelected: (state, action) => {
      return {
        ...state,
        isSelected: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    //getCatalog
    builder.addCase(getCatalog.fulfilled, (state, action) => {
      return { ...state, catalog: action.payload, error: "" };
    });
    builder.addCase(getCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      return { ...state, courses: action.payload, error: "", isLoading: false };
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      return { ...state, error: action.payload, isLoading: false };
    });
    builder.addCase(getCourses.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getCoursesOfCatalog.fulfilled, (state, action) => {
      return { ...state, listCourseOfCatalog: action.payload, error: "" };
    });
    builder.addCase(getCoursesOfCatalog.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCoursesPopular.fulfilled, (state, action) => {
      return { ...state, listCoursesPopular: action.payload, error: "" };
    });
    builder.addCase(getCoursesPopular.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCoursesNew.fulfilled, (state, action) => {
      return { ...state, listCoursesNew: action.payload, error: "" };
    });
    builder.addCase(getCoursesNew.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCoursesRate.fulfilled, (state, action) => {
      return { ...state, listCoursesRate: action.payload, error: "" };
    });
    builder.addCase(getCoursesRate.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(fetchCoursesByPage.fulfilled, (state, action) => {
      return { ...state, courses: action.payload, error: "" };
    });
    builder.addCase(fetchCoursesByPage.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(getCoursesIns.fulfilled, (state, action) => {
      const sortCourse = [...action.payload];
      sortCourse.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
      return {
        ...state,
        courses: sortCourse,
        error: "",
      };
    });
    builder.addCase(getCoursesIns.rejected, (state, action) => {
      return { ...state, error: action.payload, isLoadingIns: false };
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      const { courses, isSelected } = state;

      const newCourses = courses.filter((course) => course.id !== isSelected);

      return { ...state, courses: newCourses, error: "" };
    });
    //get CourseDetail
    builder.addCase(getCourseDetailById.fulfilled, (state, action) => {
      return { ...state, courseDetail: action.payload };
    });
    builder.addCase(getCourseDetailById.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export const {
  toggleFilterSideBar,
  setCurrentPage,
  setPage,
  increDecrePage,
  setFilter,
  changeStep,
  clearCourses,
  setIsSelected,
} = courseSlice.actions;

export default courseSlice.reducer;
