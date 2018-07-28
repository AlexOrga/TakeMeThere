import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './FilterActivities.css';

const title = 'Select an Activity';

class FilterActivities extends React.Component {
  state = {
    currentActivity: '',
  }

  changeTitle = (e, activity) => {
    this.props.setActivityToFilterBy(e);
    this.setState({currentActivity: activity});
  }

  menuItemComponent = (activity) => {
    return (
      <MenuItem
        key={activity.id}
        eventKey={activity.id}
        id={activity.id}
        onClick={(e) => {
          this.changeTitle(e, activity.name);
        }}
      >{activity.name}</MenuItem>
    );
  }

  render () {
    const activities = this.props.activities;
    return (
      <div className="dropdown">
        <DropdownButton
          bsStyle='default'
          title={this.state.currentActivity === '' ? title : this.state.currentActivity}
          key='12'
          id={`dropdown-basic-12`}
        >
          {activities.map(this.menuItemComponent)}
        </DropdownButton>
      </div>
    );
  }
}

export default FilterActivities;
