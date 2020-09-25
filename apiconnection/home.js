var searchdata = [];
var searchid = [];
var UserId = "null";
window.onload = function() {
    getfirebasecall();
    popular_brand();
    //brand('Avinash');
    Banner_ApiCall();
    //Banner('Avinash');
    Featured_ProductsApi();
    // Featured('Avinash');
    GetAllProductData();
    BasketData();
}




async function Banner_ApiCall() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/banner/webhome1";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Banner(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function Banner(Data) {
    var data_json = JSON.parse(Data);
    var bannercount = '<div class="carousel-item active"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'" style="height: 350px;"><a class="carousel-control-prev" style="width: 100%;"></a></div>'; 
    var BannerImage = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active" style="background-color: red;"></li>';

    for(var i = 1; i < data_json.response.length; i++) {
        BannerImage += '<li data-target="#carouselExampleIndicators" data-slide-to="'+(i)+'"style="background-color: red;"></li>';
        bannercount+= '<div class="carousel-item "><img class="d-block w-100" src="'+data_json.response[i].banner_url+'" style="height: 350px;"><a class="carousel-control-prev" style="width: 45%;"></a></div>';
    }
   
    document.getElementById('BannerImage').innerHTML = bannercount;
    document.getElementById('BannerCount').innerHTML = BannerImage;
}

async function Featured_ProductsApi() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/tag/new";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Featured(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function Featured(FeaturedData){
    // console.log('Featured Data')
    var data_json = JSON.parse(FeaturedData);
    var featureddiv = '';
    for(var i = 0; i < data_json.response.length; i++){
        featureddiv += '<div class="product-items col-6 col-sm-4 col-md-4 col-lg-3" style="height:400px;"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+data_json.response[i].product_id+'"> <img src="'+data_json.response[i].img+'" style="height:200px; width:200px;" alt="'+data_json.response[i].name+'" title="'+data_json.response[i].name+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+data_json.response[i].product_id+'"> </a></div></div><div class="product-details"  style="height:180px;"><div class="caption"><h4><a href="product_detail_page.html?id='+data_json.response[i].product_id+'">'+data_json.response[i].name+'</a></h4><p class="price">&#8377; &nbsp;'+data_json.response[i].sell_price+'<span class="price-tax">&#8377; &nbsp;</span></p><div class="product_option "><div class="form-group required "><p style="float: left;">size : '+data_json.response[i].size+'</p><p style="float: right;"> Discount '+Math.round(100-(data_json.response[i].sell_price/data_json.response[i].max_price * 100))+'%</p><br><p style="float: right;"> MRP &#8377;&nbsp;'+data_json.response[i].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1" step="1" class="qty form-control"><button type="button" class="addtocart pull-right" id="cart'+i+'" onclick="AddCartfunction('+data_json.response[i].product_id+', '+i+')">Add</button></div></div></div></div></div></div>';
    }
    document.getElementById('FeaturedProductDiv').innerHTML = featureddiv;
}



// =============================     Firebase Call =========================================================
async function getfirebasecall() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log("Enter in function");
          if (user) {
            console.log(user.uid);
            UserId = user.uid;
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

