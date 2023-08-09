import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAbKV5tINcE0QX9YkkTlbk87EcOYHy8cS8",
    authDomain: "student-managment-system-94d9e.firebaseapp.com",
    projectId: "student-managment-system-94d9e",
    storageBucket: "student-managment-system-94d9e.appspot.com",
    messagingSenderId: "202237203709",
    appId: "1:202237203709:web:f601c66b61e08b6ef8da94"
  };

  export const app = initializeApp(firebaseConfig);
  export const Storage = getStorage (app) 