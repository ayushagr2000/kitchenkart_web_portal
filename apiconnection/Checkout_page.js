window.onload = function() {
    getfirebasecall();
    popular_brand();
    BasketData();
    GetAllProductData();
    ConformOrder();
    Billing_delivery();
}


async function GetAllProductData() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => addproductinsearch(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function addproductinsearch(data) {
    APiData = JSON.parse(data);
    var mydata = "";
    for(var i = 0; i < APiData.response.length; i++){
        if(!searchdata.includes(APiData.response[i].name.toUpperCase())){
            mydata += '<li><a href="product_detail_page.html?id='+APiData.response[i].product_id+'"><h5>'+APiData.response[i].name + '</h5></a></li>';
            searchdata.push(APiData.response[i].name.toUpperCase());
            // searchid.push('name');
            //console.log(APiData.response[i].name);
        }
        if(!searchdata.includes(APiData.response[i].category.toUpperCase())){
            mydata += '<li><a href="category_page.html?name='+APiData.response[i].category+'"><h4> '+APiData.response[i].category + '</h4></a></li>';
            searchdata.push(APiData.response[i].category.toUpperCase());
            //searchid.push('name');
        }
        if(!searchdata.includes(APiData.response[i].brand.toUpperCase())){
            mydata += '<li><a href="category_page.html?name=brand-name&id='+APiData.response[i].brand+'"><h4>'+APiData.response[i].brand + '</h4></a></li>';
            searchdata.push(APiData.response[i].brand.toUpperCase());
            //searchid.push('brand');
        }
    }
    document.getElementById('myUL').innerHTML = mydata;
    searchdata.sort();
}

async function getlistdata() {
    if(document.getElementById("search-input").value === ""){
    	document.getElementById("myUL").style.display='none';
    }
    else {
		document.getElementById("myUL").style.display='block';
    }
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

async function checkEnter(k) {
    if(k === 13)
        getdata();    
}

async function getdata() {
    if(searchdata.includes(document.getElementById("search-input").value.toUpperCase())) {
        //location.replace("");
        var indexid = searchdata.indexOf(document.getElementById("search-input").value.toUpperCase());
        if(searchid[indexid] === 'brand'){
            location.replace("category_page.html?name=brand-name&id="+searchdata[indexid]);
        }
        else if(searchdata[indexid] === 'name') {
            location.replace("category_page.html?name="+searchdata[indexid]);
        }
        else{
            location.replace("product_detail_page.html?id="+searchid[indexid]);
        }
    }
    else {
        //alert("Item Not Found");
    }
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

//============Our Popular Brand==============================================
async function popular_brand() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/brand";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => brand(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
async function brand(data) {
    var data_json = JSON.parse(data);
    var k = "<div class='container'><div class='row'>";
    // console.log(data_json.response[0].brand_name);
    // console.log(data_json);

    for(var i = 0; i < data_json.response.length; i++) {
        // console.log(i);
        k += "<div class='rounded col-sm img-fluid' style='padding: 35px; margin:5px;'> <a href='category_page.html?name=brand-name&id="+data_json.response[i].brand_tag+"'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
        if((i+1) % 5 == 0){
           k += "</div></div><div class='container' style><div class='row'>";
        }
    }
   
    document.getElementById("Popular_brand_div").innerHTML = k + '</div></div>';   
}
//=======================================================================================


// ======================== Add To Kart ===================================

async function AddCartfunction(addcart, id) {
    qua = document.getElementById('qty'+id).value;
    console.log(qua)
    console.log(addcart);
    var k = document.getElementById('Logindiv_firebase').style.display;
    if(k === 'block') {
        location.replace("login.html");
    } else {
        CartAddApi(addcart, qua);
    }
}

async function CartAddApi(productdata, Quandity) {
    console.log(productdata);
    console.log(Quandity);
    var mydata = {
        user_id: 'UuoPi3EAUyMNfWnRBlTq2Mx9RaI2',
        prod_id: '10711',
        prod_qty: '2'
    }
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart";
    $.ajax({
        url : proxyurl+url,
        type : 'POST',
        data : JSON.stringify(mydata),
        contentType: 'application/json',
        success : function(result, status) {
           console.log(result);
           console.log(productdata);
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
}
//=========================================================================

//=================== Conform Order ========================

async function ConformOrder() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart/"+User;
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
    document.getElementById('subtotal').innerHTML = '&#x20b9; &nbsp;' + totalprice;
    document.getElementById('shipping').innerHTML = '&#x20b9; &nbsp;' + '30';
    document.getElementById('totalval').innerHTML = '&#x20b9; &nbsp;' + (totalprice + 30);
}


//======= Step 1 Billing and Delivery===================

async function Billing_delivery() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/address/"+User;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Billing_deliveryAddval(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function Billing_deliveryAddval(data) {
    JsonData = JSON.parse(data);
    document.getElementById('input-payment-firstname').value = User;
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
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/address/"+User;
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
        
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/address/"+User;
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
        var data = {
            "order_id": id,
            "user_id": User,
            "delivery": 30,
            "timeslot": "1 day",
            "payment_mode": "Cash",
            "user_comment":document.getElementById('Comments').value,
            "lat": '83.42322',
            "long": '43.4543',
            "add1": add1,
            "add2": add2,
            "landmark":landmark,
            "pincode": pincode,
            "mobile_no": mobile,
            "timestamp": h + ":" + m + ":" + s,
            "order_date": today,
            "promocode": "No",
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