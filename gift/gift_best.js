
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

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   document.getElementById("userID").innerHTML = getUserName();

 } else { // User is signed out!
   location.href="/index.html";
 }
}

getBestItem(); //always load items;
var getHT= sessionStorage.getItem("hashtag");
console.log(getHT);
function getBestItem(){
  var img = document.getElementsByClassName("product_img");
  var name = document.getElementsByClassName("product_name");
  var price = document.getElementsByClassName("product_detail");

  var content = "";
  return firebase.database().ref().once('value').then(function(snapshot) {
    var data = snapshot.val();
    for (count = 0, i = 10 ; i < data.length ; i+=11){ //11,22,33,44,55번째 아이템 가져온다
      content +=
      "<tr class='rank_tr' onclick='location.href=\"gift_detail_sender.html\"'> \
          <td class='rank_no'>" + (count+1) + "</td> \
          <td class='product_img'><img src='"+ data[i].Img +"'></td> \
          <td class='product_info'> \
              <table> \
                  <tr class='product_name'><td>" +data[i].Name + "</td></tr> \
                  <tr class='product_detail'><td>" + data[i].Price +" won</td></tr> \
              </table> \
          </td> \
      </tr>";
      count++;
    }
    document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
  });
}
