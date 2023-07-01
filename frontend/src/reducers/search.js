import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  tag: "",
  currentPage: 1,
  latest: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setTag(state, action) {
      state.tag = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setLatest(state, action) {
      state.latest = action.payload;
    },
  },
});

export const { setSearch, setTag, setCurrentPage, setLatest } =
  searchSlice.actions;
export default searchSlice.reducer;
