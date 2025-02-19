import { createSlice } from "@reduxjs/toolkit";

const recallSlice = createSlice({
  name: "recall",
  initialState: {
    
    recallData: false,
  },
  reducers: {
   
    setRecallData(state, action) {
      state.recallData = action.payload;
    },
  },
});

export const {  setRecallData } = recallSlice.actions;
export default recallSlice.reducer;
