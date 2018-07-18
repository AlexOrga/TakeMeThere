import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import './App.css';

import HomePage from '../components/HomePage/HomePage';
import fbConnection from '../firebaseRequests/connection';
fbConnection();

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{pathname: './login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{pathname: './dashboard', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Take Me There</h1>
        </header>
      </div>
    );
  }
}

export default App;
