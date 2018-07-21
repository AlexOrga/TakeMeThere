import axios from 'axios';
import constants from '../constants';

const getCities = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/cities.json`)
      .then((res) => {
        const citiesArray = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((fbKey) => {
            res.data[fbKey].id = fbKey;
            citiesArray.push(res.data[fbKey]);
          });
        }
        resolve(citiesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getCities};
