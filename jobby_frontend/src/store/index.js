import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import jobsReducer from "./modules/jobs";

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobsReducer,
  },
});
