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

const postNewCity = (newCityObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/cities.json`, newCityObj)
      .then((res) => {
        resolve(res.data.name);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// const saveNewCity = (newCityObj) => {
//   postNewCity()
//     .then((fbKey) => {
//       getCities()
//         .then((citiesArray) => {
//           return citiesArray[fbKey]
//         })
//         .catch();
//     })
//     .catch();
// };

export default {getCities, postNewCity};
