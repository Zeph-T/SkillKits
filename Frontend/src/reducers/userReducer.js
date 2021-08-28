import initialState from "./initialState";
import * as types from '../actions/actionTypes';


export default function userReducer(state=initialState,action){
    switch(action.type){
        case types.LOGIN_USER_SUCCESS : return action.user;
        default : return state;
    }
}