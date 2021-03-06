// All Api Data
var searchdata = [];
var searchid = [];
var dataGlobal="";
var call = false;
async function GetAllProductData() {
    call = true;
    const proxyurl = "";
    const url = "https://api.kitchenkartapp.in/api/product";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => addproductinsearch(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function addproductinsearch(data) {
    dataGlobal = data;
    APiData = JSON.parse(dataGlobal);
    var mydata = "";
    for(var i = 0; i < APiData.response.length; i++){
        if(!searchdata.includes(APiData.response[i].name.toUpperCase())){
            mydata += '<li><a href="product-detail-page.html?id='+APiData.response[i].product_id+'"><h5>'+APiData.response[i].name + '</h5></a></li>';
            searchdata.push(APiData.response[i].name.toUpperCase());
            searchid.push(APiData.response[i].product_id);
            //console.log(APiData.response[i].name);
        }
        if(!searchdata.includes(APiData.response[i].category.toUpperCase())){
            mydata += '<li><a href="category-page.html?name='+APiData.response[i].category+'"><h4> See all '+APiData.response[i].category + '</h4></a></li>';
            searchdata.push(APiData.response[i].category.toUpperCase());
            searchid.push('name');
        }
        if(!searchdata.includes(APiData.response[i].brand.toUpperCase())){
            mydata += '<li><a href="brand-page.html?name='+APiData.response[i].brand+'"><h4>'+APiData.response[i].brand + '</h4></a></li>';
            searchdata.push(APiData.response[i].brand.toUpperCase());
            searchid.push('brand');
        }
    }
    document.getElementById('myUL').innerHTML = mydata;
}

async function logout_firebase() {
    firebase.auth().signOut().then(function() {
        localStorage.clear();
        alert("Successfully Logout");
        document.getElementById('Logindiv_firebase').style.display = 'block';
        document.getElementById('signoutdiv_firebase').style.display = 'none';
        location.reload();
      }, function(error) {
        // An error happened.
      });
}