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

function getDate(){
  var date = new Date();
  var year = date.getFullYear();
  var month = new String(date.getMonth()+1);
  var day = new String(date.getDate());

  // 한자리수일 경우 0을 채워준다.
  if(month.length == 1){
    month = "0" + month;
  }
  if(day.length == 1){
    day = "0" + day;
  }
  return year+"-"+month+"-"+day;
}


function updateGameInfo(){
  var today = getDate();
  var enddate;
  var diff;
  var manito;
  firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
    enddate = doc.data().enddate;
    diff =  Math.floor( (Date.parse(enddate.replace(/-/g,'\/')) - Date.parse(today.replace(/-/g,'\/'))) / 86400000);
    document.getElementById("Dday").innerHTML = "D-Day : " + diff;
   
    manito = doc.data().players;
    manito = manito[1]; //나 다음에 썼던 사람으로 마니또 픽스
    document.getElementById("manito").innerHTML = manito;
  });

}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   // Get the signed-in user's profile pic and name.
   document.getElementById("userID").innerHTML = getUserName();
   document.getElementById("userID2").innerHTML = getUserName();
   updateGameInfo();
 } else { // User is signed out!
   location.href="/index.html";
 }
}

function getManito(){
  return firebase.firestore().collection("gamelist").add({
    gamename: name,
    enddate: document.getElementById("gamedate").value,
    players: getUserUid()+', '+ ids
  }).then(function(doc) {
      userdataUpdate(name, doc.id);
  }).catch(function(error) {
    console.error('Error writing new message to database', error);
  });
}

function readmore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
  dots.style.display = "inline";
  btnText.innerHTML = "Read more";
  moreText.style.display = "none";
  } else {
  dots.style.display = "none";
  btnText.innerHTML = "Read less";
  moreText.style.display = "inline";
  }
}
