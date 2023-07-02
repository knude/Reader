import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: null,
};

const seriesViewSeriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setSeriesViewSeries(state, action) {
      state.series = action.payload;
    },
    addChapter(state, action) {
      state.series.chapters.push(action.payload);
    },
    removeChapter(state, action) {
      state.series.chapters = state.series.chapters.filter(
        (chapter) => chapter.number !== action.payload
      );
    },
    setTags(state, action) {
      state.series.tags = action.payload;
    },
  },
});

export const { setSeriesViewSeries, addChapter, removeChapter, setTags } =
  seriesViewSeriesSlice.actions;
export default seriesViewSeriesSlice.reducer;
