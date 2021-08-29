import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';
import { Provider } from 'react-redux';
import { checkForLoggedInUser , getMyTeachingSubjects,getTeachingSchedule , getMySujects , getStudentSchedule } from './actions/userActions';
import {Route , HashRouter as Router} from 'react-router-dom';
import App from './components/App/App';
import './index.css';
// import App from './App';

const store = configureStore(initialState);

store.dispatch(checkForLoggedInUser()).then(user=>{
    if(user.isAdmin){
      store.dispatch(getTeachingSchedule()).then(()=>{
      })
      store.dispatch(getMyTeachingSubjects()).then(()=>{
      })
    }else{
      store.dispatch(getStudentSchedule()).then(()=>{
      })
      store.dispatch(getMySujects()).then(()=>{
      })
    }
}).catch(err=>{
  window.location.hash = '/';
})

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path='/' component={App} />
       </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

