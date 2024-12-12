
import { createSlice } from "@reduxjs/toolkit";

const websiteSlice = createSlice({
  name: "website",
  initialState: {
    pageOpened: false,
  },
  reducers: {
    setPageOpened(state) {
      state.pageOpened = true;
    },
    setPageClosed(state) {
      state.pageOpened = false;
    },
  },
});

export const { setPageOpened, setPageClosed } = websiteSlice.actions;
export default websiteSlice.reducer;
