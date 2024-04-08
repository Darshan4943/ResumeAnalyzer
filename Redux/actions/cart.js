import { CartAction } from "../constants/actionTypes"

export const setCart = (carts)=>{
    return {
        type:CartAction.SET_CART,
        payload:carts,
    }
}
