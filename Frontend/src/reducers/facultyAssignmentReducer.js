import initialState from "./initialState";
import * as types from '../actions/actionTypes';


export default function postedAssignmentReducer(state=initialState.postedAssignments,action){
    switch(action.type){
        case types.GET_MY_POSTED_ASSIGNMENTS_SUCCESS  : {
            return action.assignments;
        }
        case types.POST_ASSIGNMEMT_SUCCESS : {
            let userInfo = JSON.parse(JSON.stringify(state));
            userInfo.push(action);
            return userInfo;
        }
        default : return state;
    }
}