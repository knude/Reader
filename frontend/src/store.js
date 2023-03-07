import { combineReducers, configureStore } from "@reduxjs/toolkit";

import imageReducer from "./reducers/imageReducer";

const reducer = combineReducers({
  images: imageReducer,
});

const store = configureStore({ reducer });

export default store;
