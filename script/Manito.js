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
    if (doc.data().status=="on")
     updateGameInfo();
    else
      finalGameInfo();
   var url = getProfilePicUrl();

   document.getElementById("userpic").setAttribute("src", url);
   document.getElementById("userID").innerHTML = getUserName();
   document.getElementById("userID2").innerHTML = getUserName();
   });
   //because it is not reveal day, removed user name and pic in guess columns.
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

function subfunc(targetId, targetPic, targetName){

  var html="";
    firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
      manito=doc.data().manitois;
    }).then(function(){
    firebase.firestore().collection('userlist').doc(manito).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
      manito_pic=doc.data().pic;
      manito_name=doc.data().name;
    }).then(function(){
   // firebase.firestore().collection('userlist').doc(manito).get().then(function(doc){
//console.log(doc.data().pic);
      html += "<div class='titem'><div class='resultblock_name'><div class='smallprofile'><img id='userpic2' src='"+getProfilePicUrl()+"'><span id='userID3'>"+getUserName()+"</span></div></div></div>\
    <div class='titem'><div class='resultblock_guess'><div class='smallprofile' id='manitoprofile2'><img src='"+targetPic+"'><span>"+targetName+"</span></div></div></div>\
    <div class='titem'><div class='resultblock_manito'><div class='smallprofile'><img src='"+manito_pic+"'><span>"+manito_name+"</span></div></div></div>";
      if (manito == targetId)
        html+="<div class='titem'><div class='resultblock_hit'><img src='../images/check.png'></div></div>";
      else
      html+="<div class='titem'><div class='resultblock_hit'><img src='../images/xmark.png'></div></div>";
      while (html=="");
    }); }).then(function(){console.log(html);
      return html;});
    
}
function submitGuess(targetId, targetPic, targetName){
  firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).update({
    manitoguess: targetId
  }).then(function(){
    location.reload();
  });
}
$('.guessuserbutton').on('click',function(){
    const result = confirm('선택하겠습니까?');
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

function updateGameInfo() {
  url='https://embodiedfacilitator.com/wp-content/uploads/2018/05/human-icon-png-1901.png';
  firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
    myGuess=doc.data().manitoguess;

    firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
      var playerslist = doc.data().players;
      if (myGuess=="")
        $('#manitoprofile').html("<img src='"+url+"'><div>???</div>");
      else { 
        $('#guessingbutton').hide();
      }
      for (i=0; i<playerslist.length; i++) {
        // 결과 메뉴
        document.getElementById("name").innerHTML +=
        "<div class='smallprofile'><img id='userpic2' src='"+playerslist[i]['pic']+"'><span id='userID3'>"+playerslist[i]['username']+"</span></div>";
        document.getElementById("guess").innerHTML +=
        "<div class='smallprofile' id='manitoprofile2'><img src='"+url+"'><span>???</span></div>";
        document.getElementById("manito").innerHTML +=
        "<div class='smallprofile'><img src='"+url+"'><span>???</span></div>";
        document.getElementById("answer").innerHTML +=
        "<span>???</span>";
        
        // 추측 선택 메뉴
        if (getUserUid()==playerslist[i]['uid']) continue;
        document.getElementById("guessuserlist").innerHTML+=
          "<div class=pad2><div id='guessprofile1'class='guessprofile'>\
              <div class='pad2_img'>\
                  <img src='"+playerslist[i]['pic']+"'>\
              </div> \
              <div class='pad2_name'>"+playerslist[i]['username']+"</div><br>\
              </div>\
              <div class='pad2_btn'>\
                  <button class='guessuserbutton' onClick='submitGuess(\""+playerslist[i]['uid']+"\",\""+playerslist[i]['username']+"\",\""+ playerslist[i]['pic']+"\")'> 선택 </button>\
              </div>\
          </div>"; 
        if (myGuess == playerslist[i]['uid']){
            $('#manitoprofile').html("<img src='"+playerslist[i]['pic']+"'><div>"+playerslist[i]['username']+"</div>");
          }
        }
      
    });
  
  });
}

function finalGameInfo(){
  $('#guessingbutton').hide();
  $('#alerevealday').hide();

  url='https://embodiedfacilitator.com/wp-content/uploads/2018/05/human-icon-png-1901.png';
  newHTML="";
  firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
    manitoguess= doc.data().manitoguess;
    if (manitoguess == "")
      $('#manitoprofile').html("<img src='"+url+"'><div>???</div>");
    else
    firebase.firestore().collection('userlist').doc(manitoguess).get().then(function(doc){
      $('#manitoprofile').html("<img src='"+doc.data().pic+"'><div>"+doc.data().username+"</div>");
    });
  });

  firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
    var playerslist = doc.data().players;
    // 결과 메뉴
    for (i=0; i<playerslist.length; i++) {
      document.getElementById("name").innerHTML +=
      "<div class='smallprofile'><img id='userpic2' src='"+playerslist[i]['pic']+"'><span id='userID3'>"+playerslist[i]['username']+"</span></div>";

      firebase.firestore().collection('userlist').doc(playerslist[i]['uid']).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
        manitoguess= doc.data().manitoguess;
        manitois= doc.data().manitois;

        if (manitoguess == "")
          $('#manitoprofile').html("<img src='"+url+"'><div>???</div>");
        else
        firebase.firestore().collection('userlist').doc(manitoguess).get().then(function(doc){
          document.getElementById("guess").innerHTML +=
              "<div class='smallprofile' id='manitoprofile2'><img src='"+doc.data().pic+"'><span>"+doc.data().username+"</span></div>";
        });

        firebase.firestore().collection('userlist').doc(manitois).get().then(function(doc){
          document.getElementById("manito").innerHTML +=
          "<div class='smallprofile'><img src='"+doc.data().pic+"'><span>"+doc.data().username+"</span></div>";
        });
        if (manitois == manitoguess)
          document.getElementById("answer").innerHTML += "<div><img src='../images/check.png'></div>";
        else
          document.getElementById("answer").innerHTML += "<div><img src='../images/xmark.png'></div>";

      });
    }

  });
}