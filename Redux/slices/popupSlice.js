
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    enablePopup: false,
    showPlan: false,
  },
  reducers: {
    setEnablePopup(state, action) {
      state.enablePopup = action.payload;
    },
    setShowPlans(state, action) {
      state.showPlan = action.payload;
    },
  },
});

export const { setEnablePopup, setShowPlans } = popupSlice.actions;
export default popupSlice.reducer;
