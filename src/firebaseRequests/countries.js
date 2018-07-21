import axios from 'axios';
import constants from '../constants';

const getCountries = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/countries.json`)
      .then((res) => {
        const countriesArray = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((fbKey) => {
            const newCountryObject = {};
            newCountryObject.name = res.data[fbKey];
            newCountryObject.id = fbKey;
            countriesArray.push(newCountryObject);
          });
        }
        resolve(countriesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getCountries};
