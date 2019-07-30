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
const form = document.querySelector("#place-search-form");
const form1 = document.querySelector("#requirement-form")
const form2 = document.querySelector("#diet-Preference");
const form3 = document.querySelector("#language-Preference");
const form4 = document.querySelector("#special-Needs");

// Create References
const dbRefObject = firebase.database().ref("Users/Location_Date");
const dbRefObject1 = firebase.database().ref("Users/Activity");
const dbRefObject2 = firebase.database().ref("Users/Diet");
const dbRefObject3 = firebase.database().ref("Users/Language");
const dbRefObject4 = firebase.database().ref("Users/Special_Needs");

function submitLocation_Date(){
  form.addEventListener('submit', (e) => {
   dbRefObject.set({
            Place: form.location.value,
            Date_Start: form.startDate.value,
            Date_End: form.endDate.value
   })
  })
}

function submitLocationActivity(){
  form1.addEventListener('submit', (e) => {
   dbRefObject1.set({
          Activity_Preference: document.querySelector('input[name="activity"]:checked').value
   })
  })
}

function submitDiet() {
  form2.addEventListener('submit', (e) => {
    dbRefObject2.set({
          Diet_Preference: document.querySelector('input[name="meal"]:checked').value
    })
  })
}

function submitLanguage(){
  var e = document.getElementById("favlang");
  var language = e.options[e.selectedIndex].value;

  form3.addEventListener('submit', (e) => {
    dbRefObject3.set({
           Language_Preference:language
    })
  })
}

function submitSpecialNeeds(){
  form4.addEventListener('submit', (e) => {
    dbRefObject4.set({
           Special_Needs:document.querySelector('.specialNeeds:checked').value
    })
  })
}
