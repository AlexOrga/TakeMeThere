import React from 'react';
import authRequests from '../../firebaseRequests/auth';
import activitiesRequests from '../../firebaseRequests/activities';
import countriesRequests from '../../firebaseRequests/countries';
import citiesRequests from '../../firebaseRequests/cities';
import newTripRequests from '../../firebaseRequests/newtrip';

import DropDownCountries from '../DropDownCountries/DropDownCountries';
import DropDownActivities from '../DropDownActivities/DropDownActivities';
import './NewTrip.css';

class NewTrip extends React.Component {
  state = {
    currentCity: '',
    cities: [],
    activities: [],
    countries: [],
    newTrip: {
      activityId: '',
      cityId: '',
      countryId: '',
      description: '',
      linkUrl: '',
      uid: '',
    },
  }

  componentDidMount () {
    activitiesRequests
      .getActivities()
      .then((activities) => {
        citiesRequests
          .getCities()
          .then((cities) => {
            countriesRequests
              .getCountries()
              .then((countries) => {
                const newTrip = {...this.state.newTrip};
                newTrip.uid = authRequests.getUID();
                this.setState({activities, countries, cities, newTrip});
              })
              .catch();
          })
          .catch();
      })
      .catch();
  }

  addCurrentCity = (e) => {
    let tempCity = {...this.state.currentCity};
    tempCity = e.target.value;
    this.setState({currentCity: tempCity});
  }

  addCountryId = (e) => {
    const newTrip = {...this.state.newTrip};
    newTrip.countryId = e.target.id;
    this.setState({newTrip});
  }

  addActivityId = (e) => {
    const newTrip = {...this.state.newTrip};
    newTrip.activityId = e.target.id;
    this.setState({newTrip});
  }

  addCityId = (cityId) => {
    const newTripObj = {...this.state.newTrip};
    newTripObj.cityId = cityId;
    newTripRequests
      .postNewTrip(newTripObj)
      .then(() => {
        console.error('success');
      })
      .catch(() => {
        console.error('epic fail');
      });
  }

  addDescription = (e) => {
    const newTrip = {...this.state.newTrip};
    newTrip.description = e.target.value;
    this.setState({newTrip: newTrip});
  }

  addLinkUrl = (e) => {
    const newTrip = {...this.state.newTrip};
    newTrip.linkUrl = e.target.value;
    this.setState({newTrip: newTrip});
  }

  getNewTripForSave = () => {
    return this.state.newTrip;
  }

  saveTripEvent = (e) => {
    e.preventDefault();
    const cities = this.state.cities;
    const currentCountryId = this.state.newTrip.countryId;
    const currentCity = this.state.currentCity.toLowerCase();
    const cityId = cities.find(x => x.name === currentCity && x.countryId === currentCountryId);
    if (cityId !== undefined) {
      this.addCityId(cityId.id);
    } else {
      const newCityObj = {
        name: currentCity,
        countryId: currentCountryId,
      };
      console.error('newCityObj', newCityObj);
      citiesRequests
        .postNewCity(newCityObj)
        .then((fbKey) => {
          this.addCityId(fbKey);
        })
        .catch();
    }
  }

  render () {
    const newTrip = this.state.newTrip;
    return (
      <div>
        <h1 className="header">NewTrip</h1>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputCity" className="col-sm-2 control-label">City</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputCity"
                placeholder="City Name"
                value={this.state.currentCity}
                onChange={this.addCurrentCity}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="Description"
                value={newTrip.description}
                onChange={this.addDescription}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputLinkUrl" className="col-sm-2 control-label">Link URL</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputLinkUrl"
                placeholder="Enter The URL Here"
                value={newTrip.linkUrl}
                onChange={this.addLinkUrl}
              />
            </div>
          </div>
          <div>
            <DropDownCountries
              addCountry={this.addCountryId}
              countries={this.state.countries}
            />
          </div>
          <div>
            <DropDownActivities
              addActivity={this.addActivityId}
              activities={this.state.activities}
            />
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="submit"
                className="btn btn-default"
                onClick={this.saveTripEvent}
              >Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTrip;
