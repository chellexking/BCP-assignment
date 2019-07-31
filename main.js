
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


// this is to get data from db for user preferences
var refPreference = firebase.database().ref("Users/");
refPreference.once("value")
  .then(function(snapshot) {
    window.ActivityPreference = snapshot.child("Activity/Activity_Preference").val();
    console.log(ActivityPreference);
    window.cityStandardized = Place.replace(/[^A-Z0-9]+/ig, '-');
  });

  refPreference.once("value")
    .then(function(snapshot) {
      window.Place = snapshot.child("Location_Date/Place").val();
      console.log(Place);
    });


function getAttractions(){
    //this is to retrieve data for tourist attractions

      var destination = "Kuala Lumpur/" + cityStandardized + "/Attractions/"+ActivityPreference;

      firebase.database().ref(destination).on('value', function(snap){
         snap.forEach(function(childNodes){
            var childKey = childNodes.key;
            var childValue = childNodes.val();
            // $(document).ready(function(){
            $("#placeCard").append("<div class=\"card col-lg-4 col-md-6\"> <b>" + childKey
            + " </b> <br> <img class=\"card-img-top\" src=\""
            + childValue
            + "\">"
            + "<div class=\"card-body\"> </div> "
            + "</div>");

            console.log(childValue);
        // });

            // document.getElementById('titlePlace').appendChild(div);
        });
      });
};

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
    $("#itinerary").empty();

    window.dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    console.log(dateArray);

    var text="";
    for (var i=0; i<dateArray.length; i++){
      text = dateArray[i];
      $("#itinerary").append("<div class=\"item\"> <h3> " + text
      + "</h3> <ul style=\"list-style: inside;\">"
      + "<li> Morning </li> <li> Afternoon </li> <li> Evening </li>"
      + "</ul> </div>");
    }
    // document.getElementById("allDates").innerHTML= text;


};

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
