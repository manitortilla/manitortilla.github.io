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

// Returns true if a user is signed-in.
function isUserSignedIn() {
return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   document.getElementById("userID").innerHTML = getUserName();

 } else { // User is signed out!
   location.href="/index.html";
 }
}
/*
function getHashtagItem(hashtag){
  var hashtag_id = documnet.getElementsByClassName("hash_id")
  var title = document.getElementsByIDName("hashtag_title");
  title[0].innerHTML = sessionStorage.Hashtag_name; //hashtag name
  title[1].innerHTML = sessionStorage.Hashtag_name; //hashtag name

  var nav_parent = document.getElementsByClassName("subt")[0].innerHTML;
  sessionStorage.setItem("Nav_parent", nav_parent);

  var content="";

  firebase.database().ref().orderByChild('Hashtag_no').equalTo(Number(hashtag)).once('value', function(snapshot){
    var data = snapshot.val();
    data = Object.values(data); //data가 object형으로 나오니까 array로 바꿔주는 것
    var content ="";

    for (i = 0 ; i < data.length; i++){
      content +=
      "<tr class='rank_tr' onclick='sessionStorage.setItem(\"Product_no\", " + data[i].Product_no +
      "); location.href=\"gift_detail_sender.html\"'> \
          <td class='rank_no'>" + (i+1) +"</td> \
          <td class='product_img'><img src='" + data[i].Img + "'></td> \
          <td class='product_info'> \
              <table> \
                  <tr class='product_name'><td>" +data[i].Name +"</td></tr> \
                  <tr class='product_detail'><td>" +data[i].Price+" won</td></tr> \
              </table> \
          </td> \
      </tr>";
    }
    document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
  });
}

getHashtagItem(sessionStorage.Hashtag);
*/
function getHashtagItem(hashtag){
    var hashtagID = Number(hashtag) -1; //인덱스 0부터니까
    document.getElementsByClassName('hashtagcontent')[hashtagID].style.display='block';

}
getHashtagItem(sessionStorage.Hashtag);

var nav_bar = document.getElementsByClassName('subt')[0];
var ashtag_name = sessionStorage.Hashtag_name;
nav_bar.innerHTML += '<span id="hashtag_title">'+sessionStorage.Hashtag_name+'</span>';

sessionStorage.setItem("Nav_parent", nav_bar.innerHTML);
