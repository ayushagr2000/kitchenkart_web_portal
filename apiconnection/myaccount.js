window.onload = function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem("UserId", user.uid);
            localStorage.setItem("UserNumber", user.phoneNumber);
            UserNumber = user.phoneNumber;
            console.log(user.uid);
            const proxyurl = "";
            const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/"+user.uid;
            fetch(proxyurl + url)
            .then(response => response.text())
            .then(contents => {
                k = JSON.parse(contents);
                console.log(k);
                if(k.response.length === 0)
                    location.replace('login.html');
                else {
                    localStorage.setItem("UserName",k.response[0].name);
                    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+k.response[0].name;
                    document.getElementById('customName').innerHTML = "Welcome "+k.response[0].name;
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
            
        } else {
          // User not logged in or has just logged out.
        }
    });
    getuserdetails();
    popular_brand();
    BasketData();
    GetAllProductData();
    try {
        
    } catch (e) {
        //window.location.replace("login.html");
    }
}

//===============================================

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
  if(localStorage.getItem('UserId') && localStorage.getItem('UserName')){
    AddData();
  }
  else {
    window.location.replace("login.html");
  }
}
function AddData() {
    document.getElementById('mobileLogin').innerHTML = '<a href="MyAccount.html"><i class="fa fa-user"></i>My Account</a>';
    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
    document.getElementById('Logindiv_firebase').style.display ='none';
    document.getElementById('signoutdiv_firebase').style.display ='block';
}
//================================================
