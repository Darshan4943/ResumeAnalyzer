import { jwtDecode } from "jwt-decode";
import { UserAction } from "../constants/actionTypes";
import axios from "axios";

const initialState = {};

export const userDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserAction.SET_USER_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
