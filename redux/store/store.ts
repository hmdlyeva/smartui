import { configureStore } from "@reduxjs/toolkit";
import lightReducer from "../slice/light/light";
import waterReducer from "../slice/water/water";

export const store = configureStore({
  reducer: {
    lights: lightReducer,
    waters: waterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;