import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../../api";

export const getAllJobs = createAsyncThunk(
  api.allJobsUrl,
  async (payload, { rejectWithValue }) => {
    try {
      const { search, jobType, salaryRange } = payload;
      const response = await axios.get(
        `${api.allJobsUrl}?search=${search}&employment_type=${jobType}&minimum_package=${salaryRange}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState: {
    data: {
      jobs: [],
    },
    loading: {
      allJobsLoading: false,
    },
    error: {
      allJobsError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.loading.allJobsLoading = true;
      state.error.allJobsError = null;
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.data.jobs = action.payload;
      state.loading.allJobsLoading = false;
      state.error.allJobsError = null;
    });
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.error.allJobsError = action.payload;
      state.loading.allJobsLoading = false;
    });
  },
});

export default jobsSlice.reducer;
