// src/js/firebaseInit.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCofT2DVQQ29jf65xWP36ZybPu7gi2BbAw',
  authDomain: 'filmoteka-racoons.firebaseapp.com',
  projectId: 'filmoteka-racoons',
  storageBucket: 'filmoteka-racoons.appspot.com',
  messagingSenderId: '708342982502',
  appId: '1:708342982502:web:b0a7551d6f56e3b2db0aa7',
  measurementId: 'G-GVY8HVRMJQ',
};

const firebaseInstance = initializeApp(firebaseConfig);

export default firebaseInstance;
