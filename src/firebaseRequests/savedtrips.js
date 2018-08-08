import axios from 'axios';
import constants from '../constants';

const getAllSavedTripsByUid = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/savedTrips.json?orderBy="uid"&equalTo="${uid}"`)
      .then((res) => {
        const savedTrips = [];
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          savedTrips.push(res.data[fbKey]);
        });
        resolve(savedTrips);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSavedTripsByUid = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/savedTrips.json?orderBy="uid"&equalTo="${uid}"`)
      .then((res) => {
        const savedTrips = [];
        if (res.data !== 'null') {
          Object.keys(res.data).forEach((fbKey) => {
            const isCompleted = res.data[fbKey].isCompleted;
            getSingleTripFromAllTrips(res.data[fbKey].tripId)
              .then((singleTrip) => {
                singleTrip.savedTripId = fbKey;
                singleTrip.isCompleted = isCompleted;
                savedTrips.push(singleTrip);
              })
              .catch((err) => {
                console.error('Error retrieving Saved Trips data');
              });
          });
        }
        resolve(savedTrips);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSingleTripFromAllTrips = (savedTripId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/allTrips/${savedTripId}.json`)
      .then((res) => {
        let singleTrip = {};
        if (res.data !== 'null') {
          res.data.id = savedTripId;
          singleTrip = res.data;
        }
        resolve(singleTrip);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllSavedTrips = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/savedTrips.json`)
      .then((res) => {
        const allSavedTrips = [];
        if (res.data !== 'null') {
          Object.keys(res.data).forEach((fbKey) => {
            res.data[fbKey].id = fbKey;
            allSavedTrips.push(res.data[fbKey]);
          });
        }
        resolve(allSavedTrips);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

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

const removeTrip = (tripId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/savedTrips/${tripId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateIsCompleted = (savedTripId, updatedTripObj) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/savedTrips/${savedTripId}.json`, updatedTripObj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  getAllSavedTripsByUid,
  getSavedTripsByUid,
  getSingleTripFromAllTrips,
  getAllSavedTrips,
  saveATrip,
  removeTrip,
  updateIsCompleted,
};
