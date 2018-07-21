import React from 'react';
import activitiesRequests from '../../firebaseRequests/activities';
import countriesRequests from '../../firebaseRequests/countries';

import DropDownCountries from '../DropDownCountries/DropDownCountries';
import DropDownActivities from '../DropDownActivities/DropDownActivities';
import './NewTrip.css';

class NewTrip extends React.Component {
  state = {
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
        countriesRequests
          .getCountries()
          .then((countries) => {
            this.setState({ activities, countries});
          })
          .catch();
      })
      .catch();
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

  addCity = (e) => {
    const tempTrip = {...this.state.newTrip};
    tempTrip.cityId = e.target.value;
    this.setState({newTrip: tempTrip});
  }

  addDescription = (e) => {
    const tempTrip = {...this.state.newTrip};
    tempTrip.description = e.target.value;
    this.setState({newTrip: tempTrip});
  }

  addLinkUrl = (e) => {
    const tempTrip = {...this.state.newTrip};
    tempTrip.linkUrl = e.target.value;
    this.setState({newTrip: tempTrip});
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
                value={newTrip.cityId}
                onChange={this.addCity}
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
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Sign in</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTrip;
