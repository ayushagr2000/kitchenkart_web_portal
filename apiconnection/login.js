window.onload = function() {
    BasketData();
    GetAllProductData();
    firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            document.getElementById('loader').style.display = 'none';
            console.log(user.uid);
            localStorage.setItem("UserId", user.uid);
            localStorage.setItem("UserNumber", user.phoneNumber);
            getuserdetails();
            //window.location.replace("index.html");
          } else {
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    getuserdetails();
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
                signInSuccessUrl: '',
                signInOptions: [
                  {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    recaptchaParameters: {
                      type: 'image', // 'audio'
                      size: 'normal', // 'invisible' or 'compact'
                      badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                    },
                    defaultCountry: 'IN'
                  }
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


function getuserdetails(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem("UserId", user.uid);
      localStorage.setItem("UserNumber", user.phoneNumber);
    }
  });
  const proxyurl = "";
  const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/"+localStorage.getItem('UserId');
  fetch(proxyurl + url)
  .then(response => response.text())
  .then(contents => checkuser(contents))
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
function checkuser(ApiData) {
  jsonApi = JSON.parse(ApiData);
  console.log(jsonApi);
  if(jsonApi.response.length === 0)
    AddData();
  else {
    window.location.replace("index.html");
  }
}
function AddData() {
    
  document.getElementById('loginform').style.display ='none';
  document.getElementById('addDataform').style.display ='block';
}
function AddDataToDatabase() {
  var name = document.getElementById('username').value;
  var email = document.getElementById('useremail').value;
  var reffer = document.getElementById('userreffer').value;
  if(!name || !email)
    alert('Name or Email is not valid');
  else {
    var mydata = {
      name: document.getElementById('username').value,
      email: email,
      phone: localStorage.getItem('UserNumber'),
      auth_id : localStorage.getItem('UserId'),
      reffer : reffer|null
    }
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/";
    $.ajax({
      url : proxyurl+url,
      type : 'POST',
      data : JSON.stringify(mydata),
      contentType: 'application/json',
      success : function(result, status) {
         location.replace('index.html');
      },
      beforeSend: function(){
          console.log("Sending...");
      }
  });
  }
}