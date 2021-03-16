import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyA2HvYFuyL6fyCmIcpZkHLnpQAerRMFi3g",
    authDomain: "bt3103-vuejs3-firebase.firebaseapp.com",
    projectId: "bt3103-vuejs3-firebase",
    storageBucket: "bt3103-vuejs3-firebase.appspot.com",
    messagingSenderId: "83135318297",
    appId: "1:83135318297:web:d4e197558429b03d165d88",
    measurementId: "G-G6VFTDMKDC"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;