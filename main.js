
//Configuration for information retrieval on pages from firebase real-time database
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

var ref = db.ref('Users/Location_Date');
ref.on('value', gotData, errData);

function gotData(data){
  console.log(data.val());
  var info = data.val();
  window.place = info.Place; //make global variable for place
  console.log(place);
  document.getElementById("Place").innerHTML= "in " + place;

  window.startDate = Date.parse(info.Date_Start);
  window.endDate = Date.parse(info.Date_End);
  var dateDiff = Math.floor((endDate-startDate)/(1000*60*60*24));
  console.log(dateDiff);
  document.getElementById("Days").innerHTML=  dateDiff + " Days";
}

function errData(err){
  console.log("Error!");
  console.log(err);
}

//this is to store data into databaseURL//for input values to save to firebase
const form = document.querySelector("#tourGuide-booking-form");

//create References
const refObj = firebase.database().ref("Tour Guide/Booking");

//now the function begins
function submitBooking(){
  var e = document.getElementById("noPeople");
  var no_People = e.options[e.selectedIndex].value;
  var ee = document.getElementById("favlang");
  var favLang = ee.options[ee.selectedIndex].value;

  form.addEventListener('submit', (e) => {
    refObj.set({
      No_of_People: no_People,
      Preferred_Language: favLang,
      Transportation: document.querySelector('input[name="transport"]:checked').value,
      First_Name: form.firstname.value,
      Last_Name: form.lastname.value,
      Email: form.email.value,
      Contact: form.contact.value
    })
  })
}



//this is to retrieve data for tourist destination

  firebase.database().ref("Kuala Lumpur/Attractions/Popular").on('value', function(snap){
     snap.forEach(function(childNodes){
        var childKey = childNodes.key;
        console.log(childKey);
        var div = document.createElement('div');
        div.className = 'card col-lg-4 col-md-6';
        document.getElementById('placeCard').appendChild(div);
        div.appendChild(document.createTextNode(childKey));

        // document.getElementById('titlePlace').appendChild(div);

    });
  });


//this is for tourGuide form functionalities
$(document).ready(function() {
	//MODALS
	//OPEN
	$("body").on("click", ".modal_open", function(e) {
		e.preventDefault();
    $(".modal_main").addClass("active");
		$(".modal_overlay").addClass("active");
    getDates(startDate,endDate);
	});
	//CLOSE
	$("body").on("click", ".modal_overlay", function(e) {
		e.preventDefault();
		$(".modal_overlay").removeClass("active");
		$(".modal_main").removeClass("active");
	});
});

//to get all the dates in between the two dates
function getDates(startDate, stopDate) {
    window.dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    console.log(dateArray);

    var i;
    var text="";
    for (i=0; i<dateArray.length; i++){
      text += dateArray[i] + "<br>";
    }
    document.getElementById("allDates").innerHTML= text;
}

    //this is for the tabs links
    function OpenAttraction(){
      window.location = "attractions.html";}
      function OpenDaybyday(){
      window.location = "daybyday.html";}
      function OpenWheretostay(){
      window.location = "whereToStay.html";}
      function OpenWheretoeat(){
      window.location = "whereToEat.html";}
      function OpenTourguide(){
      window.location = "tourGuide.html";}
      function backToRequirements(){
      window.location = "map.html";}
