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
  const profileData = jwtDecode(response.data.data);
  return profileData._doc;
});


export const fetchAppliedJob = createAsyncThunk('user/fetchAppliedJob', async (userId) => {
  const response = await axios.get(`http://localhost:2000/api/job/getAppliedJobs/${userId}`);

  const appliedJobData = response.data.data;
  return appliedJobData
})

export const fetchSavedJobIds = createAsyncThunk('user/fetchSavedJobIds', async (userId) => {
  const response = await axios.get(`http://localhost:2000/api/job/getSaveJobIds/${userId}`);

  const savedJobIds = response.data.savedJobIds;
  
  return savedJobIds
})




const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      userDataGlobal: null,
      profileData: null,
      appliedJobData:null,
      savedJobIds:null
    },
  },
  reducers: {
    resetState(state) {
      state.userData.userDataGlobal = null;
      state.userData.profileData = null;
      state.userData.appliedJobData=null
      state.userData.savedJobIds=null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData.userDataGlobal = action.payload;
    });

    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.userData.profileData = action.payload;
    });
    builder.addCase(fetchAppliedJob.fulfilled, (state, action) => {
      state.userData.appliedJobData = action.payload;
    });
    builder.addCase(fetchSavedJobIds.fulfilled, (state, action) => {
      state.userData.savedJobIds = action.payload;
    });
  },
});

export const { resetState } = userSlice.actions;
export default  userSlice.reducer;
