var User = "UuoPi3EAUyMNfWnRBlTq2Mx9RaI2";
var CartApi = "";
// ======================== Add To Kart ===================================

async function AddCartfunction(addcart, id) {
    qua = document.getElementById('qty'+id).value;
    console.log(qua)
    console.log(addcart);
    var k = document.getElementById('Logindiv_firebase').style.display;
    //if(k === 'block') {
      //  location.replace("login.html");
    //} else {
        CartAddApi(addcart, qua);
    //}
}

async function CartAddApi(productdata, Quandity) {
    console.log(productdata);
    console.log(Quandity);
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
           console.log(productdata);
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
    var Jsondata = JSON.parse(Data);
    CartApi = Data;
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