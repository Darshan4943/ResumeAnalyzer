import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    timeslot:[]
}

export const timeSlotReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_TIMESLOT:
        return {...state,timeslot:payload};
        default:
        return state;
    }

}