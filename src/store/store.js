import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import devoteesReducer from "./devoteesSlice";
// import moduleReducer from "./moduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    devotees: devoteesReducer,
    //  modules: moduleReducer,
  },
});
