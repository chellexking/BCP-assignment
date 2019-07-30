
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

//tabs functionalities
				var waveBtn = (function () {
		  'use strict';
		  var btn = document.querySelectorAll('.wave'),
			  tab = document.querySelector('.tab-bar'),
			  indicator = document.querySelector('.indicator'),
			  indi = 0;
		  indicator.style.marginLeft = indi + 'px';

		  for(var i = 0; i < btn.length; i++) {
			btn[i].onmousedown = function (e) {
			  var newRound = document.createElement('div'),x,y;

			  newRound.className = 'cercle';
			  this.appendChild(newRound);

			  x = e.pageX - this.offsetLeft;
			  y = e.pageY - this.offsetTop;

			  newRound.style.left = x + "px";
			  newRound.style.top = y + "px";
			  newRound.className += " anim";

			  indicator.style.marginLeft = indi + (this.dataset.num-1) * 200 + 'px';

			  setTimeout(function() {
				newRound.remove();
			  }, 1200);
			};
		  }
		}());

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
