// reducers/popupReducer.js
import { SET_ENABLE_POPUP, SET_SHOW_PLANS } from "../actions/popupActions";

const initialState = {
  enablePopup: false,
};
const planState = {
  show: false,
};

export const locpopupReducer = (state = initialState, action) => {
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
export const showPlanPopup = (state = planState, action) => {
  switch (action.type) {
    case SET_SHOW_PLANS:
      console.log(1233,action.payload)
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
};
