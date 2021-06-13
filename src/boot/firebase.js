// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
// import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMxDQSieMWVf_NKbENsBCBFf9ovt5gdoI",
  authDomain: "prokc-b6382.firebaseapp.com",
  projectId: "prokc-b6382",
  storageBucket: "prokc-b6382.appspot.com",
  messagingSenderId: "389045095597",
  appId: "1:389045095597:web:df43e69cfd0e889ebc8a24",
  measurementId: "G-KV7LFPVX9Q"
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

let GoogleProvider = new firebase.auth.GoogleAuthProvider();

export { firebaseAuth, GoogleProvider }