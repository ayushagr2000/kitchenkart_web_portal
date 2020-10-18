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
                    // document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+k.response[0].name;
                    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i><a href ="MyAccount.html">'+k.response[0].name+'</a>';
                    document.getElementById('mobileLogin').innerHTML = '<i class="fa fa-user-circle-o"></i>'+k.response[0].name;
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
        displayorderHistory();
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
    window.location.replace("index.htmllogin.html");
  }
}
function AddData() {
    
  document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
  document.getElementById('Logindiv_firebase').style.display ='none';
  document.getElementById('signoutdiv_firebase').style.display ='block';
}
//================================================

//========================= Display Data =====================
async function displayorderHistory() {
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/customer/"+localStorage.getItem('UserId');//+data;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printorderHistory(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function printorderHistory(order) {
    Jsonorder = JSON.parse(order);
    var k = '';
    var tot = 0;
    for(var i = 0; i < Jsonorder.response.length; i++) {
        tot += Jsonorder.response[i].prod_qty * Jsonorder.response[i].prod_price;
        k += '<tr><td class="text-right">#'+Jsonorder.response[i].order_id+'</td><td class="text-left">'+Jsonorder.response[i].customer_name+'</td><td class="text-right">'+Jsonorder.response[i].total_items+'</td><td class="text-left">'+Jsonorder.response[i].status_of_order+'</td><td class="text-right">&#8377;&nbsp;'+Jsonorder.response[i].total_amount+'</td><td class="text-left">'+Jsonorder.response[i].order_date+'</td><td class="text-right"><a href="order-history-detail.html?order='+Jsonorder.response[i].order_id+'" data-toggle="tooltip" title="" class="btn btn-info" data-original-title="View"><i class="fa fa-eye"></i></a></td></tr>';
    }
    document.getElementById('Order-history-tborder').innerHTML = k;
}

//==============================================================