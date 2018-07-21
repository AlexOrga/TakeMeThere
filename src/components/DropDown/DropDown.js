import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './DropDown.css';

// const consoleEvent = (e) => {
//   console.error(e.target.id);
// };

class DropDown extends React.Component {

  menuItemComponent = (country) => {
    return (
      <MenuItem key={country.id} eventKey={country.id} id={country.id} onClick={this.props.addCountry}>{country.name}</MenuItem>
    );
  }

  render () {
    const countries = this.props.countries;
    const title = 'Select A Country';
    return (
      <div className="dropdown">
        <DropdownButton
          bsStyle='default'
          title={title}
          key='12'
          id={`dropdown-basic-12`}
        >
          {countries.map(this.menuItemComponent)}
        </DropdownButton>
      </div>
    );
  }
}

export default DropDown;
