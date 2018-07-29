import React from 'react';

import './SingleSavedTrip.css';

class SingleSavedTrip extends React.Component {

  renderTrip (details, isCompleted) {
    const cities = this.props.cities;
    const currentCity = cities.find(x => x.id === details.cityId);

    const countries = this.props.countries;
    const currentCountry = countries.find(x => x.id === details.countryId);

    const activities = this.props.activities;
    const currentActivity = activities.find(x => x.id === details.activityId);

    if (isCompleted) {
      return (
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail isCompleted">
            <img src="..." alt="..." />
            <div className="caption">
              <h2>{details.activityName}</h2>
              <h4>{currentCity.name}</h4>
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
          <div className = "thumbnail">
            <img src="..." alt="..." />
            <div className="caption">
              <h2>{details.activityName}</h2>
              <h4>{currentCity.name}</h4>
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
