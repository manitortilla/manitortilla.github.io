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
  
    var idx = $('.sidebarbtn').index(this);
    $('.detail').hide(); //style="display:none"
    $('.detail').eq(idx).show();
    if (idx == 0){ //편지 읽기 상태에서 메뉴 바꿨을 때 메일함이 디폴트로 올 수 있게
      $('.modal').hide();
      $('.faqlist').show();
    }
});

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    $('#myModal').hide();
  }
}

$('#faqclose').on('click',function(){
    $('#myModal').hide();
});

function showfaqcontent(){
    $('#myModal').show();
}

function submitqna(){
    content= document.getElementById("txt").value;

  var t = new Date(+new Date()+(1000*60*60*9));

  if (content != "") {
    document.getElementById("txt").value = ""; //clear
    alert("Thank you for submit qna. We will answer as soon as possible.");
  }
  else {
    alert ("You can not submit empty QNA writing.");
  }
};
