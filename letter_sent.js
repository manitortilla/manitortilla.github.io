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

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   // Get the signed-in user's profile pic and name.
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

 if (idx==0){ // 편지함 버튼 눌렸을 때
  location.href = location.href; //새로고침
 }

});

//pop x button clicked
$('#popclose').on('click',function(){
  $('#pop').hide();
});
$('#closebtn').on('click',function(){
  $('#pop').hide();
});
$('#undobtn').on('click', function(){
  undo();
  document.getElementsByClassName('popcontent')[0].innerHTML = "The letter is cancled.";
  $('.buttonwrap').hide();
});



// Modal
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    var modal = document.getElementById("myModal");
    var letterdiv = document.getElementsByClassName("letterdiv")[0];
    modal.style.display = "none";
    $(letterdiv).children('.on').removeClass('on'); // 활성화된 modal content 삭제

  }
}
// modal close
document.getElementById("letterclose").onclick = function() {
    var modal = document.getElementById("myModal");
    var letterdiv = document.getElementsByClassName("letterdiv")[0];
    modal.style.display = "none";
    $(letterdiv).children('.on').removeClass('on'); // 활성화된 modal content 삭제

};

// - Sent Tab
function getSent(){
  //load the letter user sent
  var letter_button = "";
  var modal_content = "";
  var count = 0;

  firebase.firestore().collection('gamelist').doc(sessionStorage.gameID)
     .collection('letters').orderBy('servertime','desc') //.get().then(function(snapshot){snapshot.forEach(function(doc) {
     .onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {

        var data = change.doc.data();

        if (change.doc.exists && data.userID == getUserUid()){ //pick only letters I sent
          letter_button  +=
          "<div><button class='letter sent' id='" + count
          + "'><i class='fas fa-sticky-note'></i></button></div>"; //button ID->count
          modal_content +=
          "<p class='letterdisplay " + count +"'>" +
          data.contents + "<br><br>" + data.timestamp + "</p>"; //modal content class-> count

          count++;
        }
    });

   if (letter_button=="")
      letter_button = "<p>You have not sent any letter yet.</p>";

   document.getElementsByClassName("mailbox")[0].innerHTML = letter_button;
   document.getElementsByClassName("letterdiv")[0].innerHTML = modal_content;

    var letters = document.getElementsByClassName("sent");
    // Attach onclick handler - make letter a button
    for (i=0; i<letters.length; i++) {
      letters[i].addEventListener('click', function(){
        loadSentLetter(this.id);
        document.getElementById("myModal").style.display = "block";
      });
    }
  });
}

getSent();

function loadSentLetter(id) {
    var targetButton = document.getElementsByClassName(id)[0]; //같은 번호 가진 modal 찾기
    $(targetButton).addClass(' on');
}


// 2) Writing letter
// Saves a letter to Cloud Firestore database.
// Saves a letter to Cloud Firestore database.
function sendLetter() {
  // Add a new login info entry to the database.
  content= document.getElementById("txt").value;

  var t = new Date(+new Date()+(1000*60*60*9));

 document.getElementsByClassName('popcontent')[0].innerHTML = "Letter is successfully sent."; //when user cancel sending previously, re-show the message.
  $('.buttonwrap').show();

  if (content != "") {
    document.getElementById("txt").value = ""; //clear
    $('#pop').show();

    return firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).collection('letters').add({
      userID: getUserUid(),
      contents: content,
      read: false,
      timestamp: t.getUTCFullYear()+"."+ (t.getUTCMonth()+1) +"."+t.getUTCDate(),
      servertime: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }
  else {
    alert ("You cannot sent an empty letter");
  }
}

function undo(){
  firebase.firestore().collection('gamelist').doc(sessionStorage.gameID)
     .collection('letters').orderBy('servertime','desc').get().then(function(querySnapshot) {
    if (!querySnapshot.empty) {
        //We know there is one doc in the querySnapshot
        const queryDocumentSnapshot = querySnapshot.docs[0];
        return queryDocumentSnapshot.ref.delete();
    } else {
        console.log("No document corresponding to the query!");
        return null;
    }
  });
}
