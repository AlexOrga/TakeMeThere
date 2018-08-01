import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import {activityShape} from '../../props/activityProp';
import './DropDownActivities.css';

const title = 'Select an Activity';

class DropDown extends React.Component {
  static propTypes = {
    addActivity: PropTypes.func.isRequired,
    activities: PropTypes.arrayOf(activityShape),
  }

  state = {
    currentActivity: '',
  }

  changeTitle = (e, activity) => {
    this.props.addActivity(e);
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

export default DropDown;
