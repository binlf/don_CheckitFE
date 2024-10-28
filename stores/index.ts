import { configureStore } from "@reduxjs/toolkit";
import capsulesReducer from "./slices/capsules-slice";

export const store = configureStore({
  reducer: {
    capsules: capsulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
