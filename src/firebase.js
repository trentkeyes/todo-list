import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCZOtoKNdHzAdIkkgZO2-4L1xD1rQzJzH4',

  authDomain: 'todo-list-2f0ca.firebaseapp.com',

  projectId: 'todo-list-2f0ca',

  storageBucket: 'todo-list-2f0ca.appspot.com',

  messagingSenderId: '1080550763238',

  appId: '1:1080550763238:web:5c4519fd0a31f4a593e927',

  measurementId: 'G-X5E7BJFRJL',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
