import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    addon:[]
}

export const addonReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_ADDON:
        return {...state,addon:payload};
        default:
        return state;
    }

}