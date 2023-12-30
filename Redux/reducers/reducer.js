import { ActionTypes } from "../constants/actionTypes";

const initilize=0;
const cartinitilize=0;

const initialState ={
    banners:[]
}
const initialTagState ={
    tags:[]
}
const initialwalletState ={
    points:[]
}
export const changeNumber = (state=initilize,action) => {


    switch(action.type){

        case "INCREMENT" : return state+1;
        case "DECREMENT" : return state-1;
        default : return state
        
    }


}

export  const reCallCart = (state=cartinitilize,action) => {


    switch(action.type){

        case "recallCart" : return state+1;
        default : return state
        
    }


}


export const bannerReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_BANNERS:
        return {...state,banners:payload};
        default:
        return state;
    }

}
export const walletPointReducer = (state=initialwalletState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_WALLET_POINTS:
        return {...state,points:payload};
        default:
        return state;
    }

}

export const tagReducer = (state=initialTagState,{type,payload})=>{
    switch(type){
        case ActionTypes.SET_TAG:
        return {...state,tags:payload};
        default:
        return state;
    }

}