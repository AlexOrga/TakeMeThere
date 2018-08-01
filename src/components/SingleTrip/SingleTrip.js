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

        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h2>{details.activityName}</h2>
              <h4>{cityName}</h4>
              <h4>{currentCountry.name}</h4>
              <p>{currentActivity.name}</p>
              <p>{details.description}</p>
              <p>
                <a href={details.linkUrl}>Click Here To See More About This Location</a>
                <a href="" id={this.props.details.id} className="btn btn-success" role="button" onClick={this.props.saveTripEvent}>Save Trip</a>
                <a href="" id={this.props.details.id} className="btn btn-danger" role="button" onClick={this.props.removeTripEvent}>Remove Trip</a>
              </p>
            </div>
          </div>
        </div>
      );

    } else {

      return (
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h2>{details.activityName}</h2>
              <h4>{cityName}</h4>
              <h4>{currentCountry.name}</h4>
              <p>{currentActivity.name}</p>
              <p>{details.description}</p>
              <p>
                <a href={details.linkUrl}>Click Here To See More About This Location</a>
                <a href="" id={this.props.details.id} className="btn btn-success" role="button" onClick={this.props.saveTripEvent}>Save Trip</a>
              </p>
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
