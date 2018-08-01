import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import {countryShape} from '../../props/countryProp';
import './DropDownCountries.css';

const title = 'Select A Country';

class DropDown extends React.Component {
  static propTypes = {
    addCountry: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(countryShape),
  }

  state = {
    currentCountry: '',
  }

  changeTitle = (e, country) => {
    this.props.addCountry(e);
    this.setState({currentCountry: country});
  }

  menuItemComponent = (country) => {
    return (
      <MenuItem
        key={country.id}
        eventKey={country.id}
        id={country.id}
        onClick={(e) => {
          this.changeTitle(e, country.name);
        }}
      >{country.name}</MenuItem>
    );
  }

  render () {
    const countries = this.props.countries;
    return (
      <div className="dropdown">
        <DropdownButton
          bsStyle='default'
          title={this.state.currentCountry === '' ? title : this.state.currentCountry}
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
