import { jwtDecode } from "jwt-decode";
import { UserAction } from "../constants/actionTypes";
import axios from "axios";

const initialState = {};
const initilize = 0;
export const userDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserAction.SET_USER_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const recallUser = (state = initilize, action) => {
  switch (action.type) {
    case "RECALL":
      return state + 1;
    default:
      return state;
  }
};
