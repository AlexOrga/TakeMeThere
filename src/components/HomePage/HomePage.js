import React from 'react';

import './HomePage.css';

class HomePage extends React.Component {
  render () {
    return (
      <div className='main-container'>
        <img className='main-img' src='https://images.unsplash.com/photo-1484544808355-8ec84e534d75?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc1407c2a550b0ebf3def8b81fa7b4a2&auto=format&fit=crop&w=3332&q=80' alt='map'/>
        <h1 className='title'>Take Me There</h1>
      </div>
    );
  }
}

export default HomePage;
