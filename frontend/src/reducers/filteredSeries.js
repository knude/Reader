import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredSeries: [],
};

const filteredSeriesSlice = createSlice({
  name: "filteredSeries",
  initialState,
  reducers: {
    setFilteredSeries(state, action) {
      state.filteredSeries = action.payload;
    },
  },
});

export const { setFilteredSeries } = filteredSeriesSlice.actions;
export default filteredSeriesSlice.reducer;
