import React from 'react';
import { Link } from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';

import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  registerClickEvent = e => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch((err) => {
        console.error('Error registering new user', (err));
      });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className="Register">
        <img className='register-img' src="https://images.unsplash.com/photo-1492681950396-e1052bfa206e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fbba4f198ac7036f8857f9f75be3a857&auto=format&fit=crop&w=2240&q=80" alt="Rock split in half in the ocean"/>
        <div id="login-form">
          <h1 className="text-center">Register</h1>
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
                <Link to="/login">Need to Login?</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-6 col-sm-offset-3">
                <button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.registerClickEvent}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
