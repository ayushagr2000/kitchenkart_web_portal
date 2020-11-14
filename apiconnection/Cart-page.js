
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
                    // document.getElementById('name').innerHTML = '<i class="fa fa-user"></i>'+k.response[0].name;
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
    BasketData();
    GetAllProductData();
    DisplayCartProductApi();
    topbrand_category();
    popular_brand();
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
  const url = "https://api.kitchenkartapp.in/api/users/"+localStorage.getItem('UserId');
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
    window.location.replace("login.html");
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

//============= Body Display ==============================================

async function DisplayCartProductApi() {
    const url = "https://api.kitchenkartapp.in/api/cart/"+localStorage.getItem('UserId');
    fetch( url)
    .then(response => response.text())
    .then(contents => DisplayCartProduct(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

// INCREASE COUNT
function addItemCounter(counter){
  console.log("111");
// /api/cart/add/{cartid}
  const url = "https://api.kitchenkartapp.in/api/cart/add/"+ counter;
  console.log("counter : "  + url);

  fetch( url)
  .then(response => response.text())
  .then(contents => DisplayCartProduct(contents))
  .catch(() => console.log("Error :  " + url + " response. Blocked by browser?"))
}

// DECREASE COUNT
function minusItemCounter(counter){
  // /api/cart/sub/{cartid}
  const url = "https://api.kitchenkartapp.in/api/cart/sub/"+ counter;
  console.log("counter : "  + url);

  fetch( url)
  .then(response => response.text())
  .then(contents => DisplayCartProduct(contents))
  .catch(() => console.log("Error :  " + url + " response. Blocked by browser?"))
}

async function DisplayCartProduct(data) {
    console.log("inside display");
    var displaydata = JSON.parse(data);

    var displaytable = '';
    var totalprice = 0;
    for(var i = 0; i < displaydata.response.length; i++) {
      // console.log("NEW : " + displaydata.response[i].cart_id);
        displaytable += '<tr><td class="text-center"><img src="'+displaydata.response[i].img+'" alt="'+displaydata.response[i].name+'" title="'+displaydata.response[i].name+'" style="height: 50px; width: 50px;"></td><td class="text-left"><a>'+displaydata.response[i].name+'</a></td><td class="text-left"><div style="max-width: 275px;" class="input-group btn-block">  <span class="input-group-btn"><button id="'+ displaydata.response[i].product_id +'" class="btn btn-danger" title="" data-toggle="tooltip" type="button" data-original-title="ADD" onclick="addItemCounter(' +displaydata.response[i].cart_id +  ');"><i class="fa fa-plus"></i></button></span><input type="text" class="form-control quantity" size="1" value="'+displaydata.response[i].prod_quan+'" name="quantity" disabled><span class="input-group-btn"><button id="'+displaydata.response[i].product_id+'" class="btn btn-danger" title="" data-toggle="tooltip" type="button" data-original-title="Subtract" onclick="minusItemCounter(' +displaydata.response[i].cart_id +  ');"><i class="fa fa-minus"></i></button></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="input-group-btn"><button id="'+displaydata.response[i].product_id+'" class="btn btn-danger" title="" data-toggle="tooltip" type="button" data-original-title="Remove" onclick="deleteBasketItem('+displaydata.response[i].cart_id+')"><i class="fa fa-times-circle"></i></button></span></div></td><td class="text-right">&#x20b9; &nbsp;'+displaydata.response[i].sell_price+'</td><td class="text-right">&#x20b9; &nbsp;'+(displaydata.response[i].sell_price * displaydata.response[i].prod_quan)+'</td></tr>';
        totalprice += (displaydata.response[i].sell_price * displaydata.response[i].prod_quan);
    }
    document.getElementById('AllProductDisplay').innerHTML = displaytable;
    var slab='';
    console.log("display");
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
    document.getElementById('subtotal').innerHTML = '&#8377;'+totalprice;
    const url = "https://api.kitchenkartapp.in/api/order/delivery/"+slab;
    var k;
    fetch(url)
    .then(response => response.text())
    .then(contents => {
        k = JSON.parse(contents);
        document.getElementById('deliverycharge').innerHTML = '&#8377;'+k.response[0].charge;
        document.getElementById('totalcharge').innerHTML = '&#8377;'+(totalprice+k.response[0].charge);
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


}

//==========================================================================
//============Our Popular Brand==============================================
async function popular_brand() {

    const url = "https://api.kitchenkartapp.in/api/brand";
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
        k += "<div class='rounded col-sm img-fluid' style='padding: 35px; margin:5px;'> <a href='category-page.html?name=brand-name&id="+data_json.response[i].brand_tag+"'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
        if((i+1) % 5 == 0){
           k += "</div></div><div class='container' style><div class='row'>";
        }
    }

    document.getElementById("Popular_brand_div").innerHTML = k + '</div></div>';
}
//=======================================================================================


async function GetAllProductData() {

    const url = "https://api.kitchenkartapp.in/api/product";
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
            mydata += '<li><a href="product-detail-page.html?id='+APiData.response[i].product_id+'"><h5>'+APiData.response[i].name + '</h5></a></li>';
            searchdata.push(APiData.response[i].name.toUpperCase());
            // searchid.push('name');
            //console.log(APiData.response[i].name);
        }
        if(!searchdata.includes(APiData.response[i].category.toUpperCase())){
            mydata += '<li><a href="category-page.html?name='+APiData.response[i].category+'"><h4> '+APiData.response[i].category + '</h4></a></li>';
            searchdata.push(APiData.response[i].category.toUpperCase());
            //searchid.push('name');
        }
        if(!searchdata.includes(APiData.response[i].brand.toUpperCase())){
            mydata += '<li><a href="category-page.html?name=brand-name&id='+APiData.response[i].brand+'"><h4>'+APiData.response[i].brand + '</h4></a></li>';
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
            location.replace("category-page.html?name=brand-name&id="+searchdata[indexid]);
        }
        else if(searchdata[indexid] === 'name') {
            location.replace("category-page.html?name="+searchdata[indexid]);
        }
        else{
            location.replace("product-detail-page.html?id="+searchid[indexid]);
        }
    }
    else {
        //alert("Item Not Found");
    }
}


// =============================     Firebase Call =========================================================
async function getfirebasecall() {
    firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            document.getElementById('Logindiv_firebase').style.display = "none";
            document.getElementById('signoutdiv_firebase').style.display = "block";
          } else {
            document.getElementById('Logindiv_firebase').style.display = 'block';
            document.getElementById('signoutdiv_firebase').style.display = 'none';
          }
    });
}


// ======================== Firebase Ends =================================
//========================= TOP BRAND CATEGORY =============================
async function topbrand_category(){
    const url = "https://api.kitchenkartapp.in/api/brand";
    fetch( url)
    .then(response => response.text())
    .then(contents => Category_Brand(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
async function Category_Brand(data) {
    var jsonData = JSON.parse(data);
    var ulid = '';
    for(var i = 0; i < jsonData.response.length; i++)
        ulid += '<li><a href="category-page.html?name=brand-name&id='+jsonData.response[i].brand_tag+'">'+jsonData.response[i].brand_name+'</a></li>';
    document.getElementById('topbrand_Category').innerHTML = ulid;
}
//==========================================================================
//============Our Popular Brand==============================================
async function popular_brand() {
    const url = "https://api.kitchenkartapp.in/api/brand";
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
        k += "<div class='rounded col-sm img-fluid' style='padding: 35px; margin:5px;'> <a href='category-page.html?name=brand-name&id="+data_json.response[i].brand_tag+"'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
        if((i+1) % 5 == 0){
           k += "</div></div><div class='container' style><div class='row'>";
        }
    }

    document.getElementById("Popular_brand_div").innerHTML = k + '</div></div>';

}
//=============================================================================
