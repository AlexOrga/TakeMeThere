import React from 'react';
import authRequests from '../../firebaseRequests/auth';
import savedTripsRequests from '../../firebaseRequests/savedtrips';
import allTripsRequests from '../../firebaseRequests/alltrips';
import activitiesRequests from '../../firebaseRequests/activities';
import citiesRequests from '../../firebaseRequests/cities';
import countriesRequests from '../../firebaseRequests/countries';

import SingleTrip from '../SingleTrip/SingleTrip';
import FilterCountries from '../FilterCountries/FilterCountries';
import FilterActivities from '../FilterActivities/FilterActivities';
import './AllTrips.css';

class AllTrips extends React.Component {
  state = {
    allTrips: [],
    activities: [],
    cities: [],
    countries: [],
    countryToFilterBy: '',
    activityToFilterBy: '',
  }

  componentDidMount () {
    this.retrieveAllTripsForComponent();
  }

  retrieveAllTripsForComponent () {
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

  removeTripEvent = (e) => {
    e.preventDefault();
    const tripToRemove = e.target.id;
    allTripsRequests
      .removeTrip(tripToRemove)
      .then(() => {
        this.retrieveAllTripsForComponent();
        savedTripsRequests
          .getAllSavedTrips()
          .then((allSavedTrips) => {
            const savedTripsToRemove = allSavedTrips.filter(x => x.tripId === tripToRemove);
            savedTripsToRemove.forEach(savedTrip => {
              savedTripsRequests
                .removeTrip(savedTrip.id)
                .then()
                .catch((err) => {
                  console.error('Error removing trip from savedTrips', err);
                });
            });
          })
          .catch((err) => {
            console.error('Error retrieving allSavedTrips', err);
          });
      })
      .catch((err) => {
        console.error('Error removing user trip from allTrips', err);
      });
  }

  setCountryToFilterBy = (e) => {
    const countryToFilterBy = e.target.id;
    this.setState({countryToFilterBy});
    console.log(this.state.allTrips.filter(x => x.countryId === countryToFilterBy));
  }

  filterByCountry = (trip) => {
    const countryToFilterBy = this.state.countryToFilterBy;
    if (countryToFilterBy !== '') {
      return trip.countryId === countryToFilterBy;
    } else {
      return true;
    }
  }

  setActivityToFilterBy = (e) => {
    const activityToFilterBy = e.target.id;
    this.setState({activityToFilterBy});
    console.log(this.state.allTrips.filter(x => x.activityId === activityToFilterBy));
  }

  filterByActivity = (trip) => {
    const activityToFilterBy = this.state.activityToFilterBy;
    if (activityToFilterBy !== '') {
      return trip.activityId === activityToFilterBy;
    } else {
      return true;
    }
  }

  render () {
    const allTripsComponents = this.state.allTrips.filter(this.filterByCountry).filter(this.filterByActivity).map((trip) => {
      return (
        <SingleTrip
          key={trip.id}
          details={trip}
          cities={this.state.cities}
          countries={this.state.countries}
          activities={this.state.activities}
          saveTripEvent={this.saveTripEvent}
          removeTripEvent={this.removeTripEvent}
        />
      );
    });
    return (
      <div>
        <h1>All Trips</h1>
        <div>
          <FilterCountries
            setCountryToFilterBy={this.setCountryToFilterBy}
            countries={this.state.countries}
          />
          <FilterActivities
            setActivityToFilterBy={this.setActivityToFilterBy}
            activities={this.state.activities}
          />
        </div>
        <div>
          {allTripsComponents}
        </div>
      </div>
    );
  }
}

export default AllTrips;
