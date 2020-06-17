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


$('.product_buybtn').on('click', function(){
    alert("The present is sent successfully!");
});

$('#close').on('click',function(){
    $('#pop').hide();
});


function getProduct(Product_no){
  document.getElementsByClassName("subt")[0].innerHTML =
      sessionStorage.Nav_parent + "<span>  > </span><p class='product_name'></p>"; //naviagation bar

  var name1 = document.getElementsByClassName("product_name")[0];
  var name2 = document.getElementsByClassName("gift_value")[2];
  var name3 = document.getElementsByClassName("product_name")[1];
  var img = document.getElementsByClassName("product_img")[0];
  var price = document.getElementsByClassName("product_price")[0];
  var detail = document.getElementsByClassName("product_detail")[0];

  return firebase.database().ref(Product_no).once('value').then(function(snapshot) {
    var data = snapshot.val(); //불러온 정보(snapshot)을 javascript로 사용할 수 있게 변경

    name1.innerHTML = name2.innerHTML = name3.innerHTML = data.Name; //상품명
    img.innerHTML = "<img src= \"" + data.Img + "\">";  //이미지
    price.innerHTML = "Price : " + data.Price + " won";
    detail.innerHTML = data.Info;

  });
}
getProduct(sessionStorage.Product_no);

var searchbtn = document.getElementsByClassName("searchbtn")[0];
var keyword = document.getElementsByClassName("search")[0];
searchbtn.onclick = function (){
  var key = keyword.value;
  gedSearchedItem(key);
  keyword.value = ""; //clear
}

function gedSearchedItem(key){
  var found = 0;
  var productName;
  var content = "";
  firebase.database().ref().once('value').then(function(snapshot) {

    var data = snapshot.val();
    for (count= 1, i = 0 ; i < data.length; i++){
      productName = data[i].Name;

      if (productName.includes(key)) {
        content +=
        "<tr class='rank_tr' onclick='sessionStorage.setItem(\"Product_no\", " + data[i].Product_no +
        "); location.href=\"gift_detail_sender.html\"'> \
            <td class='rank_no'>" + count +"</td> \
            <td class='product_img'><img src='" + data[i].Img + "'></td> \
            <td class='product_info'> \
                <table> \
                    <tr class='product_name'><td>" +data[i].Name +"</td></tr> \
                    <tr class='product_detail'><td>" +data[i].Price+" won</td></tr> \
                </table> \
            </td> \
        </tr>";
        found = 1;
        count++;
      }
    }
    if (found == 0) {
      content = "No such item.";
    }
    document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
    $('.wrapper_search').addClass('on');
    $('.wrapper').hide();
    var nav_bar = document.getElementsByClassName('subt')[0];
    nav_bar.innerHTML = "<a href='#' onclick='searchClose();'>Back</a><span> Search: '"+key+"'</span>";
    sessionStorage.setItem("Nav_parent", nav_bar.innerHTML);
  });

}
function searchClose(){
  $('.wrapper_search').removeClass('on');
  $('.wrapper').show();
}
