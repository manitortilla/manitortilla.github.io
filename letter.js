initFirebaseAuth();
// Initiate firebase auth.
function initFirebaseAuth() {
 firebase.auth().onAuthStateChanged(authStateObserver);
}

var signOutButtonElement = document.getElementById('logoutbtn');
function signOut() {
 // Sign out of Firebase.
 firebase.auth().signOut();
}
signOutButtonElement.addEventListener('click', signOut);

function getProfilePicUrl() {
 return firebase.auth().currentUser.photoURL;
}

// Returns the signed-in user's display name.
function getUserName() {
 return firebase.auth().currentUser.displayName;
}


// Returns true if a user is signed-in.
function isUserSignedIn() {
return !!firebase.auth().currentUser;
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
 if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
   return url + '?sz=50';
 }
 return url;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   // Get the signed-in user's profile pic and name.
 //  var profilePicUrl = getProfilePicUrl();
 //  var url = addSizeToGoogleProfilePic(profilePicUrl);

 //  document.getElementById("userpic").setAttribute("src", url);
   document.getElementById("userID").innerHTML = getUserName();
 } else { // User is signed out!
   location.href="/index.html";
 }
}

// sidebar menu toggle
$('.sidebarbtn').on('click', function(){
  //sidebarbtn color update
  $('.sidebarbtn').removeClass('on');
  $(this).addClass('on');

  //show the related content
  var idx = $('.sidebarbtn').index(this);
  $('.detail').hide(); //style="display:none"
  $('.detail').eq(idx).show();
  if (idx == 0){ //편지 읽기 상태에서 메뉴 바꿨을 때 메일함이 디폴트로 올 수 있게
    $('.lettercontent').hide();
    $('.mailbox').show();
  }
});


//load letter
var letters = document.getElementsByClassName("letter ");
for (i=0; i< letters.length; i++){
  letters[i].onclick = function() {
    document.getElementsByClassName("pad")[0].style.display = "none";
    document.getElementsByClassName("mailbox")[0].style.display = "none";
    document.getElementsByClassName("lettercontent")[0].style.display = "block";
  //  document.getElementById("letterdisplay").innerHTML = "편지내용";
    if ($(this).hasClass('new')){ //if it is a new letter, update as read
      $(this).removeClass(' new');
      $(this).addClass(' old');
      $(this).html('<i class="fas fa-envelope-open"></i>');
    }
  }
};

//load mailbox
document.getElementById("letterclose").onclick = function() {
  document.getElementsByClassName("lettercontent")[0].style.display = "none";
  document.getElementsByClassName("mailbox")[0].style.display = "grid";
  document.getElementsByClassName("pad")[0].style.display = "block";
};

// Saves a letter to Cloud Firestore database.
function sendLetter() {
  // Add a new login info entry to the database.
  content= document.getElementById("txt").value;

  if (content != "") {
    document.getElementById("txt").value = ""; //clear
    alert ("Letter has been sent");
    return firebase.firestore().collection('letter').add({
      userID: getUserName(),
      contents: content
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }
  else {
    alert ("You cannot sent an empty letter");
  }
}
