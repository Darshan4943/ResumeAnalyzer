import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';

export const actionTypes = {
    addUser: "ADD_USER",
    removeUser: "REMOVE_USER",
    updateUser: "UPDATE_USER"
};

const initialState = {
    data: {}
}

const userReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.addUser:
           return {
               data: action.payload.userData
           }
        case actionTypes.updateUser:
            return {
                data: action.payload.userData
            }
        case actionTypes.removeUser:
           return initialState
        default:
            return state;
    }
}

export const actions = {
    addUser: (userData) => ( {
        type: actionTypes.addUser,
        payload: {
            userData
        }
    } ),

    updateUser: (userData) => ( {
        type: actionTypes.updateUser,
        payload: {
            userData
        }
    } ),

    removeUser: () => ( {
        type: actionTypes.removeUser,
    } ),
}

export function* userSaga () {
    yield takeEvery( actionTypes.addUser, function* saga ( e ) {
        toast.success( "User Logged In" );
    } );

    yield takeEvery( actionTypes.updateUser, function* saga ( e ) {
        toast.success( "User Updated" );
    } );

    yield takeEvery( actionTypes.removeUser, function* saga ( e ) {
        toast.success( "User Signed Out" );
    } );
}

const persistConfig = {
    keyPrefix: "molla-",
    key: "user",
    storage
}

export default persistReducer( persistConfig, userReducer );