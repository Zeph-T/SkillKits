import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { checkForLoggedInUser } from './actions/userActions';
import {Route , HashRouter as Router} from 'react-router-dom';
import App from './components/App/App';
import './index.css';
// import App from './App';

const store = configureStore();

store.dispatch(checkForLoggedInUser()).then(user=>{
  /*
    if(user.isAdmin){
      store.dispatch(getMyTeachingSubjects()).then(()=>{
        store.dispatch(getMyPostedAssignments()).then(()=>{
          store.dispatch(getMyTeachingSchedule());
        })
      });
    }else{
      store.dispatch(getMySubjects()).then(()=>{
        store.dispatch(getMyAssignments()).then(()=>{
          store.dispatch(getMySchedule());
        })
      })
    }
  */
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

