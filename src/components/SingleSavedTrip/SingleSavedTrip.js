import React from 'react';

import './SingleSavedTrip.css';

class SingleSavedTrip extends React.Component {

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
              <a href={trip.linkUrl}>Click Here To See More About This Location</a>
              <a
                href=""
                data-trip-id={this.props.id}
                savedtripid={this.props.details.savedTripId}
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

export default SingleSavedTrip;
