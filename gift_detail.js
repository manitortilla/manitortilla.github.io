initFirebaseAuth();
// Initiate firebase auth.
function initFirebaseAuth() {
 firebase.auth().onAuthStateChanged(authStateObserver);
}

/*
var signOutButtonElement = document.getElementById('logoutbtn');
function signOut() {
 // Sign out of Firebase.
 firebase.auth().signOut();
}
signOutButtonElement.addEventListener('click', signOut);
*/

// Returns true if a user is signed-in.
function isUserSignedIn() {
return !!firebase.auth().currentUser;
}
// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!

 } else { // User is signed out!
   location.href="/index.html";
 }
}

function getItem(productNO){
  var title = document.getElementById("title");
  var name1 = document.getElementsByClassName("product_name")[0];
  var name2 = document.getElementsByClassName("gift_value")[2];
  var img = document.getElementsByClassName("product_img")[0];
  var price = document.getElementsByClassName("product_price")[0];
  var detail = document.getElementsByClassName("product_detail")[0];
  //var hasgtag =
  return firebase.database().ref('/'+ productNO +'/').once('value').then(function(snapshot) {
    var data = snapshot.val(); //불러온 정보(snapshot)을 javascript로 사용할 수 있게 변경

    title.innerHTML = data.Category;
    name1.innerHTML = name2.innerHTML = data.Name;
    img.setAttribute("src", data.Product_img);
    price.innerHTML = "Price : " + data.Price + " won";
    detail.innerHTML = data.Explanation;

  });
}
getItem(1);

$('.product_buybtn').on('click', function(){
    $('#pop').show();
});

$('#close').on('click',function(){
    $('#pop').hide();
});
