window.onload = function() {
    GetUserId();
    popular_brand();
    BasketData();
    GetAllProductData();
    try {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        console.log(data.order);
        displayorder(data.order);
        displayorderItems(data.order);
    } catch (e) {
        window.location.replace("index.html");
    }
}
//========================= Display Data =====================
async function displayorder(data) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/id/"+data;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printorder(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function printorder(details){
    details = JSON.parse(details);
    document.getElementById('orderid_date').innerHTML = '<b>Order ID:</b> #'+details.response[0].order_id+'<br><b>Date Added:</b>'+details.response[0].order_date;
    document.getElementById('shipp_payment').innerHTML = ' <b>Payment Method:</b> '+details.response[0].mode_of_payment+'<br><b>Shipping Charge:&nbsp;</b>&#8377;'+details.response[0].delivery_charge;
    document.getElementById('order_shipping').innerHTML = details.response[0].add1+'<br>'+details.response[0].add2+'<br>'+details.response[0].landmark+'<br>'+details.response[0].pincode+'<br>'+details.response[0].mobile_number;
    document.getElementById('order_payment').innerHTML = details.response[0].add1+'<br>'+details.response[0].add2+'<br>'+details.response[0].landmark+'<br>'+details.response[0].pincode+'<br>'+details.response[0].mobile_number;
    
}
//============================================================

//==================Order Table ================================
async function displayorderItems(id){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/items/"+id;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => ordertable(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function ordertable(order) {
    Jsonorder = JSON.parse(order);
    console.log(Jsonorder.response.length);
    var k = '';
    var tot = 0;
    for(var i = 0; i < Jsonorder.response.length; i++) {
        tot += Jsonorder.response[i].prod_qty * Jsonorder.response[i].prod_price;
        k += '<tr><td class="text-left">'+Jsonorder.response[i].prod_name+'<br>&nbsp;<small> - Packet Size: '+Jsonorder.response[i].size+'</small> </td><td class="text-left">'+Jsonorder.response[i].prod_qty+'</td><td class="text-right">&#8377;'+Jsonorder.response[i].prod_price+'</td><td class="text-right">&#8377;'+(Jsonorder.response[i].prod_qty * Jsonorder.response[i].prod_price)+'</td><td class="text-right" style="white-space: nowrap;"> <a href="#" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Reorder"><i class="fa fa-shopping-cart"></i></a> <a href="#" data-toggle="tooltip" title="" class="btn btn-danger" data-original-title="Return"><i class="fa fa-reply"></i></a></td></tr>';
    }
    document.getElementById('productdetails').innerHTML = k;
    document.getElementById('subtot').innerHTML = '&#8377; '+tot;
    document.getElementById('shippingcharge').innerHTML = '&#8377; '+30;
    document.getElementById('total').innerHTML = '&#8377; '+ (tot+30);
}
//==============================================================