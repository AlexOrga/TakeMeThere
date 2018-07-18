import firebase from 'firebase';

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

const signOut = () => {
  return firebase.auth().signOut();
};

const getUID = () => {
  return firebase.auth().currentUser.uid;
};

export default {
  registerUser,
  loginUser,
  signOut,
  getUID,
};
