// src/index.js
console.log('Starting app');

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCofT2DVQQ29jf65xWP36ZybPu7gi2BbAw',
  authDomain: 'filmoteka-racoons.firebaseapp.com',
  projectId: 'filmoteka-racoons',
  storageBucket: 'filmoteka-racoons.appspot.com',
  messagingSenderId: '708342982502',
  appId: '1:708342982502:web:b0a7551d6f56e3b2db0aa7',
  measurementId: 'G-GVY8HVRMJQ',
};

firebase.initializeApp(firebaseConfig);

function getAuth() {
  return firebase.auth();
}

// Auth functions
async function registerUser(email, password, displayName) {
  try {
    const result = await getAuth().createUserWithEmailAndPassword(
      email,
      password
    );
    const user = result.user;

    await user.updateProfile({
      displayName,
    });

    const db = firebase.firestore();
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      displayName: user.displayName,
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const result = await getAuth().signInWithEmailAndPassword(email, password);
    const user = result.user;
    const db = firebase.firestore();
    const userData = await db.collection('users').doc(user.uid).get();
    const userInfo = userData.data();
    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function logoutUser() {
  try {
    await getAuth().signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Toggle forms
function toggleForms() {
  console.log('Toggling forms');
  const loginForm = document.querySelector('#login-form');
  const registerForm = document.querySelector('#register-form');
  const showRegisterFormButton = document.querySelector('#show-register-form');
  const showLoginFormButton = document.querySelector('#show-login-form');

  loginForm.classList.toggle('hidden');
  registerForm.classList.toggle('hidden');
  showRegisterFormButton.parentElement.classList.toggle('hidden');
  showLoginFormButton.parentElement.classList.toggle('hidden');
}

import { getPopularFilms } from './js/api';
import { renderFilmList } from './js/renderFilmList';
import { getSearchMovie, onSearch, addMovie } from './js/search';
import { clickOnFilmCard } from './js/film-modal';
import { playVideoTrailer, getVideoInfo } from './js/trailer';

console.log('firebase', firebase);

export async function addItem() {
  try {
    const email = 'test@example.com'; // Замініть на реальний email
    const password = 'testpassword'; // Замініть на реальний пароль

    // Реєстрація користувача
    const result = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    console.log('User registered:', result.user);

    // Вхід користувача
    const loginResult = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    console.log('User logged in:', loginResult.user);
  } catch (error) {
    console.error('addItem', error);
  }
}

addItem();

const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const showRegisterFormButton = document.querySelector('#show-register-form');
const showLoginFormButton = document.querySelector('#show-login-form');
const logoutButton = document.querySelector('#logout-button');

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  try {
    const userData = await loginUser(email, password);
    console.log('userData', userData);
  } catch (error) {
    console.error('loginForm submit', error);
  }
});

registerForm.addEventListener('submit', async event => {
  event.preventDefault();
  const email = registerForm['register-email'].value;
  const password = registerForm['register-password'].value;
  const displayName = registerForm['register-displayName'].value;
  try {
    await registerUser(email, password, displayName);
    toggleForms();
  } catch (error) {
    console.error('registerForm submit', error);
  }
});

showRegisterFormButton.addEventListener('click', () => {
  toggleForms();
});

showLoginFormButton.addEventListener('click', () => {
  toggleForms();
});

logoutButton.addEventListener('click', () => {
  logoutUser();
});

firebase.auth().onAuthStateChanged(user => {
  const authForm = document.querySelector('#auth-form');
  const loginButton = document.querySelector('#login-button');
  const logoutButton = document.querySelector('#logout-button');

  if (user) {
    console.log('User is signed in');
    console.log('user', user);
    if (logoutButton) {
      logoutButton.classList.remove('visually-hidden');
    }
    if (authForm) {
      authForm.classList.add('visually-hidden');
    }
  } else {
    console.log('User is not signed in');
    if (logoutButton) {
      logoutButton.classList.add('visually-hidden');
    }
    if (authForm) {
      authForm.classList.remove('visually-hidden');
    }
  }
});
