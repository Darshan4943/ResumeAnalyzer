// actions/popupActions.js
export const SET_ENABLE_POPUP = "SET_ENABLE_POPUP";
export const SET_SHOW_PLANS = "SET_SHOW_PLANS";

export const setEnablePopup = (value) => ({
  type: SET_ENABLE_POPUP,
  payload: value,
});
export const setShowPlans = (value) => ({
  type: SET_SHOW_PLANS,
  payload: value,
});
