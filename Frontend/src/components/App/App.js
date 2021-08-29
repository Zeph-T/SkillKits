import logo from './logo.svg';
import React from 'react';
import { Route,Redirect , withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LinearProgress } from '@material-ui/core';
import {useSelector} from 'react-redux';
import './App.css';
/*
  
*/
function App() {
  const checkingForLoggedinUser = useSelector(state => state.checkingForLoggedinUser);
  const tempState = useSelector(state=>state);
  if(checkingForLoggedinUser === true){
    return (
      <div className="verticalCenterAligned">
        <h2>CHECKING YOUR SESSION</h2>
        <LinearProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          App Page!
        </a>
      </header>
      <div>
        {/* <Route exact path="/landing" render={()=> Component} />  create Authorisation and landing page omponents Seperately
        <Route exact path="/login" render={()=>component } /> */}
      </div>  
    </div>
  );
}

export default App;
