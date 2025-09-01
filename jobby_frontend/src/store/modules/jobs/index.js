import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../../api";

export const getAllJobs = createAsyncThunk(
  "getAllJobs",
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

export const getJobById = createAsyncThunk(
  "getJobById",
  async (payload, { rejectWithValue }) => {
    try {
      const { jobId } = payload;
      const response = await axios.get(`${api.jobDetailsUrl}/${jobId}`);
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
      jobDetails: {},
      similarJobs: [],
    },
    loading: {
      allJobsLoading: false,
      jobDetailsLoading: false,
    },
    error: {
      allJobsError: null,
      jobDetailsError: null,
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
    builder.addCase(getJobById.pending, (state) => {
      state.loading.jobDetailsLoading = true;
      state.error.jobDetailsError = null;
    });
    builder.addCase(getJobById.fulfilled, (state, action) => {
      state.data.jobDetails = action.payload.job_details;
      state.data.similarJobs = action.payload.similar_jobs;
      console.log("redux state.data.similarJobs", state.data.similarJobs);
      state.loading.jobDetailsLoading = false;
      state.error.jobDetailsError = null;
    });
    builder.addCase(getJobById.rejected, (state, action) => {
      state.error.jobDetailsError = action.payload;
      state.loading.jobDetailsLoading = false;
    });
  },
});

export default jobsSlice.reducer;
