import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    address:[]
}

export const addressReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_ADDRESS:
        return {...state,address:payload};
        default:
        return state;
    }

}