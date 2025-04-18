import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingTrue: (state) => {
      state.loading = true;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setLoadingTrue, setLoadingFalse, toggleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
