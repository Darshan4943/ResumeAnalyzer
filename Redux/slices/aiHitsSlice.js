import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateAiHit = createAsyncThunk(
  "aiHits/updateAiHit",
  async (userId, { rejectWithValue }) => {
    try {
      
      const subscriptionResponse = await axios.put(
        `http://localhost:2000/api/subscription/updateAiHits/${userId}`
      );

      
      const logsResponse = await axios.put(
        `http://localhost:2000/api/apiLogs/updateAiHits/${userId}`
      );

      
      return {
        subscription: subscriptionResponse.data,
        logs: logsResponse.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const aiHitsSlice = createSlice({
  name: "aiHits",
  initialState: {
    updateAiHit: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAiHit.fulfilled, (state, action) => {
        state.updateAiHit = action.payload;
        state.error = null;
      })
      .addCase(updateAiHit.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default aiHitsSlice.reducer;
