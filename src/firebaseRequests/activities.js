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
        activitiesArray.sort((a, b) => {
          const textA = a.name.toLowerCase();
          const textB = b.name.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        resolve(activitiesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getActivities};
