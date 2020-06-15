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

var hashtagsDiv = document.getElementsByClassName("hashtag")[0];
var hashtags = $(hashtagsDiv).children();
for (i=0; i< hashtags.length; i++){
  hashtags[i].onclick = function() {
    sessionStorage.setItem("Hashtag", this.id);
    sessionStorage.setItem("Hashtag_name", this.innerHTML);
  }
}

var searchbtn = document.getElementsByClassName("searchbtn")[0];
var keyword = document.getElementsByClassName("search")[0];
searchbtn.onclick = function (){
  var key = keyword.value;
  gedSearchedItem(key);
  keyword.value = ""; //clear
}

function gedSearchedItem(key){
  var found = 0
  var productName;
  var content = "";
  firebase.database().ref().once('value').then(function(snapshot) {

    var data = snapshot.val();
    for (i = 0 ; i < data.length; i++){
      productName = data[i].Name;

      if (productName.includes(key)) {
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
        fount = 1;
      }
    }
    document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
    if (found == 0) {
      alert("No such item.");
    }
  });

}
