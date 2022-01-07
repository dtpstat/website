import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { MapState } from "../../types";
import type { RootState } from "../store";

const initialState: MapState = {
  center: [55.76, 37.64],
  zoom: 10,
};

export const mapStateSlice = createSlice({
  name: "mapState",
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<MapState["center"]>) => {
      state.center = action.payload;
    },
    setZoom: (state, action: PayloadAction<MapState["zoom"]>) => {
      state.zoom = action.payload;
    },
    resetToDefault: (state) => {
      state.center = initialState.center;
      state.zoom = initialState.zoom;
    },
  },
});

export const { setCenter, setZoom, resetToDefault } = mapStateSlice.actions;

export const selectMapState = (state: RootState) => state.mapState;

export default mapStateSlice.reducer;
