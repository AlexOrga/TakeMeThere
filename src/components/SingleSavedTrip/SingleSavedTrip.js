import React from 'react';
import PropTypes from 'prop-types';

import {savedTripShape} from '../../props/savedTripProp';
import {cityShape} from '../../props/cityProp';
import {countryShape} from '../../props/countryProp';
import {activityShape} from '../../props/activityProp';
import './SingleSavedTrip.css';

class SingleSavedTrip extends React.Component {
  static propTypes = {
    details: savedTripShape,
    cities: PropTypes.arrayOf(cityShape),
    countries: PropTypes.arrayOf(countryShape),
    activities: PropTypes.arrayOf(activityShape),
    updateIsCompletedEvent: PropTypes.func.isRequired,
    removeFromSavedTrips: PropTypes.func.isRequired,
  }

  renderTrip (details, isCompleted) {
    const cities = this.props.cities;
    const currentCity = cities.find(x => x.id === details.cityId);
    let cityName = currentCity.name;
    cityName = cityName.charAt(0).toUpperCase() + cityName.substr(1);

    const countries = this.props.countries;
    const currentCountry = countries.find(x => x.id === details.countryId);

    const activities = this.props.activities;
    const currentActivity = activities.find(x => x.id === details.activityId);

    if (isCompleted) {
      return (
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail isCompleted box shadow">
            <div className="caption">
              <h2>{details.activityName}</h2>
              <h4>{cityName}</h4>
              <h4>{currentCountry.name}</h4>
              <p>{currentActivity.name}</p>
              <p>{details.description}</p>
              <p>
                <a href={details.linkUrl}>Click Here To See More About This Location</a>
                <a
                  href=""
                  data-trip-id={this.props.details.id}
                  data-saved-trip-id={this.props.details.savedTripId}
                  data-is-completed={this.props.details.isCompleted}
                  className="btn btn-success"
                  role="button"
                  onClick={this.props.updateIsCompletedEvent}
                >Un-Do This Trip!</a>
                <a
                  href=""
                  id={this.props.details.savedTripId}
                  className="btn btn-danger"
                  role="button"
                  onClick={this.props.removeFromSavedTrips}
                >Remove Trip</a>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-sm-6 col-md-4">
          <div className = "thumbnail box shadow">
            <div className="caption">
              <h2>{details.activityName}</h2>
              <h4>{cityName}</h4>
              <h4>{currentCountry.name}</h4>
              <p>{currentActivity.name}</p>
              <p>{details.description}</p>
              <p>
                <a href={details.linkUrl}>Click Here To See More About This Location</a>
                <a
                  href=""
                  data-trip-id={this.props.details.id}
                  data-saved-trip-id={this.props.details.savedTripId}
                  className="btn btn-success"
                  role="button"
                  onClick={this.props.updateIsCompletedEvent}
                >I Did This Trip!</a>
                <a
                  href=""
                  id={this.props.details.savedTripId}
                  className="btn btn-danger"
                  role="button"
                  onClick={this.props.removeFromSavedTrips}
                >Remove Trip</a>
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  render () {
    const details = this.props.details;
    const isCompleted = details.isCompleted;

    return (
      <div>
        {this.renderTrip(details, isCompleted)}
      </div>
    );
  }
}

export default SingleSavedTrip;
