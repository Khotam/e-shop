import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyChzv3FnvWVWBJxlYaexNWAja6GUKfZxbg',
  authDomain: 'e-shop-3c12a.firebaseapp.com',
  databaseURL: 'https://e-shop-3c12a.firebaseio.com',
  projectId: 'e-shop-3c12a',
  storageBucket: 'e-shop-3c12a.appspot.com',
  messagingSenderId: '1004651480562',
  appId: '1:1004651480562:web:48573d472f2f3c3223d76b',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
