window.onload = function() {
    popular_brand();
    BasketData();
    GetUserId();
    GetAllProductData();
    console.log(User);
    try {
        displayorderHistory();
    } catch (e) {
        //window.location.replace("login.html");
    }
}
//========================= Display Data =====================
async function displayorderHistory() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/customer/UuoPi3EAUyMNfWnRBlTq2Mx9RaI2";//+data;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => printorderHistory(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function printorderHistory(order) {
    Jsonorder = JSON.parse(order);
    var k = '';
    var tot = 0;
    for(var i = 0; i < Jsonorder.response.length; i++) {
        tot += Jsonorder.response[i].prod_qty * Jsonorder.response[i].prod_price;
        k += '<tr><td class="text-right">#'+Jsonorder.response[i].order_id+'</td><td class="text-left">'+Jsonorder.response[i].customer_name+'</td><td class="text-right">'+Jsonorder.response[i].total_items+'</td><td class="text-left">'+Jsonorder.response[i].status_of_order+'</td><td class="text-right">&#8377;&nbsp;'+Jsonorder.response[i].total_amount+'</td><td class="text-left">'+Jsonorder.response[i].order_date+'</td><td class="text-right"><a href="order-history-detail.html?order='+Jsonorder.response[i].order_id+'" data-toggle="tooltip" title="" class="btn btn-info" data-original-title="View"><i class="fa fa-eye"></i></a></td></tr>';
    }
    document.getElementById('Order-history-tborder').innerHTML = k;
}

//==============================================================