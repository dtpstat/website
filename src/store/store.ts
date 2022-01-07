import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import mapStateReducer from "./slices/mapStateSlice";
import regionReducer from "./slices/regionSlice";

export const store = configureStore({
  reducer: {
    mapState: mapStateReducer,
    region: regionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
