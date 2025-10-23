// only js for logging in
// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// firebase console config
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Buttons
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userDiv = document.getElementById("user");

// Login
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    alert("Login failed: " + error.message);
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
});

// Track login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    userDiv.textContent = `Hello, ${user.displayName}, welcome to MindNet`;
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userDiv.textContent = "";
  }
});
