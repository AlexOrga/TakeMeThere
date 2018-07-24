import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './DropDownActivities.css';

// const consoleEvent = (e) => {
//   console.error(e.target.id);
// };

class DropDown extends React.Component {

  menuItemComponent = (activity) => {
    return (
      <MenuItem key={activity.id} eventKey={activity.id} id={activity.id} onClick={this.props.addActivity}>{activity.name}</MenuItem>
    );
  }

  render () {
    const activities = this.props.activities;
    const title = 'Select An Activity';
    return (
      <div className="dropdown">
        <DropdownButton
          bsStyle='default'
          title={title}
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
