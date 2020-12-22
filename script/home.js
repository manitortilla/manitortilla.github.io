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
    document.getElementById("userID2").innerHTML = getUserName();
    updateGameInfo();
  } else { // User is signed out!
    location.href="../index.html";
  }
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
  var gamename;
  firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
    manito=doc.data().manitoof;

    firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).get().then(function(doc){
      if (doc.data().status == "ready"){
        var string= "<p>참가자들을 기다리는 중입니다.<br>현재 참가자 수: "+doc.data().players.length+" 명\
        <br><br>아래 게임 코드를 참가자들에게 공유하세요.<br>"+sessionStorage.gameID+"</p>";
        if (doc.data().manager == getUserUid()){
          string += "<button class='startbtn' onclick='startGame()'>게임 시작</button>";
        }
        document.getElementById("gameInfo").innerHTML = string;
      }
      else if (doc.data().status == "on"){
        enddate = doc.data().enddate;
        diff =  Math.floor( (Date.parse(enddate.replace(/-/g,'\/')) - Date.parse(today.replace(/-/g,'\/'))) / 86400000);
        document.getElementById("Dday").innerHTML = "D-Day : " + diff;
  
        gamename = doc.data().gamename;
        document.getElementById("gamename").innerHTML = gamename ;

        var playerlist = doc.data().players;
        for (i=0; i<playerlist.length; i++){
          document.getElementById("playersInfo").innerHTML += "<p ><span style='color:royalblue'>"+playerlist[i]['username']+"</span>: "+playerlist[i]['uid']+"<br></p>";
        }

        if (manito) {
          document.getElementById("submitbtn").setAttribute("style","background-color: gray");
          document.getElementById("submitbtn").removeAttribute("onClick");
          for (i=0; i<playerlist.length; i++)
              if (playerlist[i]['uid']==manito){
                document.getElementById("manitoInfo").innerHTML = 
                "당신은 <span id='manito' style='color:royalblue'>"+playerlist[i]['username']+"</span>의 마니또입니다.<br>" ;
                break;
              }
        }
        else {
          document.getElementById("manitoInfo").innerHTML = "아래에 마니또 정보를 입력하세요";
        }
        
        if (doc.data().manager == getUserUid()){
          document.getElementById("gameInfo").innerHTML += "<button class='startbtn' onclick='finishGame()'>게임 종료</button>";
        }
      }
      else {
        document.getElementById("gameInfo").innerHTML = "<p>종료된 게임입니다.</p>";
      }
  
    });
  
  });
  
  
}

function startGame(){
  return firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).update({
    status: "on"
  }).then(function(){ location.reload();});
}

function finishGame(){
  return firebase.firestore().collection('gamelist').doc(sessionStorage.gameID).update({
    status: "finished"
  }).then(function(){ location.reload();});
}

function submitManito(){
  var input= document.getElementById("manitoid").value;
  firebase.firestore().collection("userlist").doc(input).collection('game').doc(sessionStorage.gameID).get().then(function(doc){
    if (!doc.exists) {
      alert("잘못된 코드입니다");
      return;
    }
    firebase.firestore().collection('userlist').doc(input).collection('game').doc(sessionStorage.gameID).update({
      manitois: getUserUid()
    });
    
    firebase.firestore().collection('userlist').doc(getUserUid()).collection('game').doc(sessionStorage.gameID).update({
      manitoof: input
    }).then(function(){ 
      location.reload();
    });
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
