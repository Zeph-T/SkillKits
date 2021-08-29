import logo from './logo.svg';
import React from 'react';
import { Route,Redirect , withRouter } from 'react-router-dom';
import './App.css';
/*
  
*/
function App() {
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
        {/* <Route exact path="/landing" render={()=> Component} />  create Authorisation and landing page components Seperately
        <Route exact path="/login" render={()=>component } /> */}
      </div>  
    </div>
  );
}

export default App;
