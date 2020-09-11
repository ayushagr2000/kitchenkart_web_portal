window.onload = function() {
    popular_brand()
}
async function popular_brand() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/brand"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => brand(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

async function brand(data) {
    var data_json = JSON.parse(data);
    var branddiv = document.getElementById("Popular_brand_div").innerHTML;
    var k = "<div class='container'><div class='row'>";
    var banner = "";
    console.log(data_json.response[0].brand_name);
    console.log(data_json);

    for(var i = 0; i < data_json.response.length; i++) {
        k += "<div class='col-sm img-fluid' style='padding 5px; margin:5px;> <a href='#'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
        // banner += '<div class="item"><a href="#"><img src="images/01.jpg" alt="Main Banner" class="img-responsive" /></a></div>';
    }
    var branddiv = document.getElementById("Popular_brand_div").innerHTML = k + '</div></div>';
    // var Bannerdiv = document.getElementById('bannersection').innerHTML = banner;
}
