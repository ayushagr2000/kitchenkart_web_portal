var k = 0 ;
var GlobalApi = '';
var searchdata = [];
var searchid = [];
window.onload = function() {
    if(screen.width < 765){
        document.getElementById('column-left').style.display = "none";
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            localStorage.setItem("UserId", user.uid);
            localStorage.setItem("UserNumber", user.phoneNumber);
            UserNumber = user.phoneNumber;
            console.log(user.uid);
            const proxyurl = "";
            const url = "https://api.kitchenkartapp.in/api/users/"+user.uid;
            fetch(proxyurl + url)
            .then(response => response.text())
            .then(contents => {
                k = JSON.parse(contents);
                console.log(k);
                if(k.response.length === 0)
                    location.replace('login.html');
                else {
                    localStorage.setItem("UserName",k.response[0].name);
                    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i><a href ="MyAccount.html">'+k.response[0].name+'</a>';
                    document.getElementById('mobileLogin').innerHTML = '<i class="fa fa-user-circle-o"></i>'+k.response[0].name;
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        } else {
          // User not logged in or has just logged out.
        }
    });
    // console.log("1");
    getfirebasecall();
    // console.log("2");
    BasketData();
    // console.log("3");
    GetAllProductData();
    // console.log("3");
    // var url = document.location.href,
    //         params = url.split('/category-page.html?')[1].split('&'),
    //         data = {}, tmp;
    //         console.log("NEW URL1 :" + params);
    //         console.log("NEW URL2 :" + data[0]);
    //
    //
    //     for (var i = 0, l = params.length; i < l; i++) {
    //         tmp = params[i].split('=');
    //         data[tmp[0]] = tmp[1];
    //         console.log("NEW URL3 :" + data[tmp[0]]);
    //     }
    var url = document.location.href,
          params = url.split('/category/')[1],
          data = {}, tmp;

          data = params;
          console.log("NEW URL :" + data);

    if(data.name === 'brand-name'){
        BrandProductCall(data.id);
        document.getElementById('Pagetype').innerHTML = data.id;
        document.title += ' | ' + data.id;
        document.getElementById('PagetypeHome').innerHTML = data.id;
    }
    else {
        var getdata = data;
        console.log("1 : " + getdata);
        GetApiCall(getdata);
        if(getdata === 'snacks' ){
            document.title += ' | Biscuits, Snacks & Chocolates';
            document.getElementById('Pagetype').innerHTML = "Biscuits, Snacks & Chocolates";
            document.getElementById('PagetypeHome').innerHTML = "Biscuits, Snacks & Chocolates";
        }

        if(getdata === 'beverages'){
            document.title += ' | Beverages';
            document.getElementById('Pagetype').innerHTML = "Beverages";
            document.getElementById('PagetypeHome').innerHTML = "Beverages";
        }
        if(getdata === 'cleaning'){
            document.title += ' | Household Needs';
            document.getElementById('Pagetype').innerHTML = "Household Needs";
            document.getElementById('PagetypeHome').innerHTML = "Household Needs";
        }
        if(getdata === 'sweets'){
            document.title += ' | Sweets';
            document.getElementById('Pagetype').innerHTML = "Sweets";
            document.getElementById('PagetypeHome').innerHTML = "Sweets";
        }
        if(getdata === 'oils'){
            document.title += ' | Edible Oils';
            document.getElementById('Pagetype').innerHTML = "Edible Oils";
            document.getElementById('PagetypeHome').innerHTML = "Edible Oils";
        }
        if(getdata === 'dryfruits'){
            document.title += ' | Dry Fruits Nuts';
            document.getElementById('Pagetype').innerHTML = "Dry Fruits Nuts";
            document.getElementById('PagetypeHome').innerHTML = "Dry Fruits Nuts";
        }
        if(getdata === 'staples'){
            document.title += ' | Grocery & Staples';
            document.getElementById('Pagetype').innerHTML = "Grocery & Staples";
            document.getElementById('PagetypeHome').innerHTML = "Grocery & Staples";
        }
    }
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
  const url = "https://api.kitchenkartapp.in/api/users/"+localStorage.getItem('UserId');
  fetch(proxyurl + url)
  .then(response => response.text())
  .then(contents => checkuser(contents))
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
function checkuser(ApiData) {
  jsonApi = JSON.parse(ApiData);
  if(jsonApi.response.length === 0)
    AddData();
  else {
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
    const url = "https://api.kitchenkartapp.in/api/product/getb/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function GetApiCall(getdata) {

    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/product/getc/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}

async function GetApiCall(getdata) {

    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/product/getc/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}


async function CallingApi(Api_data) {
    // console.log(Api_data);
    ApiJson = JSON.parse(Api_data);
    // console.log(ApiJson);
    GlobalApi = ApiJson;
    var Adding_Items='';
    for(var i = k; i < Math.min(GlobalApi.response.length,document.getElementById('input-limit').value) ; i++){
        Adding_Items +=  '<div class="product-layout product-grid col-lg-3 col-6 "><div class="item"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="http://localhost/kitchenkart_web_portal/product/'+GlobalApi.response[i].product_slug+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="'+GlobalApi.response[i].title+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="http://localhost/kitchenkart_web_portal/product/'+GlobalApi.response[i].product_slug+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'"" title="pure-spice-3" class="img-responsive"> </a></div></div><div class="product-details"><div class="caption"><h4><a href="http://localhost/kitchenkart_web_portal/product/'+GlobalApi.response[i].product_slug+'"> '+GlobalApi.response[i].name+'"</a></h4><p class="price">&#8377; &nbsp; '+GlobalApi.response[i].sell_price+'<span class="price-tax">Ex Tax: &#8377; 7.25</span></p><p class="desc">'+ApiJson.response[i].descp+'</p><div class="product_option"><div class="form-group required " style="padding-top: 10px; padding-bottom: 10px;"><p class="price" style="float: left;">Size : '+ApiJson.response[i].size+'</p><p class="price" style="float: right;"> Discount '+Math.round(100-(ApiJson.response[i].sell_price/ApiJson.response[i].max_price * 100))+'%</p><br><p class="price" style="text-align: center;">MRP &#8377; &nbsp; '+ApiJson.response[i].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" name="quantity" id="qty'+i+'" min="1" value="1"  step="1" class="qty form-control"><button type="button" class="addtocart pull-right"id="cart'+i+'" onclick="AddCartfunction('+ApiJson.response[i].product_id+', '+i+')" >Add</button></div></div></div></div></div></div></div>';
    }
    document.getElementById('AddAllItemsAsPerApi').innerHTML = Adding_Items;
}

async function GetSorted(){
    var Adding_Items='';
    for(var i = k; i < Math.min(GlobalApi.response.length,document.getElementById('input-limit').value) ; i++){
        Adding_Items +=  '<div class="product-layout product-grid col-lg-3 col-6 "><div class="item"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="http://localhost/kitchenkart_web_portal/product/'+GlobalApi.response[i].product_slug+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="'+GlobalApi.response[i].title+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="http://localhost/kitchenkart_web_portal/product/'+GlobalApi.response[i].product_slug+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="pure-spice-3" class="img-responsive"> </a></div></div><div class="product-details"><div class="caption"><h4><a href="http://localhost/kitchenkart_web_portal/product/'+GlobalApi.response[i].product_slug+'"> '+GlobalApi.response[i].name+'"</a></h4><p class="price">&#8377; &nbsp 7.25<span class="price-tax">Ex Tax: &#8377; 7.25</span></p><p class="desc">'+ApiJson.response[i].descp+'</p><div class="product_option"><div class="form-group required " style="padding-top: 10px; padding-bottom: 10px;"><p class="price" style="float: left;">Left</p><p class="price" style="float: right;">Right</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1"  step="1" class="qty form-control"><button type="button" id="cart'+i+'" onclick="AddCartfunction('+ApiJson.response[i].product_id+')" class="addtocart pull-right">Add</button></div></div></div></div></div></div></div>';
    }
    document.getElementById('AddAllItemsAsPerApi').innerHTML = Adding_Items;
}

async function topbrand_category(){
    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/brand";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Category_Brand(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
async function Category_Brand(data) {
    var jsonData = JSON.parse(data);
    var ulid = '';
    for(var i = 0; i < jsonData.response.length; i++)
        ulid += '<li><a href="brand-page.html?name='+jsonData.response[i].brand_tag+'">'+jsonData.response[i].brand_name+'</a></li>';
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
        user_id: User,
        prod_id: productdata,
        prod_qty: Quandity
    }

    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/cart";
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
