import axios from 'axios';
import constants from  '../constants';

const postNewTrip = (newTrip) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/allTrips.json`, newTrip)
      .then(((res) => {
        resolve(res);
      }))
      .catch((err) => {
        reject(err);
      });
  });
};

export default {postNewTrip};
