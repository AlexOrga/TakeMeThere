import React from 'react';
import authRequests from '../../firebaseRequests/auth';
import savedTripsRequests from '../../firebaseRequests/savedtrips';
import activitiesRequests from '../../firebaseRequests/activities';
import citiesRequests from '../../firebaseRequests/cities';
import countriesRequests from '../../firebaseRequests/countries';

import './AllSavedTrips.css';
import SingleSavedTrip from '../SingleSavedTrip/SingleSavedTrip';

class AllSavedTrips extends React.Component {
  state = {
    savedTrips: [],
    activities: [],
    cities: [],
    countries: [],
  }

  componentDidMount () {
    this.retrieveSavedTripsForComponent();
  }

  retrieveSavedTripsForComponent () {
    savedTripsRequests
      .getSavedTrips(authRequests.getUID())
      .then((savedTrips) => {
        activitiesRequests
          .getActivities()
          .then((activities) => {
            citiesRequests
              .getCities()
              .then((cities) => {
                countriesRequests
                  .getCountries()
                  .then((countries) => {
                    this.setState({savedTrips, activities, cities, countries});
                  })
                  .catch();
              })
              .catch();
          })
          .catch();
      })
      .catch((err) => {
        console.error('Error retrieving Saved Trips data', err);
      });
  }

  removeFromSavedTrips = (e) => {
    e.preventDefault();
    savedTripsRequests
      .removeTrip(e.target.id)
      .then((res) => {
        this.retrieveSavedTripsForComponent();
      })
      .catch();
  }

  updateIsCompletedEvent = (e) => {
    e.preventDefault();
    const savedTripId = e.target.dataset.savedTripId;
    const tripId = e.target.dataset.tripId;
    const completedOrNot = e.target.dataset.isCompleted;

    const updatedSavedTrip = completedOrNot ? {
      isCompleted: false,
      tripId: tripId,
      uid: authRequests.getUID(),
    } : {
      isCompleted: true,
      tripId: tripId,
      uid: authRequests.getUID(),
    };

    savedTripsRequests
      .updateIsCompleted(savedTripId, updatedSavedTrip)
      .then((res) => {
        this.retrieveSavedTripsForComponent();
      })
      .catch((err) => {
        console.error('Error updated Saved Trip');
      });
  }

  render () {
    const savedTripsComponents = this.state.savedTrips.map((trip) => {
      return (
        <SingleSavedTrip
          key={trip.savedTripId}
          details={trip}
          cities={this.state.cities}
          countries={this.state.countries}
          activities={this.state.activities}
          updateIsCompletedEvent={this.updateIsCompletedEvent}
          removeFromSavedTrips={this.removeFromSavedTrips}
        />
      );
    });

    return (
      <div>
        <h1>Saved Trips</h1>
        <div>
          {savedTripsComponents}
        </div>
      </div>
    );
  }
}

export default AllSavedTrips;
