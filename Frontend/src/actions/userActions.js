import {api} from '../utilities';
import {beginCheckForLoggedInUser,checkForLoggedInUserSuccess,checkForLoggedInUserFailure} from './statusActions';
import * as types from './actionTypes';


export function loginUserSuccess(user){
    return {type : types.LOGIN_USER_SUCCESS , user};
}

export function checkForLoggedInUser(){
    return function (dispatch,getState){
        dispatch(beginCheckForLoggedInUser());
        return fetch(api.BASE_URL + api.CHECK_FOR_LOGGED_IN_USER,{
            method : 'get',
            headers: {
                "Content-type": "application/json"
              }
            }).then(function(response) {
                return response.json();
            }).then(data=>{
                if(data.error){
                    throw data.error
                }
                dispatch(checkForLoggedInUserSuccess());
                dispatch(loginUserSuccess(data));
                return data;
            }).catch(err=>{
                dispatch(checkForLoggedInUserFailure())
                throw err;
            });
    }
}


export function login(userInfo){
    return function(dispatch,getState){
        return fetch(api.BASE_URL + api.STUDENT_LOGIN_URL,{
            method : 'post',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(userInfo)
        }).then(function(response){
            return response.json();
        }).then(data=>{
            if(data.error){
                throw data.error;
            }
            dispatch(loginUserSuccess(data));
            return data;
        })
    }
}