import axios from 'axios';
import constants from '../constants';

const getActivities = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/activities.json`)
      .then((res) => {
        const activitiesArray = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((fbKey) => {
            const newActivityObject = {};
            newActivityObject.name = res.data[fbKey];
            newActivityObject.id = fbKey;
            activitiesArray.push(newActivityObject);
          });
        }
        resolve(activitiesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getActivities};
