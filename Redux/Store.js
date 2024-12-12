
import { configureStore } from "@reduxjs/toolkit";
import websiteReducer from "./slices/websiteSlice";
import userReducer from "./slices/userSlice";
import popupReducer from "./slices/popupSlice";
import locationReducer from "./slices/locationSlice";

const store = configureStore({
    reducer: {
        website: websiteReducer,
        user: userReducer,
        popup: popupReducer,
        location: locationReducer,
    },
});

export default store;
