import { configureStore } from "@reduxjs/toolkit";
import lightReducer from "../slice/light/light";

export const store = configureStore({
  reducer: {
    lights: lightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;