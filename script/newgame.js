initFirebaseAuth();
// Initiate firebase auth.
function initFirebaseAuth() {
 firebase.auth().onAuthStateChanged(authStateObserver);
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
 } else { // User is signed out!
   location.href="../index.html";
 }
}

initDate();
function initDate(){
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
  var tomorrow = year+"-"+month+"-"+ (Number(day)+1);

  document.getElementById("gamedate").setAttribute("min", tomorrow);

}

function joinGame() {
  gamecode = document.getElementById("gamecode").value;
  if (gamecode != "")
    alert("코드를 입력하세요");
  else
    return firebase.firestore().collection("gamelist").doc(gamecode).get().then(function(doc){
      if (!doc.exists) {
        alert("잘못된 코드입니다");
      }
      else {
        name = doc.data().gamename;
        firebase.firestore().collection("gamelist").doc(gamecode).update({
          players: firebase.firestore.FieldValue.arrayUnion({"uid": getUserUid(), "username": getUserName()})
        }).then(function(){
          userdataUpdate(name, gamecode);
        });
      }
    });
}

// Saves a letter to Cloud Firestore database.
function saveGame() {
  // Add a new login info entry to the database.
  gamename= document.getElementById("gamename").value;
  if (gamename != "")
    dataSave(gamename);
  else
    alert ("You have to fill the contents");

}

function dataSave(name){
  return firebase.firestore().collection("gamelist").add({
    gamename: name,
    enddate: document.getElementById("gamedate").value,
    players: [{"uid":getUserUid(), "username": getUserName()}],
    manager: getUserUid(),
    status: "ready"
  }).then(function(doc) {
      userdataUpdate(name, doc.id);
  }).catch(function(error) {
    console.error('Error writing new message to database', error);
  });
}

//원래는 player마다 게임방 이름 추가해야하지만 여기서는 그냥 현재 유저에만 한다
function userdataUpdate(name, docid){
  firebase.firestore().collection('userlist').doc(getUserUid()).get().then(function(doc){
    if (!doc.exists) //게임 리스트 없으면 새로 시작
      var myGamelist = [];
    else //게임 리스트 있으면 기존 리스트 가져온다
      var myGamelist = doc.data().game;
    myGamelist.push({"name":name, "docid": docid, "manitoof": ""});
    return firebase.firestore().collection("userlist").doc(getUserUid()).set({
      game: myGamelist
    }).then(function() {
      alert(docid);
      location.href='../index.html';
    });
  });
}