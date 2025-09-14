  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAJKaBhML-9fJVrdfECgLs_txj-8cQuOYY",
    authDomain: "mindnet-167eb.firebaseapp.com",
    projectId: "mindnet-167eb",
    storageBucket: "mindnet-167eb.firebasestorage.app",
    messagingSenderId: "1002224507298",
    appId: "1:1002224507298:web:3186bfe6820e1272b17afb",
    measurementId: "G-WEF2F53JE1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
