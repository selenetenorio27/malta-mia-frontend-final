import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBczTlKFuVhA9z6QlTZi9hpFF5lt6IbbVA",
  authDomain: "malta-mia.firebaseapp.com",
  projectId: "malta-mia",
  storageBucket: "malta-mia.appspot.com",
  messagingSenderId: "749765586",
  appId: "1:749765586:web:8dce7f83919f95cc373e0b",
  measurementId: "G-0ZE3ETHRGE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
