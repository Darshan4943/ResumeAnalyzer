import { ActionTypes } from "../constants/actionTypes"

export const setProducts = (products)=>{
    return {
        type:ActionTypes.SET_PRODUCTS,
        payload:products,
    }
}
export const selectedProducts = (product)=>{
    return {
        type:ActionTypes.SELECTED_PRODUCTS,
        payload:product,
    }
}

export const setCart = (carts)=>{
    return {
        type:ActionTypes.SET_CART,
        payload:carts,
    }
}
export const setWish = (wish)=>{
    return {
        type:ActionTypes.SET_WISH,
        payload:wish,
    }
}
export const setAllProducts = (products)=>{
    return {
        type:ActionTypes.SET_ALL_PRODUCTS,
        payload:products,
    }
}
export const setAddon = (addon)=>{
    return {
        type:ActionTypes.SET_ADDON,
        payload:addon,
    }
}
export const setAddress = (address)=>{
    return {
        type:ActionTypes.SET_ADDRESS,
        payload:address,
    }
}
export const setTag = (tags)=>{
    return {
        type:ActionTypes.SET_TAG,
        payload:tags,
    }
}
export const setLocation = (location)=>{
    return {
        type:ActionTypes.SET_LOCATION,
        payload:location,
    }
}
export const setCategory = (category)=>{
    return {
        type:ActionTypes.SET_CATEGORY,
        payload:category,
    }
}
export const setOrder = (order)=>{
    return {
        type:ActionTypes.SET_ORDER,
        payload:order,
    }
}
export const setBanners = (banners)=>{
    return {
        type:ActionTypes.SET_BANNERS,
        payload:banners,
    }
}
export const setWalletPoints = (points)=>{
    return {
        type:ActionTypes.SET_WALLET_POINTS,
        payload:points,
    }
}
export const incNumber = ()=>{


    return{
        type:"INCREMENT"
    }
}
export const inCartNumber = ()=>{


    return{
        type:"recallCart"
    }
}
export const decNumber = ()=>{


    return{
        type:"DECREMENT"
    }
}