import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../../api";

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.loginUrl, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error_msg: "Login failed" }
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (payload, { rejectWithValue }) => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(api.profileUrl, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error_msg: "Profile fetch failed" }
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      jwt_token: "",
      profile: {},
    },
    loading: {
      loginLoading: false,
      profileLoading: false,
    },
    error: {
      loginError: null,
      profileError: null,
    },
  },
  reducers: {
    logout: (state) => {
      state.data.jwt_token = "";
      state.data.profile = {};
      state.error.loginError = null;
      state.error.profileError = null;
      localStorage.removeItem("jwt_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading.loginLoading = true;
      state.error.loginError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data.jwt_token = action.payload.jwt_token;
      state.loading.loginLoading = false;
      state.error.loginError = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error.loginError = action.payload;
      state.loading.loginLoading = false;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.loading.profileLoading = true;
      state.error.profileError = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.data.profile = action.payload;
      state.loading.profileLoading = false;
      state.error.profileError = null;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.error.profileError = action.payload;
      state.loading.profileLoading = false;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
