// var qs = (function(a) {
//     if (a == "") return {};
//     var b = {};
//     for (var i = 0; i < a.length; ++i)
//     {
//         var p=a[i].split('=', 2);
//         if (p.length == 1)
//             b[p[0]] = "";
//         else
//             b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
//     }
//     return b;
// })(window.location.search.substr(1).split('&'));

// window.alert(qs["location"]);
// const place = qs["location"];
// const startDate = qs["startDate"];
// const endDate = qs["endDate"];

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

// Create References
const dbRefObject = firebase.database().ref("Users/Location_Date");
const dbRefObject1 = firebase.database().ref("Users/Activity");
const dbRefObject2 = firebase.database().ref("Users/Diet");

function submitLocation_Date(){
  form.addEventListener('submit', (e) => {
   dbRefObject.set({
         Location_Date:{
            Place: form.location.value,
            Date_Start: form.startDate.value,
            Date_End: form.endDate.value
      }
   })
  })
}

function submitLocationActivity(){
  form1.addEventListener('submit', (e) => {
   dbRefObject1.set({
         Activities_Preference:{
          Preference: document.querySelector('input[name="activity"]:checked').value
     }
   })
  })
}

function submitDiet() {
  form2.addEventListener('submit', (e) => {
    dbRefObject2.set({
          Diet_Preference:{
           Preference: document.querySelector('input[name="meal"]:checked').value
      }
    })
  })
}
