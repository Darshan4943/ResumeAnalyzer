import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dev.api.skilotech.com/api/get-cities";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async ({ input, country }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params: { input, country } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cities");
    }
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default citySlice.reducer;
