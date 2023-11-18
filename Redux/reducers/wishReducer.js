import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    wish:[]
}

export const wishtReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_WISH:
        return {...state,wish:payload};
        default:
        return state;
    }

}