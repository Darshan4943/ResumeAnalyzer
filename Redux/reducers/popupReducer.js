// reducers/popupReducer.js
import { SET_ENABLE_POPUP } from "../actions/popupActions";

const initialState = {
  enablePopup: false,
};

const locpopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENABLE_POPUP:
      return {
        ...state,
        enablePopup: action.payload,
      };
    default:
      return state;
  }
};

export default locpopupReducer;
