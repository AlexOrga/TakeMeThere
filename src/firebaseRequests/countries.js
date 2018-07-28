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
        countriesArray.sort((a, b) => {
          const textA = a.name.toLowerCase();
          const textB = b.name.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        resolve(countriesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getCountries};
