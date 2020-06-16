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

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   document.getElementById("userID").innerHTML = getUserName();

 } else { // User is signed out!
   location.href="/index.html";
 }
}

var menu_cate = document.getElementsByClassName("menu_cate");
for (i = 0; i < menu_cate.length; i++) {
  menu_cate[i].addEventListener('click',function(){
    getItem(this.id);
  });
}

getItem(0); //always starts from category All

function getItem(categoryNO){
  var content = "";

  var title = document.getElementById("category_title"); //navigation bar
  var img = document.getElementsByClassName("product_img");
  var name = document.getElementsByClassName("product_name");
  var price = document.getElementsByClassName("product_detail");

  title.innerHTML = document.getElementById(categoryNO).innerHTML; //category name
  var nav_parent = document.getElementsByClassName("subt")[0].innerHTML;
  sessionStorage.setItem("Nav_parent", nav_parent);

  if (categoryNO  == 0 ) { //if "all"
    return firebase.database().ref().once('value').then(function(snapshot) {
      var data = snapshot.val();
      for (i = 0 ; i < data.length; i++){
        content +=
        "<tr class='rank_tr' \
         onclick='sessionStorage.setItem(\"Product_no\", " + data[i].Product_no +
         "); location.href=\"gift_detail_sender.html\"'> \
            <td class='rank_no'>" + (i+1) + "</td> \
            <td class='product_img'><img src='"+ data[i].Img +"'></td> \
            <td class='product_info'> \
                <table> \
                    <tr class='product_name'><td>" +data[i].Name + "</td></tr> \
                    <tr class='product_detail'><td>" + data[i].Price +" won</td></tr> \
                </table> \
            </td> \
        </tr>";
      }
      document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
    });
  }
  else { //not "all"
    return firebase.database().ref().orderByChild('Category_no').equalTo(Number(categoryNO)).once('value', function(snapshot){
      var data = snapshot.val();
      data = Object.values(data); //data가 object형으로 나오니까 array로 바꿔주는 것

      for (i = 0 ; i < data.length; i++){
        content +=
        "<tr class='rank_tr' \
          onclick='sessionStorage.setItem(\"Product_no\", " + data[i].Product_no +
        "); location.href=\"gift_detail_sender.html\"'> \
            <td class='rank_no'>" + (i+1) + "</td> \
            <td class='product_img'><img src='"+ data[i].Img +"'></td> \
            <td class='product_info'> \
                <table> \
                    <tr class='product_name'><td>" +data[i].Name + "</td></tr> \
                    <tr class='product_detail'><td>" + data[i].Price +" won</td></tr> \
                </table> \
            </td> \
        </tr>";
      }
      document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
    });
  }
}
