import { ActionTypes } from "../constants/actionTypes";

const initilize = 0;
const reCallAddressState = 0;
const reCallCartState = 0;
const cartinitilize = 0;
const loginVisible = false;

const initialState = {
  banners: [],
};
const initialTagState = {
  tags: [],
};
const initialwalletState = {
  points: [],
};
export const changeNumber = (state = initilize, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
export const addressSeter = (state = reCallAddressState, action) => {
  switch (action.type) {
    case "RECALL":
      return state + 1;
    default:
      return state;
  }
};
export const reCallCart = (state = reCallCartState, action) => {
  switch (action.type) {
    case "RECALLCART":
      return state + 1;
    default:
      return state;
  }
};

export const loginView = (state = loginVisible, action) => {
  switch (action.type) {
    case "loginVisible":
      return (state = true);
    case "loginNonVisible":
      return (state = false);
    default:
      return state;
  }
};

export const bannerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BANNERS:
      return { ...state, banners: payload };
    default:
      return state;
  }
};
export const walletPointReducer = (
  state = initialwalletState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_WALLET_POINTS:
      return { ...state, points: payload };
    default:
      return state;
  }
};

export const tagReducer = (state = initialTagState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TAG:
      return { ...state, tags: payload };
    default:
      return state;
  }
};
