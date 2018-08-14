import React from 'react';
import PropTypes from 'prop-types';

import {tripShape} from '../../props/tripProp';
import {cityShape} from '../../props/cityProp';
import {countryShape} from '../../props/countryProp';
import {activityShape} from '../../props/activityProp';
import authRequests from '../../firebaseRequests/auth';
import './SingleTrip.css';

class SingleTrip extends React.Component {
  static propTypes = {
    details: tripShape,
    cities: PropTypes.arrayOf(cityShape),
    countries: PropTypes.arrayOf(countryShape),
    activities: PropTypes.arrayOf(activityShape),
    saveTripEvent: PropTypes.func.isRequired,
    removeTripEvent: PropTypes.func.isRequired,
  }

  renderTrip (details) {
    const cities = this.props.cities;
    const currentCity = cities.find(x => x.id === details.cityId);
    let cityName = currentCity.name;
    cityName = cityName.charAt(0).toUpperCase() + cityName.substr(1);

    const countries = this.props.countries;
    const currentCountry = countries.find(x => x.id === details.countryId);

    const activities = this.props.activities;
    const currentActivity = activities.find(x => x.id === details.activityId);

    const tripUID = details.uid;
    const UID = authRequests.getUID();

    if (UID === tripUID) {
      return (

        <div className="card col-sm-6 col-md-4">
          <div className="thumbnail box shadow">
            <div className="caption">
              <h2 className='card-activity'>{details.activityName}</h2>
              <h3>City: {cityName}</h3>
              <h4>Country: {currentCountry.name}</h4>
              <p className='card-description'>{details.description}</p>
              <h5>Activity Type: {currentActivity.name}</h5>
              <div className='card-link'>
                <a href={details.linkUrl}>Click Here To See More About This Location</a>
              </div>
              <div className='card-button-group'>
                <a href="" id={this.props.details.id} className="btn btn-success" role="button" onClick={this.props.saveTripEvent} data-micron='tada'>Save Trip</a>
                <a href="" id={this.props.details.id} className="btn btn-danger" role="button" onClick={this.props.removeTripEvent} data-micron='pop'>Remove Trip</a>
              </div>
            </div>
          </div>
        </div>
      );

    } else {

      return (
        <div className="card col-sm-6 col-md-4">
          <div className="thumbnail box shadow">
            <div className="caption">
              <h2 className='card-activity'>{details.activityName}</h2>
              <h3>City: {cityName}</h3>
              <h4>Country: {currentCountry.name}</h4>
              <p>{details.description}</p>
              <h5>Activity Type: {currentActivity.name}</h5>
              <div className='card-link'>
                <a href={details.linkUrl}>Click Here To See More About This Location</a>
              </div>
              <div className='card-button-group'>
                <a href="" id={this.props.details.id} className="btn btn-success" role="button" onClick={this.props.saveTripEvent} data-micron='tada'>Save Trip</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render () {
    const details = this.props.details;

    return (
      <div>
        {this.renderTrip(details)}
      </div>
    );
  }
}

export default SingleTrip;
