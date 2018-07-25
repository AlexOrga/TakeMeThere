import axios from 'axios';
import constants from '../constants';

const saveATrip = (saveTripObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/savedTrips.json`, saveTripObj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {saveATrip};
