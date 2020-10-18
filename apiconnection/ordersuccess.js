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
    if(localStorage.getItem('UserName'))
        document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
    popular_brand();
    BasketData();
    getuserdetails();
    GetAllProductData();
    try {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        console.log(data.order);
        displayorder(data.order);
        displayorderItems(data.order);
    } catch (e) {
        window.location.replace("index.html");
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
  if(localStorage.getItem('UserId') && localStorage.getItem('UserName'))//585230
    AddData();
  else {
    window.location.replace("index.html");
  }
}
function AddData() {
  document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
  document.getElementById('Logindiv_firebase').style.display ='none';
  document.getElementById('signoutdiv_firebase').style.display ='block';
}
//================================================

//========================= Display Data =====================
async function displayorder(data) {
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/id/"+data;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printorder(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function printorder(details){
    details = JSON.parse(details);
    document.getElementById('orderid_date').innerHTML = '<b>Order ID:</b> #'+details.response[0].order_id+'<br><b>Date Added:</b>'+details.response[0].order_date;
    document.getElementById('shipp_payment').innerHTML = ' <b>Payment Method:</b> '+details.response[0].mode_of_payment+'<br><b>Shipping Charge:&nbsp;</b>&#8377;'+details.response[0].delivery_charge;
    document.getElementById('order_shipping').innerHTML = details.response[0].add1+'<br>'+details.response[0].add2+'<br>'+details.response[0].landmark+'<br>'+details.response[0].pincode+'<br>'+details.response[0].mobile_number;
    document.getElementById('order_payment').innerHTML = details.response[0].add1+'<br>'+details.response[0].add2+'<br>'+details.response[0].landmark+'<br>'+details.response[0].pincode+'<br>'+details.response[0].mobile_number;
    
}
//============================================================

//==================Order Table ================================
async function displayorderItems(id){
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/items/"+id;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => ordertable(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function ordertable(order) {
    Jsonorder = JSON.parse(order);
    console.log(Jsonorder.response.length);
    var k = '';
    var tot = 0;
    for(var i = 0; i < Jsonorder.response.length; i++) {
        tot += Jsonorder.response[i].prod_qty * Jsonorder.response[i].prod_price;
        k += '<tr><td class="text-left">'+Jsonorder.response[i].prod_name+'<br>&nbsp;<small> - Packet Size: '+Jsonorder.response[i].size+'</small> </td><td class="text-left">'+Jsonorder.response[i].prod_qty+'</td><td class="text-right">&#8377;'+Jsonorder.response[i].prod_price+'</td><td class="text-right">&#8377;'+(Jsonorder.response[i].prod_qty * Jsonorder.response[i].prod_price)+'</td><td class="text-right" style="white-space: nowrap;"> <a href="#" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Reorder"><i class="fa fa-shopping-cart"></i></a> <a href="#" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Return"><i class="fa fa-reply"></i></a></td></tr>';
    }
    document.getElementById('productdetails').innerHTML = k;
    document.getElementById('subtot').innerHTML = '&#8377; '+tot;
    document.getElementById('shippingcharge').innerHTML = '&#8377; '+30;
    document.getElementById('total').innerHTML = '&#8377; '+ (tot+30);
}
//==============================================================