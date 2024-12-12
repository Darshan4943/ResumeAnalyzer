import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, { rejectWithValue }) => {
    
  try {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem('authToken'));
     
      if (token && token !== 'undefined') {
       
        const decoded = jwtDecode(token.token);
      
        const response = await axios.get(`http://localhost:2000/api/skiloteckuser/user/${decoded._id}`);
        const userData = jwtDecode(response.data.data);
      
        return {
          ...userData._doc,
        };
      }
    }
    return rejectWithValue('No valid token found');
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
  }
});

export const fetchProfileData = createAsyncThunk('user/fetchProfileData', async (userId) => {
  const response = await axios.get(`http://localhost:2000/api/candidate/${userId}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      userDataGlobal: null,
      profileData: null,
    },
  },
  reducers: {
    resetState(state) {
      state.userData.userDataGlobal = null;
      state.userData.profileData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData.userDataGlobal = action.payload;
    });

    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.userData.profileData = action.payload;
    });
  },
});

export const { resetState } = userSlice.actions;
export default  userSlice.reducer;
