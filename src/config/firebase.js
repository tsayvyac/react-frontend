// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyClK4fF0-fOrs_Acg8QMRT1YMw0r2sXSwk',
    authDomain: 'ctu-nss.firebaseapp.com',
    databaseURL: 'https://ctu-nss-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'ctu-nss',
    storageBucket: 'ctu-nss.appspot.com',
    messagingSenderId: '441926160180',
    appId: '1:441926160180:web:0b4191a9259b6934bddf61'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
