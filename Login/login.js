import { initializeApp } from 'firebase/app';
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      document.getElementById("succLog").style.display = "block";
      document.getElementById("logDiv").style.display = "none";     
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      document.getElementById("succLog").style.display = "none";
      document.getElementById("logDiv").style.display = "block";
    }
  });

function login(){
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error:" + errorMessage);
  });
}


const firebaseConfig = {
    apiKey: "AIzaSyCFzO1UN4vuZYDXHRqXWUff5ID9z7_LTlw",
    authDomain: "tier-list-project-82209.firebaseapp.com",
    projectId: "tier-list-project-82209",
    storageBucket: "tier-list-project-82209.appspot.com",
    messagingSenderId: "229212445670",
    appId: "1:229212445670:web:4db9622673c7f294a81427",
    measurementId: "G-J4SQQT91JB"
};

const app = initializeApp(firebaseConfig);