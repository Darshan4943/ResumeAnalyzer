import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updateAiHit = createAsyncThunk(
  "aiHits/updateAiHit",
  async (userId) => {
    const response = await axios.put(
      `https://jamblix.com/api/subscription/updateAiHits/${userId}`
    );
    return response.data;
  }
);

const aiHitsSlice = createSlice({
  name: "aiHits",
  initialState: {
    updateAiHit: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAiHit.fulfilled, (state, action) => {
      state.updateAiHit = action.payload;
    });
  },
});

export default aiHitsSlice.reducer;
