import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import {activityShape} from '../../props/activityProp';
import './FilterActivities.css';

const title = 'Select an Activity';

class FilterActivities extends React.Component {
  static propTypes = {
    activities: PropTypes.arrayOf(activityShape),
    setActivityToFilterBy: PropTypes.func.isRequired,
    resetActivityFilter: PropTypes.func.isRequired,
  }

  state = {
    currentActivity: '',
  }

  changeTitle = (e, activity) => {
    this.props.setActivityToFilterBy(e);
    this.setState({currentActivity: activity});
  }

  resetFilter = () => {
    this.props.resetActivityFilter();
    this.setState({currentActivity: ''});
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
          <MenuItem>
            <button className='col-md-12 btn-danger' onClick={this.resetFilter}>Reset This Filter</button>
          </MenuItem>
          {activities.map(this.menuItemComponent)}
        </DropdownButton>
      </div>
    );
  }
}

export default FilterActivities;
