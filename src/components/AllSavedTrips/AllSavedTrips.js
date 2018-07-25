import React from 'react';
import authRequests from '../../firebaseRequests/auth';
import savedTripsRequests from '../../firebaseRequests/savedtrips';
import activitiesRequests from '../../firebaseRequests/activities';
import citiesRequests from '../../firebaseRequests/cities';
import countriesRequests from '../../firebaseRequests/countries';

import './AllSavedTrips.css';
import SingleTrip from '../SingleTrip/SingleTrip';

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

  saveTripEvent = (e) => {
    e.preventDefault();
    // const saveTripObj = {
    //   tripId: e.target.id,
    //   isCompleted: false,
    //   uid: authRequests.getUID(),
    // };
    // savedTripsRequests
    //   .saveATrip(saveTripObj)
    //   .then(() => {
    //     console.error('success');
    //   })
    //   .catch((err) => {
    //     console.error('error saving trip', err);
    //   });
    console.error('False Alarm!');
  }

  render () {
    const savedTripsComponents = this.state.savedTrips.map((trip) => {
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
    // const savedTripsComponents = this.state.savedTrips.map((trip) => {
    //   return (
    //     console.error('savedTrip: ', trip)
    //   );
    // });

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
