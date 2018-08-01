import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <div>
          <h2><Link to='./alltrips'>All Trips</Link></h2>
        </div>
        <div>
          <h2><Link to='./savedtrips'>My Saved Trips</Link></h2>
        </div>
        <div>
          <h2><Link to='./newtrip'>Create A New Trip</Link></h2>
        </div>
      </div>
    );
  }
}

export default Dashboard;
