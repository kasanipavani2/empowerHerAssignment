// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBetTrxvC0ljRUGIofuRyXhCe7_pLGJ7g",
  authDomain: "time-tracker-app-5c077.firebaseapp.com",
  projectId: "time-tracker-app-5c077",
  storageBucket: "time-tracker-app-5c077.firebasestorage.app",
  messagingSenderId: "701042489264",
  appId: "1:701042489264:web:37754ddec1810d5a74c875",
  measurementId: "G-YEJBR617KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);