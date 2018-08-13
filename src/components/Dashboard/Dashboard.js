import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <img className='dashboard-img' src="https://images.unsplash.com/photo-1510914828947-36f754990aa5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a0fac6755d2fc8fcb4c3dd5f4255d6d&auto=format&fit=crop&w=3289&q=80" alt="Person holding a compass."/>
        <div className='container main-element-container'>
          <div className='col-sm-4 text-center single-element-container'>
            <Link to='./alltrips'>
              <div className='dashboard-element'>
                <h2>All Trips</h2>
              </div>
            </Link>
          </div>
          <div className='col-sm-4 text-center single-element-container'>
            <Link to='./savedtrips'>
              <div className='dashboard-element'>
                <h2>My Saved Trips</h2>
              </div>
            </Link>
          </div>
          <div className='col-sm-4 text-center single-element-container'>
            <Link to='./newtrip'>
              <div className='dashboard-element'>
                <h2>Create A New Trip</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
