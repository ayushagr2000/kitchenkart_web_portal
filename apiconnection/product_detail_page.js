window.onload = function() {
    var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    getProductApi(data.id);
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
    document.getElementById('product_Price').innerHTML = '&#8377; &nbsp'+singledata.response[0].sell_price;
    document.getElementById('product_Brand').innerHTML = singledata.response[0].brand;
    document.getElementById('product_Brand').href = 'http://localhost/kitchenkart_web_portal-master/kitchenkart_web_portal/category_page.html?name=brand-name&id='+singledata.response[0].brand;
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
    for(var i = 0; i < 5; i++){
        var n = Math.floor(Math.random() * datainApi.response.length); 
        featureddiv += '<div class="product-items col-6 col-sm-4 col-md-4 col-lg-3" style="height:400px;"><div class="product-thumb transition"><div class="image"><div class="first_image"> <a href="product_detail_page.html"> <img src="'+datainApi.response[n].img+'" style="height:200px; width:200px;" alt="'+datainApi.response[n].name+'" title="'+datainApi.response[n].name+'" class="img-responsive"> </a> </div><div class="swap_image"> <a href="product_detail_page.html"> </a></div></div><div class="product-details"  style="height:180px;"><div class="caption"><h4><a href="product_detail_page.html">'+datainApi.response[n].name+'</a></h4><p class="price">&#8377; &nbsp;'+datainApi.response[n].sell_price+'<span class="price-tax">&#8377; &nbsp;</span></p><div class="product_option "><div class="form-group required "><p style="float: left;">size : '+datainApi.response[n].size+'</p><p style="float: right;"> Discount '+Math.round(100-(datainApi.response[n].sell_price/datainApi.response[n].max_price * 100))+'%</p><br><p style="float: right;"> MRP &#8377;&nbsp;'+datainApi.response[n].max_price+'</p></div><div class="input-group button-group"><label class="control-label">Qty</label><input type="number" id="qty'+i+'" name="quantity" min="1" value="1" step="1" class="qty form-control"><button type="button" class="addtocart pull-right" id="cart'+i+'" onclick(this.id)>Add</button></div></div></div></div></div></div>';
    }
    document.getElementById('Random5relatedProduct').innerHTML = featureddiv;
}