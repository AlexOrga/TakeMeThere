import React from 'react';

import './SingleTrip.css';

class SingleTrip extends React.Component {

  renderTrip (trip) {
    const cities = this.props.cities;
    const currentCity = cities.find(x => x.id === trip.cityId);

    const countries = this.props.countries;
    const currentCountry = countries.find(x => x.id === trip.countryId);

    const activities = this.props.activities;
    const currentActivity = activities.find(x => x.id === trip.activityId);

    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src="..." alt="..." />
          <div className="caption">
            <h3>{currentCity.name}</h3>
            <h5>{currentCountry.name}</h5>
            <p>{currentActivity.name}</p>
            <p>{trip.description}</p>
            <p>
              <a href={trip.linkUrl} className="btn btn-primary" role="button">Savage Gulf Trail</a>
              <a href="" id={this.props.details.id} className="btn btn-default" role="button" onClick={this.props.saveTripEvent}>Save Trip</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  render () {
    // const cities = this.props.cities;
    const details = this.props.details;
    // const countries = this.props.countries;
    return (
      <div>
        {this.renderTrip(details)}
      </div>
    );
  }
}

export default SingleTrip;
