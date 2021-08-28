import initialState from "./initialState";
import * as types from '../actions/actionTypes';


export default function studentSubjectReducer(state=initialState.studentSubjects,action){
    switch(action.type){
        case types.GET_MY_SUBJECTS_SUCCESS : {
            return action.subjects
        }
        default : return state;
    }
}