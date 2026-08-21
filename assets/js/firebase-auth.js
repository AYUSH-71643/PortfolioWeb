import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcmZiul76XwTMHVSHeLzduXgikmjMf65Q",
  authDomain: "mygamehub-54875.firebaseapp.com",
  projectId: "mygamehub-54875",
  storageBucket: "mygamehub-54875.firebasestorage.app",
  messagingSenderId: "1026052599142",
  appId: "1:1026052599142:web:830198013b24d419edaca7",
  measurementId: "G-8ZT78NX8CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('google-login-btn');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    const userPic = document.getElementById('user-pic');
    const logoutBtn = document.getElementById('logout-btn');

    // Handle Login Button Click
    if(loginBtn) {
        loginBtn.addEventListener('click', () => {
            signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Logged in successfully!", result.user.displayName);
            }).catch((error) => {
                console.error("Error during login:", error.message);
                alert("Login Failed: " + error.message);
            });
        });
    }

    // Handle Logout Button Click
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).catch((error) => {
                console.error("Logout Error:", error);
            });
        });
    }

    // Listen for Authentication State Changes (Updates UI automatically)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            if(loginBtn) loginBtn.style.setProperty('display', 'none', 'important');
            if(userProfile) userProfile.style.display = 'flex';
            if(userName) userName.textContent = user.displayName;
            if(userPic) userPic.src = user.photoURL;
        } else {
            // User is signed out.
            if(loginBtn) loginBtn.style.setProperty('display', 'flex', 'important');
            if(userProfile) userProfile.style.display = 'none';
        }
    });
});
