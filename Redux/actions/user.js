import { UserAction } from "../constants/actionTypes";

export const userAction = (date) => {
  return {
    type: UserAction.SET_USER_DATA,
    payload: date,
  };
};
