window.onload = function() {
    popular_brand()
    Banner_ApiCall();
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
        k += "<div class='rounded col-sm img-fluid' style='padding: 35px; margin:5px;'> <a href='#'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
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