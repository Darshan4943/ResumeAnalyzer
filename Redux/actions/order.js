import {OrderActionType} from '../constants/actionTypes';
// import API from '../Api'

// export const fetchProducts = ()=>{
//     return async function(dispatch,getState){
//         const responce = await API.get("/product/get")

//         dispatch({type:ActionTypes.FETCH_PRODUCTS,payload:responce.data})
//     }
// }

export const orderAction = date => {
  return {
    type: OrderActionType.SET_ORDER_DATE,
    payload: date,
  };
};
