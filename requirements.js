// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBZEKywj_-YkGrmEZDcJny4K55UA4FFnH8",
  authDomain: "tourplanner-c1110.firebaseapp.com",
  databaseURL: "https://tourplanner-c1110.firebaseio.com",
  projectId: "tourplanner-c1110",
  appId: "1:1032902429075:web:eb9b4810628e1b8b",
  storageBucket: "gs://tourplanner-c1110.appspot.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make database References
const db = firebase.database();

//for input values to save to firebase
const form = document.querySelector("#requirement-form");

// Create References
const dbRefObject = firebase.database().ref("Users/");

form.addEventListener('submit', (e) => {
  dbRefObject.set({
    Activities_Preference:{
     Preference: document.querySelector('input[name="activity"]:checked').value
    }
  })
})
