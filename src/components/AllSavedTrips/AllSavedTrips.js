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
      })
      .catch();
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
          updateIsComplete={this.updateIsComplete}
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
