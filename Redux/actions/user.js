import { UserAction } from "../constants/actionTypes";

export const userAction = (date) => {
  return {
    type: UserAction.SET_USER_DATA,
    payload: date,
  };
};

export const reCallUserData = () => {


  return {
    type: "RECALL"
  }
}
export const popupVisible = () => {
  return {
    type: "visible"
  }
}
export const popupNotVisible = () => {


  return {
    type: "notvisible"
  }
}
