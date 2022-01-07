import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchRegion } from "../../api";
import type { MapState, ShortStatisticsResponse } from "../../types";
import { resultFromApiResult } from "../../utils";
// import axios from 'axios';
import type { RootState } from "../store";

export type RegionState = {
  region: ShortStatisticsResponse;
  pendingRegion: boolean;
  regionFetchErrored: boolean;
};

const initialState: RegionState = {
  region: {
    regionName: "Московская область",
    regionSlug: "moskovskaia-oblast",
    parentRegionSlug: "moskovskaia-oblast",
    parentRegionName: "",
  },
  pendingRegion: false,
  regionFetchErrored: false,
};

const regionFieldFromApiField: Record<string, keyof RegionState["region"]> = {
  parent_region_name: "parentRegionName",
  parent_region_slug: "parentRegionSlug",
  region_name: "regionName",
  region_slug: "regionSlug",
};

export const getRegionData = createAsyncThunk(
  "data/fetchRegion",
  async ({ center, zoom }: MapState) => await fetchRegion({ center, zoom }),
);

// {parent_region_slug: 'moskva', region_name: 'Москва', region_slug: 'moskva'}

// export const test = createAsyncThunk('kanye/kanyeQuote', async () => {
//     const response = await axios.get('https://api.kanye.rest/');
//     return response.region;
// });

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    // leave this empty here
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRegionData.pending, (state) => {
        state.pendingRegion = true;
      })
      .addCase(getRegionData.fulfilled, (state, { payload }) => {
        state.pendingRegion = false;
        //   console.log(payload);
        state.region = resultFromApiResult(payload, regionFieldFromApiField);
      })
      .addCase(getRegionData.rejected, (state) => {
        state.pendingRegion = false;
        state.regionFetchErrored = true;
      });
  },
});

export const selectRegion = (state: RootState) => state.region;

export default regionSlice.reducer;
