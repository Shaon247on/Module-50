// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLOLOqiD3e4007eqM5s9wOOnX4yGne_Is",
  authDomain: "module-50-bc77a.firebaseapp.com",
  projectId: "module-50-bc77a",
  storageBucket: "module-50-bc77a.appspot.com",
  messagingSenderId: "690986159912",
  appId: "1:690986159912:web:c6c62fe164368023fc0a1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
