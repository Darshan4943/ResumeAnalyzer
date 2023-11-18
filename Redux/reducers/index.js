import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import {  orderReducer } from './orderReducer';
import demoReducer from '../../store/demo';
import { cartReducer } from "./cartReducer";
import { wishtReducer } from "./wishReducer";
import { allProductReducer } from "./allProductReducer";
import { addonReducer } from "./addonReducer";
import { addressReducer } from "./addressReducer";
import { timeSlotReducer } from "./timeslotReducer";
import { locationReducer } from "./locationReducer";
import { categoryReducer } from "./categoryReducer";
import { addressSeter, bannerReducer, changeNumber, loginView, reCallCart, tagReducer, walletPointReducer } from "./reducer";

const reducers = combineReducers({
    allProduct: productReducer,
    // allDate: orderDateReducer,
    changeNumber:changeNumber,
    allCart: cartReducer,
    allwish: wishtReducer,
    allProducts: allProductReducer,
    allAddon: addonReducer ,
    allTimeslot: timeSlotReducer ,
    allAddress:addressReducer,
    allPincodes:locationReducer,
    allCategory:categoryReducer,
    allOrder : orderReducer,
    demo: demoReducer,
    loginView:loginView,
    allBanners:bannerReducer,
    allTags:tagReducer,
    walletPoints:walletPointReducer,
    addressSeter:addressSeter,
    reCallCart:reCallCart,
})

export default reducers;