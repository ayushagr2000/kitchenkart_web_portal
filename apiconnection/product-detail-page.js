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
            const url = "https://api.kitchenkartapp.in/api/users/"+user.uid;
            fetch(proxyurl + url)
            .then(response => response.text())
            .then(contents => {
                k = JSON.parse(contents);
                console.log(k);
                if(localStorage.getItem('UserId') && localStorage.getItem('UserName')){
                    localStorage.setItem("UserName",k.response[0].name);
                    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i><a href ="MyAccount.html">'+k.response[0].name+'</a>';
                    document.getElementById('mobileLogin').innerHTML = '<i class="fa fa-user-circle-o"></i>'+k.response[0].name;
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
    document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
    getfirebasecall();
    GetAllProductData();
    var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    getProductApi(data.id);
    popular_brand();
    BasketData();
    getuserdetails();
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
    if(localStorage.getItem('UserId') && localStorage.getItem('UserName'))
        AddData();
    else if(localStorage.getItem('UserId') == null && localStorage.getItem('UserName') == null){
        console.log("No Data Insertion");
    }
    else {
        window.location.replace("login.html");
    }
}
function AddData() {
  document.getElementById('loginform').style.display ='none';
  document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+localStorage.getItem('UserName');
  document.getElementById('addDataform').style.display ='block';
}
//================================================


async function getProductApi(data) {
    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/product/"+data;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printdataval(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}
async function printdataval(productdata){
    var singledata = JSON.parse(productdata);
    document.getElementById('detail_image').src = singledata.response[0].img;
    document.getElementById('detail_image').alt = singledata.response[0].name;
    document.getElementById('Pagetype').innerHTML = singledata.response[0].name;
    document.title += ' | '+singledata.response[0].name;
    document.getElementById('PagetypeHome').innerHTML = singledata.response[0].name;
    document.getElementById('Product_Name').innerHTML = singledata.response[0].name;
    document.getElementById('productid').innerHTML = singledata.response[0].product_id;
    document.getElementById('product_Size').innerHTML = singledata.response[0].size;
    document.getElementById('product_Price').innerHTML = '&#8377; &nbsp'+singledata.response[0].sell_price;
    document.getElementById('product_Brand').innerHTML = singledata.response[0].brand;
    document.getElementById('product_Brand').href = 'category-page.html?name=brand-name&id='+singledata.response[0].brand;
    if(singledata.response[0].stock_status > 0){
        document.getElementById('product_Stock').innerHTML = singledata.response[0].name;
    }
    else {
        document.getElementById('product_Stock').innerHTML = 'Currently Not Available';
    }
    document.getElementById('product-details').innerHTML = singledata.response[0].descp;

    getRelatedProduct(singledata.response[0].category);

}

async function getRelatedProduct(category){
    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/product/getc/"+category;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printdatavallimited(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
async function printdatavallimited(data) {
    datainApi = JSON.parse(data);
    var featureddiv = '';
    var randomgen = Math.floor(Math.random() * datainApi.response.length); 
    for(var i = 0; i < 5; i++){
        var n = (randomgen+i) % datainApi.response.length;
        featureddiv += '<div class="product-items col-6 col-sm-4 col-md-4 col-lg-3" style="height:400px;"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product-detail-page.html?id='+datainApi.response[n].product_id+'"> <img src="'+datainApi.response[n].img+'" style="height:200px; width:200px;" alt="'+datainApi.response[n].name+'" title="'+datainApi.response[n].name+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product-detail-page.html?id='+datainApi.response[n].product_id+'"> </a></div></div><div class="product-details"  style="height:180px;"><div class="caption"><h4><a href="product-detail-page.html?id='+datainApi.response[n].product_id+'">'+datainApi.response[n].name+'</a></h4><p class="price">&#8377; &nbsp;'+datainApi.response[n].sell_price+'<span class="price-tax">&#8377; &nbsp;</span></p><div class="product_option "><div class="form-group required "><p style="float: left;">size : '+datainApi.response[n].size+'</p><p style="float: right;"> Discount '+Math.round(100-(datainApi.response[n].sell_price/datainApi.response[n].max_price * 100))+'%</p><br><p style="float: right;"> MRP &#8377;&nbsp;'+datainApi.response[n].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1" step="1" class="qty form-control"><button type="button" class="addtocart pull-right" id="cart'+i+'" onclick="AddCartfunction('+datainApi.response[n].product_id+', '+i+')">Add</button></div></div></div></div></div></div>';
    }
    document.getElementById('Random5relatedProduct').innerHTML = featureddiv;
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

// ======================== Add To MAin Kart ===================================

async function MainCartAdd() {
    var qua = document.getElementById('qua').value;
    var addcart = document.getElementById('productid').innerHTML;
    console.log(addcart)
    console.log(qua);
    var k = document.getElementById('Logindiv_firebase').style.display;
    if(localStorage.getItem('UserId') || localStorage.getItem('UserName')) {
        CartAddApi(addcart, qua);
    } else {
        location.replace("login.html");
    }
}

async function MainCartAddApi(productdata, Quandity) {
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
           BasketData();
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
    
}
//=========================================================================