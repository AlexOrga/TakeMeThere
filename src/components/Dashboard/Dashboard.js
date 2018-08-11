import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <img className='dashboard-img' src="https://images.unsplash.com/photo-1510914828947-36f754990aa5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a0fac6755d2fc8fcb4c3dd5f4255d6d&auto=format&fit=crop&w=3289&q=80" alt="Person holding a compass."/>
        <div className='container'>
          <div className='col-sm-6 text-center'>
            <div className='dashboard-element'>
              <h2><Link to='./alltrips'>All Trips</Link></h2>
            </div>
          </div>
          <div className='col-sm-6 text-center'>
            <div className='dashboard-element'>
              <h2><Link to='./savedtrips'>My Saved Trips</Link></h2>
            </div>
          </div>
          <div className='col-sm-12 text-center'>
            <div className='dashboard-element'>
              <h2><Link to='./newtrip'>Create A New Trip</Link></h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
