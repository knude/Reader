import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shownSeries: [],
};

const shownSeriesSlice = createSlice({
  name: "shownSeries",
  initialState,
  reducers: {
    setShownSeries(state, action) {
      state.shownSeries = action.payload;
    },
  },
});

export const { setShownSeries } = shownSeriesSlice.actions;
export default shownSeriesSlice.reducer;
