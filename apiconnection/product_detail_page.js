var searchdata = [];
var searchid = [];

window.onload = function() {
    GetAllProductData();
    var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    getProductApi(data.id);
    popular_brand()
}
async function getProductApi(data) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/"+data;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printdataval(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}
async function printdataval(productdata){
    var singledata = JSON.parse(productdata);
    document.getElementById('detail_image').src = singledata.response[0].img;
    document.getElementById('detail_image').alt = singledata.response[0].name;
    document.getElementById('Product_Name').innerHTML = singledata.response[0].name;
    document.getElementById('productid').innerHTML = singledata.response[0].product_id;
    document.getElementById('product_Price').innerHTML = '&#8377; &nbsp'+singledata.response[0].sell_price;
    document.getElementById('product_Brand').innerHTML = singledata.response[0].brand;
    document.getElementById('product_Brand').href = 'category_page.html?name=brand-name&id='+singledata.response[0].brand;
    if(singledata.response[0].stock_status > 0){
        document.getElementById('product_Stock').innerHTML = singledata.response[0].name;
    }
    else {
        document.getElementById('product_Stock').innerHTML = 'Currently Not Available';
    }
    document.getElementById('Product_Details').innerHTML = singledata.response[0].descp;

    getRelatedProduct(singledata.response[0].category);

}

async function getRelatedProduct(category){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/getc/"+category;
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
        featureddiv += '<div class="product-items col-6 col-sm-4 col-md-4 col-lg-3" style="height:400px;"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html?id='+datainApi.response[n].product_id+'"> <img src="'+datainApi.response[n].img+'" style="height:200px; width:200px;" alt="'+datainApi.response[n].name+'" title="'+datainApi.response[n].name+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html?id='+datainApi.response[n].product_id+'"> </a></div></div><div class="product-details"  style="height:180px;"><div class="caption"><h4><a href="product_detail_page.html?id='+datainApi.response[n].product_id+'">'+datainApi.response[n].name+'</a></h4><p class="price">&#8377; &nbsp;'+datainApi.response[n].sell_price+'<span class="price-tax">&#8377; &nbsp;</span></p><div class="product_option "><div class="form-group required "><p style="float: left;">size : '+datainApi.response[n].size+'</p><p style="float: right;"> Discount '+Math.round(100-(datainApi.response[n].sell_price/datainApi.response[n].max_price * 100))+'%</p><br><p style="float: right;"> MRP &#8377;&nbsp;'+datainApi.response[n].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1" step="1" class="qty form-control"><button type="button" class="addtocart pull-right" id="cart'+i+'" onclick(this.id)>Add</button></div></div></div></div></div></div>';
    }
    document.getElementById('Random5relatedProduct').innerHTML = featureddiv;
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
//================= Search ===============
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
        else {
            location.replace("category_page.html?name="+searchdata[indexid]);
        }
    }
    else {
        alert("Item Not Found");
    }
}