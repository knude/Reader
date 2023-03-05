import { combineReducers, configureStore } from "@reduxjs/toolkit";

import albumReducer from "./reducers/albumReducer";

const reducer = combineReducers({
  album: albumReducer,
});

const store = configureStore({ reducer });

export default store;
