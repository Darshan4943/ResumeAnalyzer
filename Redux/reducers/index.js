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
import {
  bannerReducer,
  changeNumber,
  reCallCart,
  tagReducer,
  walletPointReducer,
} from "./reducer";
import { userDataReducer } from "./userReducer";

const reducers = combineReducers({
  userData: userDataReducer,
});

export default reducers;
