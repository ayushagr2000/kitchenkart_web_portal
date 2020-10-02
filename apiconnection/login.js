window.onload = function() {
    BasketData();
    GetAllProductData();
    GetUserId();
    firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            document.getElementById('loader').style.display = 'none';
            console.log(user.uid);
            getuserdetails(user.uid);
            //window.location.replace("index.html");
          } else {
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                  },
                  uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                  }
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: 'login.html',
                signInOptions: [
                  // Leave the lines as is for the providers you want to offer your users.
                  //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                  //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                  //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                  //firebase.auth.EmailAuthProvider.PROVIDER_ID,
                  firebase.auth.PhoneAuthProvider.PROVIDER_ID
                ],
                // Terms of service url.
                tosUrl: 'login.html',
                // Privacy policy url.
                privacyPolicyUrl: 'login.html'
              };
            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
                  }
            });

    // Initialize the FirebaseUI Widget using Firebase.
}

function getuserdetails(id){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/"+id;
  fetch(proxyurl + url)
  .then(response => response.text())
  .then(contents => checkuser(contents, id))
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
function checkuser(ApiData, id) {
  jsonApi = JSON.parse(ApiData);
  console.log(jsonApi);
  if(jsonApi.response.length === 0)
    AddData(id);
  else {
    alert('else');
    //window.location.replace("index.html");
  }
}
function AddData(id) {
  console.log(UserNumber);
  document.getElementById('loginform').style.display ='none';
  document.getElementById('addDataform').style.display ='block';
}
function AddDataToDatabase() {
  var name = document.getElementById('username').value;
  var email = document.getElementById('useremail').value;
  var reffer = document.getElementById('userreffer').value;
  if(!name || !email || !reffer)
    alert('sdfdsf');
  else {
    var mydata = {
      name: UserName,
      email: email,
      phone: UserNumber,
      auth_id : User,
      reffer : reffer
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/";
    $.ajax({
      url : proxyurl+url,
      type : 'POST',
      data : JSON.stringify(mydata),
      contentType: 'application/json',
      success : function(result, status) {
         alert('Success');
      },
      beforeSend: function(){
          console.log("Sending...");
      }
  });
  }
}