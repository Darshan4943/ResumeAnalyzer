import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    carts:[]
}


export const cartReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_CART:
            {

                return {...state,carts:payload};
            }
        default:
        return state;
    }

}

