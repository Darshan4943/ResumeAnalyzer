import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchAppliedJob = createAsyncThunk('job/fetchAppliedJob', async (userId) => {
    const response = await axios.get(`https://api.skilotech.com/api/job/getAppliedJobs/${userId}`);
  
    const appliedJobData = response.data.data;
    return appliedJobData
  })
  
  export const fetchSavedJobIds = createAsyncThunk('job/fetchSavedJobIds', async (userId) => {
    const response = await axios.get(`https://api.skilotech.com/api/job/getSaveJobIds/${userId}`);
  
    const savedJobIds = response.data.savedJobIds;
    
    return savedJobIds
  })
  

  const jobSlice = createSlice({
    name: 'job',
    initialState: {
      jobData: {
       
        appliedJobData:null,
        savedJobIds:null
      },
    },
    reducers: {
      resetState(state) {
        state.jobData.appliedJobData=null
        state.jobData.savedJobIds=null
      },
    },
    extraReducers: (builder) => {
     
      builder.addCase(fetchAppliedJob.fulfilled, (state, action) => {
        state.jobData.appliedJobData = action.payload;
      });
      builder.addCase(fetchSavedJobIds.fulfilled, (state, action) => {
        state.jobData.savedJobIds = action.payload;
      });
    },
  });
  
  export const { resetState } = jobSlice.actions;
  export default  jobSlice.reducer;
  