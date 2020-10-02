var User = "null";
var UserName = "null";
var UserNumber = "null";
// ====================Get User Name==============================
async function GetUserId() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
            console.log(user.uid);
            User = user.uid;
            UserNumber = user.phoneNumber;
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/users/"+user.id;
            fetch(proxyurl + url)
            .then(response => response.text())
            .then(contents => UserName = contents.name)
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
        } else {
          // User not logged in or has just logged out.
        }
      });
}
// =====================================================

// ======================== Add To Kart ===================================

async function AddCartfunction(addcart, id) {
    qua = document.getElementById('qty'+id).value;
    
    var k = document.getElementById('Logindiv_firebase').style.display;
    if(k === 'block' || User === 'null') {
       location.replace("login.html");
    } else {
        CartAddApi(addcart, qua);
    }
}

async function CartAddApi(productdata, Quandity) {
    var mydata = {
        user_id: User,
        prod_id: productdata,
        prod_qty: Quandity
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
           BasketData();
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
    
}

//=========================================================================
//=================== Basket Data ========================

async function BasketData() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart/"+User;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => BasketDataDisplay(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function BasketDataDisplay(Data) {
    console.log("basket Data");
    var Jsondata = JSON.parse(Data);
    document.getElementById('cart-total-res').innerText = Jsondata.response.length;
    document.getElementById('cart-total').innerText = 'Item ' + Jsondata.response.length;
    console.log(Jsondata.response.length);
    console.log(document.getElementById('cart-total-res').innerText);
    var alldata = '';
    var totalprice = 0;
    for(var i = 0; i < Jsondata.response.length; i++)
        totalprice += Jsondata.response[i].sell_price;
    for(var i = 0; i < Math.min(5,Jsondata.response.length); i++){
        alldata += '<tr><td class="text-center"><a href="product_detail_page.html?id='+Jsondata.response[i].prod_id+'"><img src="'+Jsondata.response[i].img+'" alt="'+Jsondata.response[i].name+'" title="'+Jsondata.response[i].name+'" style="width: 75px; height: 75px;"></a></td><td class="text-left product-name"><a href="product_detail_page.html?id='+Jsondata.response[i].prod_id+'">'+Jsondata.response[i].name+'</a> <span class="text-left price"> &#x20b9; &nbsp;'+Jsondata.response[i].sell_price+'</span><input class="cart-qty" name="product_quantity" min="1" value="'+Jsondata.response[i].prod_quan+'" type="number"></td><td class="text-center"><a class="close-cart" id="DeleteId" onclick="deletecartItem(this.id)"><i class="fa fa-times-circle"></i></a></td></tr>';
    }
    document.getElementById('carttable').innerHTML = alldata;
    document.getElementById('PriceToal').innerHTML = '&#x20b9; &nbsp;' + totalprice;
    if(Jsondata.response.length > 5){
        document.getElementById('view_option').innerHTML = '<a href="cart_page.html?id='+User+'">View All Products</a>';
        document.getElementById('view_option').style.display = "block";
    }
}

//======================= Search Bar ============================

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
async function checkEnter(k) {
    if(k === 13)
        getdata();    
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
}

//===============================================================
//================= POPULAR BRAND================================
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
//===============================================================