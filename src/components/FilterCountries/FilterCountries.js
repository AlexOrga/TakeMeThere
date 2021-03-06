import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import {countryShape} from '../../props/countryProp';
import './FilterCountries.css';

const title = 'Select A Country';

class FilterCountries extends React.Component {
  static propTypes = {
    countries: PropTypes.arrayOf(countryShape),
    setCountryToFilterBy: PropTypes.func.isRequired,
    resetCountryFilter: PropTypes.func.isRequired,
  }

  state = {
    currentCountry: '',
  }

  changeTitle = (e, country) => {
    this.props.setCountryToFilterBy(e);
    this.setState({currentCountry: country});
  }

  resetFilter = () => {
    this.props.resetCountryFilter();
    this.setState({currentCountry: ''});
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
          <MenuItem>
            <button className='col-md-12 btn-danger' onClick={this.resetFilter}>Reset This Filter</button>
          </MenuItem>
          {countries.map(this.menuItemComponent)}
        </DropdownButton>
      </div>
    );
  }
}

export default FilterCountries;
