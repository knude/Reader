import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import seriesReducer from "./reducers/series.js";
import filteredSeriesReducer from "./reducers/filteredSeries.js";
import shownSeriesReducer from "./reducers/shownSeries.js";
import searchReducer from "./reducers/search.js";

export default configureStore({
  reducer: {
    user: userReducer,
    series: seriesReducer,
    filteredSeries: filteredSeriesReducer,
    shownSeries: shownSeriesReducer,
    search: searchReducer,
  },
});
