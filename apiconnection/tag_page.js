var k = 0 ;
var GlobalApi = '';
var searchdata = [];
var searchid = [];
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
                if(localStorage.getItem('UserId')){
                    localStorage.setItem("UserName",k.response[0].name);
                    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+k.response[0].name;
                }
                else {
                    console.log('redirect');
                    location.replace('login.html');
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
            
        } else {
          // User not logged in or has just logged out.
        }
    });
    getfirebasecall();
    BasketData();
    GetAllProductData();
    var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
    BrandProductCall(data.name);
    document.getElementById('Pagetype').innerHTML = data.name;
    document.title += ' | ' + data.name;
    document.getElementById('PagetypeHome').innerHTML = data.name;
    topbrand_category();
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
  if(localStorage.getItem('UserId') && localStorage.getItem('UserName'))
    AddData();
    else{
    window.location.replace("index.html");
  }
}
function AddData() {
  document.getElementById('loginform').style.display ='none';
  document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
  document.getElementById('addDataform').style.display ='block';
}
//================================================


async function BrandProductCall(getdata) {
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/tag/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function GetApiCall(getdata) {

    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/getc/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}

async function GetApiCall(getdata) {

    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/getc/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}


async function CallingApi(Api_data) {
    //console.log(Api_data);
    ApiJson = JSON.parse(Api_data);
    // console.log(ApiJson);
    GlobalApi = ApiJson;
    var Adding_Items='';
    for(var i = k; i < Math.min(GlobalApi.response.length,document.getElementById('input-limit').value) ; i++){
        Adding_Items +=  '<div class="product-layout product-grid col-lg-3 col-6 "><div class="item"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="'+GlobalApi.response[i].title+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'"" title="pure-spice-3" class="img-responsive"> </a></div></div><div class="product-details"><div class="caption"><h4><a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> '+GlobalApi.response[i].name+'"</a></h4><p class="price">&#8377; &nbsp; '+GlobalApi.response[i].sell_price+'<span class="price-tax">Ex Tax: &#8377; 7.25</span></p><p class="desc">'+ApiJson.response[i].descp+'</p><div class="product_option"><div class="form-group required " style="padding-top: 10px; padding-bottom: 10px;"><p class="price" style="float: left;">Size : '+ApiJson.response[i].size+'</p><p class="price" style="float: right;"> Discount '+Math.round(100-(ApiJson.response[i].sell_price/ApiJson.response[i].max_price * 100))+'%</p><br><p class="price" style="text-align: center;">MRP &#8377; &nbsp; '+ApiJson.response[i].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" name="quantity" id="qty'+i+'" min="1" value="1"  step="1" class="qty form-control"><button type="button" class="addtocart pull-right"id="cart'+i+'" onclick="AddCartfunction('+ApiJson.response[i].product_id+', '+i+')" >Add</button></div></div></div></div></div></div></div>';
    }
    document.getElementById('AddAllItemsAsPerApi').innerHTML = Adding_Items;
}

async function GetSorted(){
    var Adding_Items='';
    for(var i = k; i < Math.min(GlobalApi.response.length,document.getElementById('input-limit').value) ; i++){
        Adding_Items +=  '<div class="product-layout product-grid col-lg-3 col-6 "><div class="item"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="'+GlobalApi.response[i].title+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="pure-spice-3" class="img-responsive"> </a></div></div><div class="product-details"><div class="caption"><h4><a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> '+GlobalApi.response[i].name+'"</a></h4><p class="price">&#8377; &nbsp 7.25<span class="price-tax">Ex Tax: &#8377; 7.25</span></p><p class="desc">'+ApiJson.response[i].descp+'</p><div class="product_option"><div class="form-group required " style="padding-top: 10px; padding-bottom: 10px;"><p class="price" style="float: left;">Left</p><p class="price" style="float: right;">Right</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1"  step="1" class="qty form-control"><button type="button" id="cart'+i+'" onclick="AddCartfunction('+ApiJson.response[i].product_id+')" class="addtocart pull-right">Add</button></div></div></div></div></div></div></div>';
    }
    document.getElementById('AddAllItemsAsPerApi').innerHTML = Adding_Items;
}

async function topbrand_category(){
    const proxyurl = "";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/brand";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Category_Brand(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
async function Category_Brand(data) {
    var jsonData = JSON.parse(data);
    var ulid = '';
    for(var i = 0; i < jsonData.response.length; i++)
        ulid += '<li><a href="category_page.html?name=brand-name&id='+jsonData.response[i].brand_tag+'">'+jsonData.response[i].brand_name+'</a></li>';
    document.getElementById('topbrand_Category').innerHTML = ulid;
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

async function AddCartfunction(addcart, id) {
    qua = document.getElementById('qty'+id).value;
    console.log(qua)
    console.log(addcart);
    var k = document.getElementById('Logindiv_firebase').style.display;
    if(localStorage.getItem('UserId') || localStorage.getItem('UserName')) {
        CartAddApi(addcart, qua);
    } else {
        location.replace("login.html");
    }
}

async function CartAddApi(productdata, Quandity) {
    console.log(productdata);
    console.log(Quandity);
    var mydata = {
        user_id: User,
        prod_id: productdata,
        prod_qty: Quandity
    }
    
    const proxyurl = "";
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