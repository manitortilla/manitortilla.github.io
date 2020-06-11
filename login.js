/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 // Checks that the Firebase SDK has been correctly setup and configured.
 function checkSetup() {
   if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
     window.alert('You have not configured and imported the Firebase SDK. ' +
         'Make sure you go through the codelab setup instructions and make ' +
         'sure you are running the codelab using \"firebase serve\"');
   }
 }

 // Checks that Firebase has been imported.
 checkSetup();
 initFirebaseAuth();

 var signInButtonElement = document.getElementById('googlelogin');
 function signIn() {
   // Sign into Firebase using popup auth & Google as the identity provider.
   var provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithPopup(provider);
 }
 signInButtonElement.addEventListener('click', signIn);

 function signOut() {
   // Sign out of Firebase.
   firebase.auth().signOut();
 }

 // Initiate firebase auth.
 function initFirebaseAuth() {
   firebase.auth().onAuthStateChanged(authStateObserver);
 }

 function getProfilePicUrl() {
   return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
 }

 // Returns the signed-in user's display name.
 function getUserName() {
   return firebase.auth().currentUser.displayName;
 }

 // Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed in!
    // show the game list
    document.getElementById("userID").innerHTML="Hi, "+getUserName();
    document.getElementsByClassName("login-form")[0].style.display="none";
    document.getElementsByClassName("game-list")[0].style.display="block";
  } else { // User is signed out!
  //  location.href="/index.html";
  }
}


function forgotclicked(){
  alert("Sorry, we are currently preparing for this service");
}
