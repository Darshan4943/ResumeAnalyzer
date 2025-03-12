import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const fetchProfileData = createAsyncThunk('profile/fetchProfileData', async (userId) => {
    const response = await axios.get(`http://192.168.1.161:2000/api/candidate/${userId}`);
 
    const profileData = jwtDecode(response.data.data);
    const { totalExperience, _doc } = profileData;

    return { ..._doc, totalExperience };
});


const profileSlice = createSlice({
    name: 'profile',
    initialState: {

        profileData: {

            profileData: null,

        },


    },
    reducers: {
        resetState(state) {

            state.profileData.profileData = null;

        },
    },
    extraReducers: (builder) => {


        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state.profileData.profileData = action.payload;
        });

    },
});

export const { resetState } = profileSlice.actions;
export default profileSlice.reducer;
