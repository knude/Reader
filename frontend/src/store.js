import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import seriesReducer from "./reducers/series.js";
import filteredSeriesReducer from "./reducers/filteredSeries.js";
import shownSeriesReducer from "./reducers/shownSeries.js";
import searchReducer from "./reducers/search.js";
import seriesViewSeriesReducer from "./reducers/seriesViewSeries.js";
import headerReducer from "./reducers/header.js";

export default configureStore({
  reducer: {
    user: userReducer,
    series: seriesReducer,
    filteredSeries: filteredSeriesReducer,
    shownSeries: shownSeriesReducer,
    search: searchReducer,
    seriesViewSeries: seriesViewSeriesReducer,
    header: headerReducer,
  },
});
