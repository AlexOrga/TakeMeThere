import axios from 'axios';
import constants from '../constants';

const getAllTrips = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/allTrips.json`)
      .then((res) => {
        const allTripsArray = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((fbKey) => {
            res.data[fbKey].id = fbKey;
            allTripsArray.push(res.data[fbKey]);
          });
        }
        resolve(allTripsArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getAllTrips};
