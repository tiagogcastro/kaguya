import { FirebaseOptions, initializeApp } from "firebase/app";
import {
    AuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    getAuth
} from 'firebase/auth';

type ProviderName = 'google' | 'github'

const firebaseConfig: FirebaseOptions = {
    apiKey: "REDACTED_FIREBASE_WEB_API_KEY",
    authDomain: "kaguya-d4e5a.firebaseapp.com",
    projectId: "kaguya-d4e5a",
    storageBucket: "kaguya-d4e5a.appspot.com",
    messagingSenderId: "916464874763",
    appId: "1:916464874763:web:fabd8808f62acc0fe71e0e",
    measurementId: "G-CVF25EGKVF"
};

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
