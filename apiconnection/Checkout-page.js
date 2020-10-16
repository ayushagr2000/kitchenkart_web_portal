var charge=0;
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
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
            
        } else {
          // User not logged in or has just logged out.
        }
    });
    getfirebasecall();
    popular_brand();
    BasketData();
    GetAllProductData();
    ConformOrder();
    Billing_delivery();
    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
    getuserdetails();
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
  if(localStorage.getItem('UserName') && localStorage.getItem('UserId'))
    AddData();
  else {
    window.location.replace("index.htmllogin.html");
  }
}
function AddData() {
    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
  document.getElementById('signoutdiv_firebase').style.display ='block';
  document.getElementById('Logindiv_firebase').style.display ='none';
}

// =============================     Firebase Call =========================================================
async function getfirebasecall() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log("Enter in function");
          if (user) {
            console.log(user.uid);
            document.getElementById('Logindiv_firebase').style.display = "none";
            document.getElementById('signoutdiv_firebase').style.display = "block";
          } else {  
            document.getElementById('Logindiv_firebase').style.display = 'block';
            document.getElementById('signoutdiv_firebase').style.display = 'none';
          }
    });
}
async function logout_firebase() {
    firebase.auth().signOut().then(function() {
        alert("Successfully Logout");
        document.getElementById('Logindiv_firebase').style.display = 'block';
        document.getElementById('signoutdiv_firebase').style.display = 'none';
      }, function(error) {
        // An error happened.
      });
}


// ======================== Firebase Ends =================================

// ======================== Add To Kart ===================================

//=================== Conform Order ========================

