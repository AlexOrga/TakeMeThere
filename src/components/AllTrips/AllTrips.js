import React from 'react';
import authRequests from '../../firebaseRequests/auth';
import savedTripsRequests from '../../firebaseRequests/savedtrips';
import allTripsRequests from '../../firebaseRequests/alltrips';
import activitiesRequests from '../../firebaseRequests/activities';
import citiesRequests from '../../firebaseRequests/cities';
import countriesRequests from '../../firebaseRequests/countries';

import './AllTrips.css';
import SingleTrip from '../SingleTrip/SingleTrip';

class AllTrips extends React.Component {
  state = {
    allTrips: [],
    activities: [],
    cities: [],
    countries: [],
  }

  componentDidMount () {
    allTripsRequests
      .getAllTrips()
      .then((allTrips) => {
        activitiesRequests
          .getActivities()
          .then((activities) => {
            citiesRequests
              .getCities()
              .then((cities) => {
                countriesRequests
                  .getCountries()
                  .then((countries) => {
                    this.setState({allTrips, activities, cities, countries});
                  })
                  .catch();
              })
              .catch();
          })
          .catch();
      })
      .catch((err) => {
        console.error('Error retrieving All Trips data', err);
      });
  }

  saveTripEvent = (e) => {
    e.preventDefault();
    const saveTripObj = {
      tripId: e.target.id,
      isCompleted: false,
      uid: authRequests.getUID(),
    };
    savedTripsRequests
      .saveATrip(saveTripObj)
      .then(() => {
        console.error('success');
      })
      .catch((err) => {
        console.error('error saving trip', err);
      });
  }

  render () {
    const allTripsComponents = this.state.allTrips.map((trip) => {
      return (
        <SingleTrip
          key={trip.id}
          details={trip}
          cities={this.state.cities}
          countries={this.state.countries}
          activities={this.state.activities}
          saveTripEvent={this.saveTripEvent}
        />
      );
    });
    return (
      <div>
        <h1>All Trips</h1>
        <div>
          {allTripsComponents}
        </div>
      </div>
    );
  }
}

export default AllTrips;
