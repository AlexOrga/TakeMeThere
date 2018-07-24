import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './DropDownCountries.css';

// const consoleEvent = (e) => {
//   console.error(e.target.id);
// };

const title = 'Select A Country';

class DropDown extends React.Component {

  // changeTitle = (e) => {
  //   this.props.addCountry();
  //   console.error('e: ', e);
  // }

  menuItemComponent = (country) => {
    return (
      <MenuItem key={country.id} eventKey={country.id} id={country.id} onClick={this.props.addCountry}>{country.name}</MenuItem>
    );
  }

  render () {
    const countries = this.props.countries;
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
