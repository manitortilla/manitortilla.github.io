initFirebaseAuth();
// Initiate firebase auth.
function initFirebaseAuth() {
 firebase.auth().onAuthStateChanged(authStateObserver);
}

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

var menu_cate = document.getElementsByClassName("menu_cate");
for (i = 0; i < menu_cate.length; i++) {
  menu_cate[i].addEventListener('click',function(){
    getItem(this.id);
  });
}

getItem(0); //always starts from category All

function getItem(categoryNO){
  var title = document.getElementById("category_title");
  var img = document.getElementsByClassName("product_img");
  var name = document.getElementsByClassName("product_name");
  var price = document.getElementsByClassName("product_detail");

  title.innerHTML = document.getElementById(categoryNO).innerHTML; //category name
  var content = "";

  if (categoryNO  == 0 ) { //if "all"
    return firebase.database().ref().once('value').then(function(snapshot) {
      var data = snapshot.val();
      for (i = 0 ; i < data.length; i++){
        content +=
        "<tr class='rank_tr' onclick='location.href=\"gift_detail.html\"'> \
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
    return firebase.database().ref().once('value').then(function(snapshot) {
      var data = snapshot.val(); //불러온 정보(snapshot)을 javascript로 사용할 수 있게 변경

      var i = 0, count = 0;
      while (data[i] && count < 5) { // 데이터의 끝까지만 검색, 5개까지만 보여줌
        if (data[i].Category_no == categoryNO) {
          content +=
          "<tr class='rank_tr' onclick='location.href=\"gift_detail.html\"'> \
              <td class='rank_no'>" + (count+1) + "</td> \
              <td class='product_img'><img src='"+ data[i].Img +"'></td> \
              <td class='product_info'> \
                  <table> \
                      <tr class='product_name'><td>" +data[i].Name + "</td></tr> \
                      <tr class='product_detail'><td>" + data[i].Price +" won</td></tr> \
                  </table> \
              </td> \
          </tr>";
          "<div class='menu_cate'id=" +Category_no+ " tab_on>"
          count++;
        }
        i++;
      }
      document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
    });
  }
}
