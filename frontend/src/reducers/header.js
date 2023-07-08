import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleHeader: (state) => {
      state.hidden = !state.hidden;
    },
  },
});

export const { toggleHeader } = headerSlice.actions;
export default headerSlice.reducer;
