
window.onload = function() {
    getfirebasecall();
    BasketData();
    GetUserId();
    GetAllProductData();
    DisplayCartProductApi();
    topbrand_category();
    popular_brand();
}

// window.onload = function() {
//     getfirebasecall();
//     popular_brand();
//     BasketData();
//     GetAllProductData();
//     DisplayCartProductApi();
// }


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

//============= Body Display ==============================================

async function DisplayCartProductApi() {
    
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart/"+User;
    fetch( url)
    .then(response => response.text())
    .then(contents => DisplayCartProduct(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function DisplayCartProduct(data) {
    var displaydata = JSON.parse(data);
    var displaytable = '';
    var totalprice = 0;
    for(var i = 0; i < displaydata.response.length; i++) {
        displaytable += '<tr><td class="text-center"><img src="'+displaydata.response[i].img+'" alt="'+displaydata.response[i].name+'" title="'+displaydata.response[i].name+'" style="height: 50px; width: 50px;"></td><td class="text-left"><a>'+displaydata.response[i].name+'</a></td><td class="text-left"><div style="max-width: 200px;" class="input-group btn-block"><input type="text" class="form-control quantity" size="1" value="'+displaydata.response[i].prod_quan+'" name="quantity"><span class="input-group-btn"><button id="'+displaydata.response[i].product_id+'" class="btn btn-danger" title="" data-toggle="tooltip" type="button" data-original-title="Remove" onclick="removecart(this.id)"><i class="fa fa-times-circle"></i></button></span></div></td><td class="text-right">&#x20b9; &nbsp;'+displaydata.response[i].sell_price+'</td><td class="text-right">&#x20b9; &nbsp;'+(displaydata.response[i].sell_price * displaydata.response[i].prod_quan)+'</td></tr>';
        totalprice += displaydata.response[i].sell_price;
    }
    document.getElementById('AllProductDisplay').innerHTML = displaytable;
    document.getElementById('subtotal').innerHTML = '&#8377;'+totalprice;
    document.getElementById('deliverycharge').innerHTML = '&#8377;30';
    document.getElementById('totalcharge').innerHTML = '&#8377;'+(totalprice+30);

}

//==========================================================================
//============Our Popular Brand==============================================
async function popular_brand() {
    
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/brand";
    fetch(url)
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


async function GetAllProductData() {

    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product";
    fetch(url)
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


// ======================== Firebase Ends =================================

//============= Body Display ==============================================

async function DisplayCartProductApi() {
    
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart/"+User;
    fetch(url)
    .then(response => response.text())
    .then(contents => DisplayCartProduct(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function DisplayCartProduct(data) {
    var displaydata = JSON.parse(data);
    var displaytable = '';
    var totalprice = 0;
    for(var i = 0; i < displaydata.response.length; i++) {
        displaytable += '<tr><td class="text-center"><img src="'+displaydata.response[i].img+'" alt="'+displaydata.response[i].name+'" title="'+displaydata.response[i].name+'" style="height: 50px; width: 50px;"></td><td class="text-left"><a>'+displaydata.response[i].name+'</a></td><td class="text-left"><div style="max-width: 200px;" class="input-group btn-block"><input type="text" class="form-control quantity" size="1" value="'+displaydata.response[i].prod_quan+'" name="quantity"><span class="input-group-btn"><button id="'+displaydata.response[i].product_id+'" class="btn btn-danger" title="" data-toggle="tooltip" type="button" data-original-title="Remove" onclick="removecart(this.id)"><i class="fa fa-times-circle"></i></button></span></div></td><td class="text-right">&#x20b9; &nbsp;'+displaydata.response[i].sell_price+'</td><td class="text-right">&#x20b9; &nbsp;'+(displaydata.response[i].sell_price * displaydata.response[i].prod_quan)+'</td></tr>';
        totalprice += displaydata.response[i].sell_price;
    }
    document.getElementById('AllProductDisplay').innerHTML = displaytable;
    document.getElementById('subtotal').innerHTML = '&#8377;'+totalprice;
    document.getElementById('deliverycharge').innerHTML = '&#8377;30';
    document.getElementById('totalcharge').innerHTML = '&#8377;'+(totalprice+30);
}

//==========================================================================
//========================= TOP BRAND CATEGORY =============================
async function topbrand_category(){
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/brand";
    fetch( url)
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
//==========================================================================
//============Our Popular Brand==============================================
async function popular_brand() {
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/brand";
    fetch(url)
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
//=============================================================================
