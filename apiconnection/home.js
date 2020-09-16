var searchdata = [];
var searchid = [];
window.onload = function() {
    popular_brand()
    //brand('Avinash');
    Banner_ApiCall();
    //Banner('Avinash');
    Featured_ProductsApi();
    // Featured('Avinash');
    GetAllProductData();
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
        // if(!searchdata.includes('<li><a href="category_page.html?name='+APiData.response[i].name+'">'+APiData.response[i].name + '</a></li>')){
        //     mydata += '<li><a href="category_page.html?name='+APiData.response[i].name+'">'+APiData.response[i].name + '</a></li>';
        //     searchdata.push('<li><a href="category_page.html?name='+APiData.response[i].name+'">'+APiData.response[i].name + '</a></li>');
        // }
        if(!searchdata.includes(APiData.response[i].category.toUpperCase())){
            mydata += '<li><a href="category_page.html?name='+APiData.response[i].category+'">'+APiData.response[i].category + '</a></li>';
            searchdata.push(APiData.response[i].category.toUpperCase());
            searchid.push('name');
        }
        if(!searchdata.includes(APiData.response[i].brand.toUpperCase())){
            mydata += '<li><a href="category_page.html?name=brand-name&id='+APiData.response[i].brand+'">'+APiData.response[i].brand + '</a></li>';
            searchdata.push(APiData.response[i].brand.toUpperCase());
            searchid.push('brand');
        }
    }
    document.getElementById('myUL').innerHTML = mydata;
    searchdata.sort();
}

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
    console.log(data_json.response[0].brand_name);
    console.log(data_json);

    for(var i = 0; i < data_json.response.length; i++) {
        console.log(i);
        k += "<div class='rounded col-sm img-fluid' style='padding: 35px; margin:5px;'> <a href='category_page.html?name=brand-name&id="+data_json.response[i].brand_tag+"'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
        if((i+1) % 5 == 0){
           k += "</div></div><div class='container' style><div class='row'>";
        }
    }
   
    document.getElementById("Popular_brand_div").innerHTML = k + '</div></div>';   
}


async function Banner_ApiCall() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/banner/homepage1";
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
    console.log('Featured Data')
    var data_json = JSON.parse(FeaturedData);
    var featureddiv = '';
    for(var i = 0; i < data_json.response.length; i++){
        featureddiv += '<div class="product-items col-6 col-sm-4 col-md-4 col-lg-3" style="height:400px;"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+data_json.response[i].product_id+'"> <img src="'+data_json.response[i].img+'" style="height:200px; width:200px;" alt="'+data_json.response[i].name+'" title="'+data_json.response[i].name+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+data_json.response[i].product_id+'"> </a></div></div><div class="product-details"  style="height:180px;"><div class="caption"><h4><a href="product_detail_page.html?id='+data_json.response[i].product_id+'">'+data_json.response[i].name+'</a></h4><p class="price">&#8377; &nbsp;'+data_json.response[i].sell_price+'<span class="price-tax">&#8377; &nbsp;</span></p><div class="product_option "><div class="form-group required "><p style="float: left;">size : '+data_json.response[i].size+'</p><p style="float: right;"> Discount '+Math.round(100-(data_json.response[i].sell_price/data_json.response[i].max_price * 100))+'%</p><br><p style="float: right;"> MRP &#8377;&nbsp;'+data_json.response[i].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1" step="1" class="qty form-control"><button type="button" class="addtocart pull-right" id="cart'+i+'" onclick(this.id)>Add</button></div></div></div></div></div></div>';
    }
    document.getElementById('FeaturedProductDiv').innerHTML = featureddiv;
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

async function getdata() {
    if(searchdata.includes(document.getElementById("search-input").value.toUpperCase())) {
        //location.replace("");
        var indexid = searchdata.indexOf(document.getElementById("search-input").value.toUpperCase());
        if(searchid[indexid] === 'brand'){
            location.replace("category_page.html?name=brand-name&id="+searchdata[indexid]);
        }
        else {
            location.replace("category_page.html?name="+searchdata[indexid]);
        }
    }
    else {
        alert("Item Not Found");
    }
}
async function checkEnter(k) {
    if(k === 13)
        getdata();    
}