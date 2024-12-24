import { createSlice } from '@reduxjs/toolkit';


const getInitialLoginState = () => {
  const token = localStorage.getItem('authToken');
  return token && token !== 'undefined';
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false, 
  },
  reducers: {
   
    setLoginState: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setLoginState } = authSlice.actions;

export default authSlice.reducer;
