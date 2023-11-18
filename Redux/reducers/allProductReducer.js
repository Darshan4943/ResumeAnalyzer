import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    products:[]
}

export const allProductReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_ALL_PRODUCTS:
        return {...state,products:payload};
        default:
        return state;
    }

}