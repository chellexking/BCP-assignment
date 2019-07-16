firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById('user-div').style.display = "block";
    document.getElementById('login-div').style.display = "none";
  } else {
    // No user is signed in.
    document.getElementById('user-div').style.display = "none";
    document.getElementById('login-div').style.display = "block";

  }
});


function login(){
  var userEmail = document.getElementById('email_input').value;
  var password = document.getElementById('password_input').value;

  firebase.auth().signInWithEmailAndPassword(userEmail, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // alert the error
  window.alert('Error:' + errorMessage);
});

}

function logout(){
  firebase.auth().signOut();
  window.alert("Successfully logged out");
}


function register(){
  var userEmail = document.getElementById('email_input').value;
  var password = document.getElementById('password_input').value;
  const signUpForm = document.getElementById('registerForm');

  auth.createUserWithEmailAndPassword(userEmail,password).then(cred => {
    console.log(cred.user);
    window.alert("Account is Successfully Created");
    signUpForm.reset();
  }).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    //alert the error
    window.alert('Error:' + errorMessage);
    signUpForm.reset();
  })
}


function googleSignUp(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    window.alert('Signed in Successfully');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    window.alert('Error' + errorMessage);
  });
}

function facebookSignUp(){
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  window.alert('Signed in Successfully');
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  window.alert('Error' + errorMessage);
});
}
