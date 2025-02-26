
import { createSlice } from "@reduxjs/toolkit";

const shareJobSlice = createSlice({
  name: "shareJob",
  initialState: {
    shareJob: false,
  },
  reducers: {
    setShareJobOpen(state) {
      state.shareJob = true;
    },
    setShareJobClose(state) {
      state.shareJob = false;
    },
  },
});

export const { setShareJobOpen, setShareJobClose } = shareJobSlice.actions;
export default shareJobSlice.reducer;
