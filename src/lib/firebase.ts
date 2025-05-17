
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// IMPORTANT: Replace these with your actual Firebase project configuration
const firebaseConfig ={ 
  apiKey:"AIzaSyAlbb11yr0wlJ2vZ-ChLjObEwgZUyh0Be0", 
  authDomain : "alumbra-ai.firebaseapp.com" , 
  projectId : "alumbra-ai" , 
  storageBucket:"alumbra-ai.firebasestorage.app", 
  messagingSenderId:"716058988639", 
  appId:"1:716058988639:web:82df1583bc7c9ebe620bea" 
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
