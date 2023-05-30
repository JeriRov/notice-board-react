// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDK1HYw8Zhl70lTUsgRL9mwc6Pl-P_IjMk',
  authDomain: 'notice-board-12d9f.firebaseapp.com',
  projectId: 'notice-board-12d9f',
  storageBucket: 'notice-board-12d9f.appspot.com',
  messagingSenderId: '514483764818',
  appId: '1:514483764818:web:f696bae399e1f1960e698b',
  measurementId: 'G-C4T9WMXRR0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
