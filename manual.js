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

// Returns the signed-in user's display name.
function getUserName() {
 return firebase.auth().currentUser.displayName;
}

function getUserUid(){ //현재 로그인 한 유저의 uid 불러오기
  return firebase.auth().currentUser.uid;
}
// Returns true if a user is signed-in.
function isUserSignedIn() {
return !!firebase.auth().currentUser;
}

$('.carousel').carousel({ interval: 10000
})

function fnMove(seq){
var offset = $("#div" + seq).offset();
$('html,body').animate({scrollTop : offset.top}, 400);
}

function TopMove() {
var offset = $('body').offset();
$('html,body').animate({scrollTop : offset.top}, 400);
}
