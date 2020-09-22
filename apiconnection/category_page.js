var k = 0 ;
var GlobalApi = '';
var searchdata = [];
var searchid = [];
window.onload = function() {
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
    if(data.name === 'brand-name') {
        BrandProductCall(data.id);
        document.getElementById('Pagetype').innerHTML = data.id;
        document.getElementById('PagetypeHome').innerHTML = data.id;
    }
    else {
        var getdata = data.name;
        console.log(getdata);
        GetApiCall(getdata);
        if(getdata === 'snacks' ){
            document.getElementById('Pagetype').innerHTML = "Biscuits, Snacks & Chocolates";
            document.getElementById('PagetypeHome').innerHTML = "Biscuits, Snacks & Chocolates";
        }

        if(getdata === 'beverages'){
            document.getElementById('Pagetype').innerHTML = "Beverages";
            document.getElementById('PagetypeHome').innerHTML = "Beverages";
        }
        if(getdata === 'cleaning'){
            document.getElementById('Pagetype').innerHTML = "Household Needs";
            document.getElementById('PagetypeHome').innerHTML = "Household Needs";
        }
        if(getdata === 'sweets'){
            document.getElementById('Pagetype').innerHTML = "Sweets";
            document.getElementById('PagetypeHome').innerHTML = "Sweets";
        }
        if(getdata === 'oils'){
            document.getElementById('Pagetype').innerHTML = "Edible Oils";
            document.getElementById('PagetypeHome').innerHTML = "Edible Oils";
        }
        if(getdata === 'dryfruits'){
            document.getElementById('Pagetype').innerHTML = "Dry Fruits Nuts";
            document.getElementById('PagetypeHome').innerHTML = "Dry Fruits Nuts";
        }
        if(getdata === 'staples'){
            document.getElementById('Pagetype').innerHTML = "Grocery & Staples";
            document.getElementById('PagetypeHome').innerHTML = "Grocery & Staples";
        }
    }
    topbrand_category();

}

async function BrandProductCall(getdata) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/getb/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function GetApiCall(getdata) {

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/getc/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}

async function CallingApi(Api_data) {
    console.log(document.getElementById('input-limit').value);
    ApiJson = JSON.parse(Api_data);
    console.log(ApiJson);
    GlobalApi = ApiJson;
    var Adding_Items='';
    for(var i = k; i < Math.min(GlobalApi.response.length,document.getElementById('input-limit').value) ; i++){
        Adding_Items +=  '<div class="product-layout product-grid col-lg-3 col-6 "><div class="item"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="'+GlobalApi.response[i].title+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'"" title="pure-spice-3" class="img-responsive"> </a></div></div><div class="product-details"><div class="caption"><h4><a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> '+GlobalApi.response[i].name+'"</a></h4><p class="price">&#8377; &nbsp; '+GlobalApi.response[i].sell_price+'<span class="price-tax">Ex Tax: &#8377; 7.25</span></p><p class="desc">'+ApiJson.response[i].descp+'</p><div class="product_option"><div class="form-group required " style="padding-top: 10px; padding-bottom: 10px;"><p class="price" style="float: left;">Size : '+ApiJson.response[i].size+'</p><p class="price" style="float: right;"> Discount '+Math.round(100-(ApiJson.response[i].sell_price/ApiJson.response[i].max_price * 100))+'%</p><br><p class="price" style="text-align: center;">MRP &#8377; &nbsp; '+ApiJson.response[i].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" name="quantity" min="1" value="1"  step="1" class="qty form-control"><button type="button" class="addtocart pull-right"  onclick="AddCartfunction('+ApiJson.response[i].product_id+')">Add</button></div></div></div></div></div></div></div>';
    }
    document.getElementById('AddAllItemsAsPerApi').innerHTML = Adding_Items;
}

async function GetSorted(){
    var Adding_Items='';
    for(var i = k; i < Math.min(GlobalApi.response.length,document.getElementById('input-limit').value) ; i++){
        Adding_Items +=  '<div class="product-layout product-grid col-lg-3 col-6 "><div class="item"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'" title="'+GlobalApi.response[i].title+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> <img src="'+GlobalApi.response[i].img+'" style="height:280px;" alt="'+GlobalApi.response[i].name+'"" title="pure-spice-3" class="img-responsive"> </a></div></div><div class="product-details"><div class="caption"><h4><a href="product_detail_page.html?id='+GlobalApi.response[i].product_id+'"> '+GlobalApi.response[i].name+'"</a></h4><p class="price">&#8377; &nbsp 7.25<span class="price-tax">Ex Tax: &#8377; 7.25</span></p><p class="desc">'+ApiJson.response[i].descp+'</p><div class="product_option"><div class="form-group required " style="padding-top: 10px; padding-bottom: 10px;"><p class="price" style="float: left;">Left</p><p class="price" style="float: right;">Right</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" name="quantity" min="1" value="1"  step="1" class="qty form-control"><button type="button" class="addtocart pull-right">Add</button></div></div></div></div></div></div></div>';
    }
    document.getElementById('AddAllItemsAsPerApi').innerHTML = Adding_Items;
}

async function topbrand_category(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
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
