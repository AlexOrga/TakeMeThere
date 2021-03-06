import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from '../../firebaseRequests/auth';

import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: 'alexorga.dev@gmail.com',
      password: 'alexorga',
    },
  }

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch((err) => {
        console.error('Error logging in', err);
      });
  }

  emailChange = (e) => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  }

  passwordChange = (e) => {
    const tempUser = {...this.state.user};
    tempUser.password = e.target.value;
    this.setState({user: tempUser});
  }

  render () {
    const { user } = this.state;
    return (
      <div className="login">
        <img className='login-img' src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd27a515bce2dade58bc288fde28f290&auto=format&fit=crop&w=2593&q=80" alt="Man sitting on a dock"/>
        <div id="login-form">
          <h1 className="login-header text-center">Login</h1>
          <form className="form-horizontal col-sm-6 col-sm-offset-3">
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              <div className="col-sm-5">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password:
              </label>
              <div className="col-sm-5">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <Link className='register-link' to="/register">Need to Register?</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-6 col-sm-offset-3">
                <button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
