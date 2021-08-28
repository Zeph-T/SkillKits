import initialState from "./initialState";
import * as types from '../actions/actionTypes';


export default function facultySubjectReducer(state=initialState.facultySubjects,action){
    switch(action.type){
        case types.GET_MY_TEACHING_SUBJECTS_SUCCESS : {
            return action.subjects
        }
        default : return state;
    }
}