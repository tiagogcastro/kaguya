import { FirebaseOptions, initializeApp } from "firebase/app";
import {
    AuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    getAuth
} from 'firebase/auth';

type ProviderName = 'google' | 'github'

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

console.log({
    firebaseConfig
})

const firebaseApp = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

const providers: Record<ProviderName, AuthProvider> = {
    github: githubAuthProvider,
    google: googleAuthProvider,
}

const getProvider = (providerName: ProviderName) => providers[providerName]

const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth, getProvider };
