import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDoLA12CGbEbrrfKmSrIBgL6rcdELQxCJQ',
  authDomain: 'positive-thinker-5f4f4.firebaseapp.com',
  databaseURL: 'https://positive-thinker-5f4f4.firebaseio.com',
  projectId: 'positive-thinker-5f4f4',
  storageBucket: 'positive-thinker-5f4f4.appspot.com',
  messagingSenderId: '1095450887786',
  appId: '1:1095450887786:web:a56cf664aa4c7f625d2c13',
  measurementId: 'G-D96PNE0VES',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;