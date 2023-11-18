import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    location:[]
}

export const locationReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_LOCATION:
        return {...state,location:payload};
        default:
        return state;
    }

}