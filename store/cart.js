import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

export const actionTypes = {
  addToCart: "ADD_TO_CART",
  removeFromCart: "REMOVE_FROM_CART",
  refreshStore: "REFRESH_STORE",
  updateCart: "UPDATE_CART",
  addDetails: "ADD_DETAILS",
  addShippingAddress: "ADD_SHIPPING_ADDRESS",
  updateShippingAddress: "UPDATE_SHIPPING_ADDRESS",
  addShippingPrice: "ADD_SHIPPING_PRICE",
  emptyCart: "EMPTY_CART"
};

const initialState = {
  data: {
    cart: [],
    deliveryDetails: {
      pincode: null,
      time: null,
      date: new Date(),
    },
    // shippingAddress: {
    //   firstName: "",
    //   lastName: "",
    //   company: "",
    //   country: "",
    //   state: "",
    //   address: "",
    //   city: "",
    //   pincode: "",
    //   phoneNumber: "",
    //   email: "",
    // },
    shippingAddress: [],
    shippingPrice: 0
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addToCart:
      var findIndex = state.data.cart.findIndex(
        (item) => item.id == action.payload.product.id
      );
      let qty = action.payload.qty ? action.payload.qty : 1;
      if (findIndex !== -1 && action.payload.product.variants.length > 0) {
        findIndex = state.data.cart.findIndex(
          (item) => item.name == action.payload.product.name
        );
      }

      if (findIndex !== -1) {
        return {
          data: {
            cart: [
              ...state.data.cart.reduce((acc, product, index) => {
                if (findIndex == index) {
                  acc.push({
                    ...product,
                    qty: product.qty + qty,
                    sum:
                      (action.payload.product.sale_price
                        ? action.payload.product.sale_price
                        : action.payload.product.price) *
                      (product.qty + qty),
                  });
                } else {
                  acc.push(product);
                }

                return acc;
              }, []),
            ],
            deliveryDetails: state.data.deliveryDetails,
            shippingAddress: state.data.shippingAddress,
            shippingPrice: state.data.shippingPrice,
          },
        };
      } else {
        if(!action.payload.addOn)
        {
          return {
            data: {
              cart: [
                {
                  ...action.payload.product,
                  qty: qty,
                  price: action.payload.product.sale_price
                    ? action.payload.product.sale_price
                    : action.payload.product.price,
                  sum:
                    qty *
                    (action.payload.product.sale_price
                      ? action.payload.product.sale_price
                      : action.payload.product.price),
                  addOn: action.payload.addOn
                },
                ...state.data.cart.filter(item=>item.addOn),
              ],
              deliveryDetails: {
                pincode: null,
                time: null,
                date: new Date(),
              },
              shippingAddress: state.data.shippingAddress,
              shippingPrice: 0
            },
          };
        }
        return {
          data: {
            cart: [
              ...state.data.cart,
              {
                ...action.payload.product,
                qty: qty,
                price: action.payload.product.sale_price
                  ? action.payload.product.sale_price
                  : action.payload.product.price,
                sum:
                  qty *
                  (action.payload.product.sale_price
                    ? action.payload.product.sale_price
                    : action.payload.product.price),
                addOn: action.payload.addOn
              },
            ],
            deliveryDetails: state.data.deliveryDetails,
            shippingAddress: state.data.shippingAddress,
            shippingPrice: state.data.shippingPrice,
          },
        };
      }
    case actionTypes.removeFromCart:
      return {
        data: {
          cart: [
            ...state.data.cart.filter((item) => {
              if (item.id !== action.payload.product.id) return true;
              if (item.name !== action.payload.product.name) return true;
              return false;
            }),
          ],
          deliveryDetails: state.data.deliveryDetails,
          shippingAddress: state.data.shippingAddress,
          shippingPrice: state.data.shippingPrice,
        },
      };

    case actionTypes.updateCart:
      return {
        data: {
          cart: [...action.payload.cartItems],
          deliveryDetails: state.data.deliveryDetails,
          shippingAddress: state.data.shippingAddress,
          shippingPrice: state.data.shippingPrice,
        },
      };

    case actionTypes.addDetails:
      return {
        data: {
          cart: state.data.cart,
          deliveryDetails: action.payload.details,
          shippingAddress: state.data.shippingAddress,
          shippingPrice: state.data.shippingPrice,
        },
      };
    
      case actionTypes.addShippingPrice:
      return {
        data: {
          cart: state.data.cart,
          deliveryDetails: state.data.deliveryDetails,
          shippingAddress: state.data.shippingAddress,
          shippingPrice: action.payload.details
        },
      };

    case actionTypes.addShippingAddress:
      return {
        data: {
          cart: state.data.cart,
          deliveryDetails: state.data.deliveryDetails,
          shippingAddress: [...state.data.shippingAddress,action.payload.details],
          shippingPrice: state.data.shippingPrice,
        },
      };
    
      case actionTypes.updateShippingAddress:
      state.data.shippingAddress[action.payload.index] = action.payload.details
      return {
        data: {
          cart: state.data.cart,
          deliveryDetails: state.data.deliveryDetails,
          shippingAddress: state.data.shippingAddress,
          shippingPrice: state.data.shippingPrice,
        },
      };

      case actionTypes.emptyCart:
      return {
        data: {
          cart: [],
          deliveryDetails: {
            pincode: null,
            time: null,
            date: new Date(),
          },
          shippingAddress: state.data.shippingAddress,
          shippingPrice: 0,
        },
      };

    case actionTypes.refreshStore:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  addToCart: (product,addOn = false, qty = 1, ) => ({
    type: actionTypes.addToCart,
    payload: {
      product: product,
      qty: qty,
      addOn: addOn
    },
  }),

  removeFromCart: (product) => ({
    type: actionTypes.removeFromCart,
    payload: {
      product: product,
    },
  }),

  updateCart: (cartItems) => ({
    type: actionTypes.updateCart,
    payload: {
      cartItems: cartItems,
    },
  }),

  addDetails: (details) => ({
    type: actionTypes.addDetails,
    payload: {
      details: details,
    },
  }),

  addShippingAddress: (details) => ({
    type: actionTypes.addShippingAddress,
    payload: {
      details: details,
    },
  }),

  addShippingPrice: (details) => ({
    type: actionTypes.addShippingPrice,
    payload: {
      details: details,
    },
  }),

  emptyCart: () => ({
    type: actionTypes.emptyCart,
  }),

  updateShippingAddress: (details,index) => ({
    type: actionTypes.updateShippingAddress,
    payload: {
      details: details,
      index: index,
    },
  }),
};

export function* cartSaga() {
  yield takeEvery(actionTypes.addToCart, function* saga(e) {
    toast.success("Product added to Cart");
  });

  yield takeEvery(actionTypes.removeFromCart, function* saga(e) {
    toast.success("Product removed from Cart");
  });

  yield takeEvery(actionTypes.addDetails, function* saga(e) {
    toast.success("Date Added");
  });
  //   yield takeEvery(actionTypes.updateCart, function* saga(e) {
  //     toast.success("Cart updated successfully");
  //   });
}

const persistConfig = {
  keyPrefix: "molla-",
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);
