import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: null,
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setSeries(state, action) {
      state.series = action.payload;
    },
    addSeries(state, action) {
      state.series.push(action.payload);
    },
    removeSeries(state, action) {
      state.series = state.series.filter(
        (s) => s.abbreviation !== action.payload
      );
    },
  },
});

export const { setSeries, addSeries, removeSeries } = seriesSlice.actions;
export default seriesSlice.reducer;
