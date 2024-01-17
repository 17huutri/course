import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import curriculumApi from "../../../api/curriculumApi";
import courseApi from "../../../api/courseApi";

export const createSection = createAsyncThunk(
  "section/add-section",
  async (data) => {
    const { nameSection, descriptionSec, courseID } = data;
    const sectionCreate = {
      name: nameSection,
      description: descriptionSec,
    };

    try {
      const res = await curriculumApi.addSection(sectionCreate, courseID);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const updateSection = createAsyncThunk(
  "section/update-section",
  async (data) => {
    const { nameSection, descriptionSec, courseID, id } = data;
    console.log(data);
    const sectionUpdate = {
      id,
      name: nameSection,
      description: descriptionSec,
      status: true,
    };
    try {
      const res = await curriculumApi.editSection(sectionUpdate);
      console.log(res);
      return res.data._data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSection = createAsyncThunk(
  "section/delete-section",
  async (id) => {
    try {
      const res = await curriculumApi.deleteSection(id);
      return res;
    } catch (error) {
      throw error;
    }
  }
);
export const getSection = createAsyncThunk(
  "course/my-courses/course-detail",
  async (courseID) => {
    try {
      const res = await courseApi.getMyCourseDetail(courseID);
      return res.data._data.sections;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  courseSec: null,
  sectionForm: {
    id: "",
    nameSection: "",
    descriptionSec: "",
  },
  isfillfull1: false,
  courseID: "",
  error: "",
  isUpdateSection1: false,
  isSelectedd: null,
};
const curriculumSlice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    isFullingfull1: (state, action) => {
      return {
        ...state,
        sectionForm: {
          nameSection: action.payload.nameSection,
          descriptionSec: action.payload.descriptionSec,
        },
      };
    },
    isCousedSelect: (state, action) => {
      return {
        ...state,
        courseID: action.payload,
      };
    },
    isUpdateSection: (state, action) => {
      return {
        ...state,
        sectionForm: {
          id: action.payload.id,
          nameSection: action.payload.name,
          descriptionSec: action.payload.description,
        },
      };
    },
    isUpdateSec: (state, action) => {
      return { ...state, isUpdateSection1: action.payload };
    },
    setIsSelectedd: (state, action) => {
      return { ...state, isSelectedd: action.payload };
    },
    isCancelFormSec: (state, action) => {
      return {
        ...state,
        sectionForm: {
          nameSection: "",
          descriptionSec: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSection.fulfilled, (state, action) => {
      return { ...state, courseSec: action.payload, error: "" };
    });
    builder.addCase(getSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(createSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(createSection.fulfilled, (state, action) => {
      const { courseSec } = state;
      // console.log(action);
      // const newCourseSec = [...courseSec, action.payload];
      return {
        ...state,
        error: false,
        sectionForm: {
          nameSection: "",
          descriptionSec: "",
        },
        // courseSec: newCourseSec,
      };
    });
    builder.addCase(updateSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(updateSection.fulfilled, (state, action) => {
      const { courseSec } = state;
      const { id } = action.payload;
      const isInCourseUpdate = courseSec.findIndex((item) => item.id === id);
      if (isInCourseUpdate >= 0) {
        const newCourseSec = [...courseSec];
        const a = newCourseSec.splice(isInCourseUpdate);

        // return {
        //   ...state,
        //   error: false,
        //   sectionForm: {
        //     nameSection: "",
        //     descriptionSec: "",
        //   },
        //   courseSec: a,
        // };
      }
    });
    builder.addCase(deleteSection.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(deleteSection.fulfilled, (state, action) => {
      const { courseSec, isSelectedd } = state;

      const newCourses = courseSec.filter(
        (section) => section.id !== isSelectedd
      );

      return { ...state, courseSec: newCourses, error: "" };
    });
  },
});

export const {
  isFullingfull1,
  isCousedSelect,
  setIsSelectedd,
  isUpdateSection,
  isUpdateSec,
  isCancelFormSec,
} = curriculumSlice.actions;

export default curriculumSlice.reducer;
