
import { configureStore } from "@reduxjs/toolkit";
import websiteReducer from "./slices/websiteSlice";
import userReducer from "./slices/userSlice";
import popupReducer from "./slices/popupSlice";
import locationReducer from "./slices/locationSlice";
import jobReducer from "./slices/jobSlice";
import profileReducer from "./slices/profileSlice"
import authReducer from "./slices/loginSlice"
import recallReducer from "./slices/recallSlice"
import shareJobReducer from "./slices/shareJobSlice"
import aiHitsReducer from "./slices/aiHitsSlice.js"
import citiesReducer from "./slices/geoLocationSlice.js"
import setAiHitsReducer from "./slices/setAiHitsSlice.js"

const store = configureStore({
    reducer: {
        website: websiteReducer,
        user: userReducer,
        popup: popupReducer,
        location: locationReducer,
        job: jobReducer,
        profile: profileReducer,
        auth: authReducer,
        recall: recallReducer,
        shareJob: shareJobReducer,
        aiHits: aiHitsReducer,
        cities:citiesReducer,
        aiHits: setAiHitsReducer,
    },
});

export default store;
