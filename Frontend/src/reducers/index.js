import {combineReducers} from 'redux';
import * as types from '../actions/actionTypes';
import { loggedInUserReducer as checkingForLoggedinUser } from './loggedInUserReducer';
import user from './userReducer';
import studentAssignmentReducer from './studentAssignmentReducer';
import facultyAssignmentReducer from './facultyAssignmentReducer';
import studentSubjectReducer from './StudentSubjectReducer';
import facultySubjectReducer from './facultySubjectReducer';

const appReducer = combineReducers({
    user,
    checkingForLoggedinUser,
    facultyAssignmentReducer,
    facultySubjectReducer,
    studentAssignmentReducer,
    studentSubjectReducer,
});

const rootReducer = (state,action)=>{
    if(action.type === types.LOGOUT_USER_SUCCESS){
        state = undefined;
    }
    return appReducer(state,action);
}

export default rootReducer;