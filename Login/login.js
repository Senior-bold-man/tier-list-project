const firebaseConfig = {
  apiKey: "AIzaSyCFzO1UN4vuZYDXHRqXWUff5ID9z7_LTlw",
  authDomain: "tier-list-project-82209.firebaseapp.com",
  projectId: "tier-list-project-82209",
  storageBucket: "tier-list-project-82209.appspot.com",
  messagingSenderId: "229212445670",
  appId: "1:229212445670:web:82f6ecd43b6b1594a81427",
  measurementId: "G-EFN7TY2R2X"
};

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const database = firebase.database();

function register(){
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  username = document.getElementById('username').value
}