async function ConformOrder() {
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart/"+localStorage.getItem('UserId');
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => ConformOrderApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function ConformOrderApi(Data) {
    var Jsondata = JSON.parse(Data);
    document.getElementById('cart-total-res').innerText = Jsondata.response.length;
    document.getElementById('cart-total').innerText = 'Item ' + Jsondata.response.length;
    console.log(Jsondata.response.length);
    console.log(document.getElementById('cart-total-res').innerText);
    var alldata = '';
    var totalprice = 0;
    for(var i = 0; i < Jsondata.response.length; i++){
        alldata += '<tr><td class="text-left">'+Jsondata.response[i].name+'</td><td class="text-left">'+Jsondata.response[i].prod_quan+'</td><td class="text-right">&#8377;'+Jsondata.response[i].sell_price+'</td><td class="text-right">&#8377;'+(Jsondata.response[i].sell_price * Jsondata.response[i].prod_quan)+'</td></tr>';
        totalprice += Jsondata.response[i].sell_price;
    }
    document.getElementById('connformtable').innerHTML = alldata;
    var slab='';
    if (totalprice > 5000) {
        slab = "5000";
      } else if (totalprice > 3000) {
        slab = "3000";
      } else if (totalprice > 2500) {
        slab = "2500";
      } else if (totalprice > 2000) {
        slab = "2000";
      } else if (totalprice > 1800) {
        slab = "1800";
      } else if (totalprice > 1500) {
        slab = "1500";
      } else if (totalprice > 1200) {
        slab = "1200";
      } else if (totalprice > 800) {
        slab = "800";
      } else if (totalprice > 500) {
        slab = "500";
      } else if (totalprice > 300) {
        slab = "300";
      } else {
        slab = "0";
      }
    document.getElementById('subtotal').innerHTML = '&#x20b9; &nbsp;' + totalprice;
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/delivery/"+slab;
    var k;
    fetch(url)
    .then(response => response.text())
    .then(contents => {
        k = JSON.parse(contents);
        console.log(k);
        charge = k.response[0].charge;
        document.getElementById('shipping').innerHTML = '&#x20b9; &nbsp;' + k.response[0].charge;
        document.getElementById('totalval').innerHTML = '&#x20b9; &nbsp;' + (totalprice + k.response[0].charge);
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    
}


//======= Step 1 Billing and Delivery===================

async function Billing_delivery() {
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/address/"+localStorage.getItem('UserId');
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Billing_deliveryAddval(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function Billing_deliveryAddval(data) {
    JsonData = JSON.parse(data);
    document.getElementById('input-payment-firstname').value = localStorage.getItem('UserName');
    document.getElementById('input-payment-address-1').value = JsonData.response[0].add1;
    document.getElementById('input-payment-address-2').value = JsonData.response[0].add2;
    document.getElementById('input-payment-landmark').value = JsonData.response[0].lanmark;
    document.getElementById('input-payment-city').value = JsonData.response[0].city;
    document.getElementById('input-payment-postcode').value = JsonData.response[0].pincode;
    document.getElementById('input-payment-phone').value = JsonData.response[0].phone;
}

//======================================================
//====================== Put Address ===================
async function PutAddress() {
    var mydata = {
        "add1": document.getElementById('input-payment-address-1').value,
        "add2": document.getElementById('input-payment-address-2').value,
        "pincode": document.getElementById('input-payment-postcode').value,
        "city": document.getElementById('input-payment-city').value,
        "landmark": document.getElementById('input-payment-landmark').value,
        "mobile" : document.getElementById('input-payment-phone').value
    }
    
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/address/"+localStorage.getItem('UserId');
    $.ajax({
        url : proxyurl+url,
        type : 'PUT',
        data : JSON.stringify(mydata),
        contentType: 'application/json',
        success : function(result, status) {
           alert('Data Updated');
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
}
//======================================================

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

//=================== Conform Order ====================
async function conformOrder() {
    if(document.getElementById('subtotal').innerHTML === '₹ &nbsp;0'){
        alert("No Item In Cart");
    } else {
        var add1 = document.getElementById('input-payment-address-1').value;
        var add2 = document.getElementById('input-payment-address-2').value;
        var pincode = document.getElementById('input-payment-postcode').value;
        var city = document.getElementById('input-payment-city').value;
        var landmark = document.getElementById('input-payment-landmark').value;
        var mobile = document.getElementById('input-payment-phone').value;
        if(mobile == null || add1 == null || add2 == null || pincode == null || city == null || landmark == null ){
            alert('Enter All Fields');
            console.log(mobile + add1 + add2 + pincode + city + landmark );
        }
        else {
            var mydata = {
                "add1": add1,
                "add2": add2,
                "pincode": pincode,
                "city": city,
                "landmark": landmark
            }
            
            const proxyurl = "";
            const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/address/"+localStorage.getItem('UserId');
            $.ajax({
                url : proxyurl+url,
                type : 'PUT',
                data : JSON.stringify(mydata),
                contentType: 'application/json',
                success : function(result, status) {
                    console.log('Data Updated');
                },
                beforeSend: function(){
                    console.log("Sending...");
                }
            });
            var id = Math.floor((Math.random() * 1000000) + 1);
            var today = new Date(); 
            var dd = today.getDate(); 
            var mm = today.getMonth() + 1; 
            var yyyy = today.getFullYear(); 
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            if (dd < 10) { 
                dd = '0' + dd; 
            } 
            if (mm < 10) { 
                mm = '0' + mm; 
            } 
            var today = dd + '/' + mm + '/' + yyyy; 
            var paymethod = 0;
            var ele = document.getElementsByName('pay'); 
            console.log(ele.length);
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].type="radio") { 
                    if(ele[i].checked) 
                        paymethod = ele[i].value;
                }
            }
            var data = {
                "order_id": id,
                "user_id": localStorage.getItem('UserId'),
                "delivery": charge,
                "timeslot": "1 day",
                "payment_mode": paymethod,
                "user_comment":document.getElementById('usesrComments').value || null,
                "lat": '83.42322',
                "long": '43.4543',
                "add1": add1,
                "add2": add2,
                "landmark":landmark,
                "pincode": pincode,
                "mobile_no": mobile,
                "timestamp": h + ":" + m + ":" + s,
                "order_date": today,
                "promocode": document.getElementById('input-coupon').value,
                "promoline":"NO"
            };
            $.ajax({
                url : proxyurl+'http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/v2/placeorder/',
                type : 'POST',
                data : JSON.stringify(data),
                contentType: 'application/json',
                success : function(result, status) {
                    window.location.href = "order-sucess-page.html?order="+id;
                },
                beforeSend: function(){
                    console.log("Sending...");
                }
            });
        }
    }
}