import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import './App.css';

import HomePage from '../components/HomePage/HomePage';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import AllTrips from '../components/AllTrips/AllTrips';
import NewTrip from '../components/NewTrip/NewTrip';
import AllSavedTrips from '../components/AllSavedTrips/AllSavedTrips';
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
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  runAway () {
    this.setState({authed: false});
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={HomePage}/>
                </Switch>
                <PublicRoute
                  path="/register"
                  authed={this.state.authed}
                  component={Register}
                />
                <PublicRoute
                  path="/login"
                  authed={this.state.authed}
                  component={Login}
                />
                <PrivateRoute
                  path="/dashboard"
                  authed={this.state.authed}
                  component={Dashboard}
                />
                <PrivateRoute
                  path="/alltrips"
                  authed={this.state.authed}
                  component={AllTrips}
                />
                <PrivateRoute
                  path="/newtrip"
                  authed={this.state.authed}
                  component={NewTrip}
                />
                <PrivateRoute
                  path="/savedtrips"
                  authed={this.state.authed}
                  component={AllSavedTrips}
                />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
