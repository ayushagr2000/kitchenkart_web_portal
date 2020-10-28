var searchdata = [];
var searchid = [];
var UserId = "null";

function res(){
    console.log("Your screen resolution is: " + screen.width);
}

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
    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/banner/webhome1";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Banner(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function Banner(Data) {
    var data_json = JSON.parse(Data);
    var bannercount = '';//<div class="carousel-item active"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'"><a class="carousel-control-prev" style="width: 100%;"></a></div>'; 
    if(data_json.response[0].banner_type === 'PRODUCT_CLICK')
        bannercount+= '<div class="carousel-item active"><a href="product-detail-page.html?id='+data_json.response[0].meta_data+'"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
    else if(data_json.response[0].banner_type === 'BRAND_Click')
        bannercount+= '<div class="carousel-item active"><a href="brand-page.html?name='+data_json.response[0].meta_data+'"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
    else if(data_json.response[0].banner_type === 'VENDOR_CLICK')
        bannercount+= '<div class="carousel-item active"><a href="Vendor-page.html?id='+data_json.response[0].meta_data+'"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
    else if(data_json.response[0].banner_type === 'TAG_CLICK')
        bannercount+= '<div class="carousel-item active"><a href="tagpage.html?name='+data_json.response[0].meta_data+'"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
    else if(data_json.response[0].banner_type === 'CATEGORY_CLICK')
        bannercount+= '<div class="carousel-item active"><a href="category-page.html?name='+data_json.response[0].meta_data+'"><img class="d-block w-100" src="'+data_json.response[0].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
    else 
        bannercount+= '<div class="carousel-item "><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></div>';
    var BannerImage = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active" style="background-color: red;"></li>';

    for(var i = 1; i < data_json.response.length; i++) {
        BannerImage += '<li data-target="#carouselExampleIndicators" data-slide-to="'+(i)+'"style="background-color: red;"></li>';
    
        if(data_json.response[i].banner_type === 'PRODUCT_CLICK')
            bannercount+= '<div class="carousel-item "><a href="product-detail-page.html?id='+data_json.response[i].meta_data+'"><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
        else if(data_json.response[i].banner_type === 'BRAND_Click')
            bannercount+= '<div class="carousel-item "><a href="brand-page.html?name='+data_json.response[i].meta_data+'"><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
        else if(data_json.response[i].banner_type === 'VENDOR_CLICK')
            bannercount+= '<div class="carousel-item "><a href="Vendor-page.html?id='+data_json.response[i].meta_data+'"><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
        else if(data_json.response[i].banner_type === 'TAG_CLICK')
            bannercount+= '<div class="carousel-item "><a href="tagpage.html?name='+data_json.response[i].meta_data+'"><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
        else if(data_json.response[i].banner_type === 'CATEGORY_CLICK')
            bannercount+= '<div class="carousel-item "><a href="category-page.html?name='+data_json.response[i].meta_data+'"><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></a></div>';
        else 
            bannercount+= '<div class="carousel-item "><img class="d-block w-100" src="'+data_json.response[i].banner_url+'";"><a class="carousel-control-prev" style="width: 100%;"></a></div>';
    }
   
    document.getElementById('BannerImage').innerHTML = bannercount;
    document.getElementById('BannerCount').innerHTML = BannerImage;
    
}

async function Featured_ProductsApi() {
    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/product/tag/new";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => Featured(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function Featured(FeaturedData){
    // console.log('Featured Data')
    var data_json = JSON.parse(FeaturedData);
    var featureddiv = '';
    for(var i = 0; i < 5; i++){
        featureddiv += '<div class="product-items col-6 col-sm-4 col-md-4 col-lg-3" style="height:400px;"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product-detail-page.html?id='+data_json.response[i].product_id+'"> <img src="'+data_json.response[i].img+'" style="height:200px; width:200px;" alt="'+data_json.response[i].name+'" title="'+data_json.response[i].name+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product-detail-page.html?id='+data_json.response[i].product_id+'"> </a></div></div><div class="product-details"  style="height:180px;"><div class="caption"><h4><a href="product-detail-page.html?id='+data_json.response[i].product_id+'">'+data_json.response[i].name+'</a></h4><p class="price">&#8377; &nbsp;'+data_json.response[i].sell_price+'<span class="price-tax">&#8377; &nbsp;</span></p><div class="product_option "><div class="form-group required "><p style="float: left;">size : '+data_json.response[i].size+'</p><p style="float: right;"> Discount '+Math.round(100-(data_json.response[i].sell_price/data_json.response[i].max_price * 100))+'%</p><br><p style="float: right;"> MRP &#8377;&nbsp;'+data_json.response[i].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1" step="1" class="qty form-control"><button type="button" class="addtocart pull-right" id="cart'+i+'" onclick="AddCartfunction('+data_json.response[i].product_id+', '+i+')">Add</button></div></div></div></div></div></div>';
    }
    document.getElementById('FeaturedProductDiv').innerHTML = featureddiv;
}



// =============================     Firebase Call =========================================================
async function getfirebasecall() {
    firebase.auth().onAuthStateChanged((user) => {
        // console.log("Enter in function");
          if (user) {
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

