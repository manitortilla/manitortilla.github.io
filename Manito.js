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

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   // Get the signed-in user's profile pic and name.
   var url = getProfilePicUrl();

   document.getElementById("userpic").setAttribute("src", url);
   document.getElementById("userpic2").setAttribute("src", url);
   //document.getElementById("userpic3").setAttribute("src", url);
   //document.getElementById("userpic4").setAttribute("src", url);
   document.getElementById("userID").innerHTML = getUserName();
   document.getElementById("userID2").innerHTML = getUserName();
   document.getElementById("userID3").innerHTML = getUserName();
   //document.getElementById("userID4").innerHTML = getUserName();
   //document.getElementById("userID5").innerHTML = getUserName();
   //because it is not reveal day, removed user name and pic in guess columns.
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
    if (idx == 0){
      $('.manitomain').show();
      $('.guesswindow').hide();
    }
  });

$('#guessingbutton').on('click', function(){
    if($(this).hasClass('guessbtn posi')){
        document.getElementsByClassName("manitomain")[0].style.display = "none";
        document.getElementsByClassName("guesswindow")[0].style.display = "block";
    }

});

$('#guesswindowclose').on('click', function(){
    document.getElementsByClassName("guesswindow")[0].style.display = "none";
    document.getElementsByClassName("manitomain")[0].style.display = "block";
});


$('.guessuserbutton').on('click',function(){
    const result = confirm('Would you choose this one as Manito?');
    if(result){
      var idx = $('.guessuserbutton').index(this);
      var photo_html = $('.guessprofile').eq(idx).html();
      var small_photo =$('.pad2_img').eq(idx).html();
      var small_name = $('.pad2_name').eq(idx).html();
      $('#manitoprofile').removeClass(' empty');
      $('#manitoprofile').html(photo_html);
      $('#manitoprofile2').html(small_photo+small_name);
      $('#guessingbutton').removeClass(' posi');
      $('#guessingbutton').addClass(' nega');
      document.getElementsByClassName("guesswindow")[0].style.display = "none";
      document.getElementsByClassName("manitomain")[0].style.display = "block";
    }
    else{

    }

});

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


function updateDday(){
  var today = getDate();
  var enddate;
  var diff;
  firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
    enddate = doc.data().enddate;
    document.getElementById('revealdate').innerHTML= enddate;
    diff =  Math.floor( (Date.parse(enddate.replace(/-/g,'\/')) - Date.parse(today.replace(/-/g,'\/'))) / 86400000);
    document.getElementById('remainday').innerHTML = diff;
  });
}
updateDday();

function updateGameInfo(){
  var manito;
  firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
   
    manito = doc.data().players;
    document.getElementsByClassName("pad2_name")[0].innerHTML = manito[1];
    document.getElementsByClassName("pad2_name")[1].innerHTML = manito[2];
    document.getElementsByClassName("pad2_name")[2].innerHTML = manito[3];
   
    document.getElementsByClassName("player_name")[0].innerHTML = manito[1];
    document.getElementsByClassName("player_name")[1].innerHTML = manito[2];
    document.getElementsByClassName("player_name")[2].innerHTML = manito[3];


  });

}
updateGameInfo();
