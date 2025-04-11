import { createSlice } from '@reduxjs/toolkit';

const getLocalStorageItem = (key, fallback = 0) => {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem(key);
    return isNaN(value) || value === null ? fallback : parseInt(value);
  }
  return fallback;
};

const initialState = {
  aiHitsMonthly: getLocalStorageItem('aiHitsMonthly'),
  aiHitsMonthlyLimit: getLocalStorageItem('aiHitsMonthlyLimit'),
};

const aiHitsSlice = createSlice({
  name: 'aiHits',
  initialState,
  reducers: {
    setAiHitsData: (state, action) => {
      const { monthly, limit } = action.payload;
      state.aiHitsMonthly = monthly;
      state.aiHitsMonthlyLimit = limit;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('aiHitsMonthly', monthly);
        window.localStorage.setItem('aiHitsMonthlyLimit', limit);
      }
    },
  },
});

export const { setAiHitsData } = aiHitsSlice.actions;
export default aiHitsSlice.reducer;
