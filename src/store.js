import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
