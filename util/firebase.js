import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/functions';
import 'firebase/remote-config';
import 'firebase/performance';



export const firebaseConfig = {
  apiKey: "AIzaSyB8DPU6jtXK7iFOFJQ_xuoIeqwYQOOUSas",
  authDomain: "prototype-16d1c.firebaseapp.com",
  databaseURL: "https://prototype-16d1c-default-rtdb.firebaseio.com",
  projectId: "prototype-16d1c",
  storageBucket: "prototype-16d1c.appspot.com",
  messagingSenderId: "411530972461",
  appId: "1:411530972461:web:0de3305a31d4eb7667d7a4",
  measurementId: "G-PJKLSF2521"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const databaseRef = database().ref('/');


// export default firebase;

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);