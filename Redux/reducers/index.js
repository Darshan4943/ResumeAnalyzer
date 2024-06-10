import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { orderReducer } from "./orderReducer";
import { cartReducer } from "./cartReducer";
import { wishtReducer } from "./wishReducer";
import { allProductReducer } from "./allProductReducer";
import { addonReducer } from "./addonReducer";
import { addressReducer } from "./addressReducer";
import { timeSlotReducer } from "./timeslotReducer";
import { locationReducer } from "./locationReducer";
import { categoryReducer } from "./categoryReducer";
import locpopupReducer from "./popupReducer";
import {
  bannerReducer,
  changeNumber,
  jobReducer,
  reCallCart,
  tagReducer,
  walletPointReducer,
} from "./reducer";
import { popupReducer, recallUser, userDataReducer } from "./userReducer";
import WebsiteReducer from "./website";

const reducers = combineReducers({
  userData: userDataReducer,
  reCallUser: recallUser,
  getAllJobs: jobReducer,
  popupState:popupReducer,
  pageState: WebsiteReducer,
  popup: locpopupReducer,
});

export default reducers;
