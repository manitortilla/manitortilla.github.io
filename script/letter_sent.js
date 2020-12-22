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
   firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
    if (doc.data().status=="ready"){
      alert("아직 게임이 시작되지 않아 사용할 수 없습니다.");
      location.href="../index.html";
    }
  });
   document.getElementById("userID").innerHTML = getUserName();
   getSent();
 } else { // User is signed out!
   location.href="../index.html";
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
  document.getElementsByClassName('popcontent')[0].innerHTML = "The letter is canceled.";
  $('.buttonwrap').hide();
});


// - Sent Tab
function getSent(){
  //load the letter user sent
  var count = 0;
  var divHTML =""; 
  var conHTML ="";
  var manito;
  firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
    manito=doc.data().manitoof;
    firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).collection(manito).get().then(function(querySnapshot) {
      querySnapshot.forEach((doc) => { 
        divHTML += "<div><button class='letter sent' id='"+count+"'><i class='fas fa-sticky-note'></i></button></div>";
        conHTML += "<p class='letterdisplay " +count +"'>"+doc.data().contents+"<br>"+doc.data().servertime+"</p>";
        count++;
    });
      if (divHTML=="")
        divHTML = "<p>작성한 편지가 없습니다.</p>";
      document.getElementById("myMailbox").innerHTML += divHTML;
      document.getElementById("myModalDiv").innerHTML += conHTML;
  
      var letters = document.getElementsByClassName("sent");
      // Attach onclick handler - make letter a button
      for (i=0; i<letters.length; i++) {
        letters[i].addEventListener('click', function(){
          loadSentLetter(this.id);
          document.getElementById("myModal").style.display = "block";
        });
      }
  
      // Modal
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
          var modal = document.getElementById("myModal");
          modal.style.display = "none";
          $('#myModalDiv .on').removeClass('on'); // 활성화된 modal content 삭제
        }
      }
      // modal close
      document.getElementById("letterclose").onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";  
        $('#myModalDiv .on').removeClass('on'); // 활성화된 modal content 삭제
      };
    });
  });
}

function loadSentLetter(id) {
    var targetButton = document.getElementsByClassName(id)[0]; //같은 번호 가진 modal 찾기
    $(targetButton).addClass(' on');
}



// 2) Writing letter
// Saves a letter to Cloud Firestore database.
function sendLetter() {
  // Add a new login info entry to the database.
  content= document.getElementById("txt").value;

  document.getElementsByClassName('popcontent')[0].innerHTML = "편지가 성공적으로 전송되었습니다."; //when user cancel sending previously, re-show the message.
  $('.buttonwrap').show();
  if (content != "") {
    document.getElementById("txt").value = ""; //clear
    $('#pop').show();
    
    firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
      manito = doc.data().manitoof;
      t= new Date();
      console.log(t.getTime().toString());
      return firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).collection(manito).doc(t.getTime().toString()).set({
        sender: getUserUid(),
        contents: content,
        read: false,
        servertime: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }
  else {
    alert ("내용을 입력하세요.");
  }
}
/*
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
*/