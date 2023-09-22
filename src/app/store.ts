import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userInterfaceReducer from "../features/userInterface/userInterfaceSlice";
import martingaleReducer from "../features/martingale/martingaleSlice";

export const store = configureStore({
  reducer: {
    martingale: martingaleReducer,
    userInterface: userInterfaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
