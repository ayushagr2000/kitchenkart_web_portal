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
    var bannercount = '<div class="carousel-item active"><img class="d-block w-100" src="'+data_json.response[0].brand_img+'" style="height: 350px;"><a class="carousel-control-prev" style="width: 100%;"></a></div>'; 
    var BannerImage = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active" style="background-color: red;"></li>';
    var k = "<div class='container'><div class='row'>";
    console.log(data_json.response[0].brand_name);
    console.log(data_json);

    for(var i = 0; i < data_json.response.length; i++) {
       console.log(i);
       k += "<div class='border border-danger rounded col-sm img-fluid' style='padding: 5px; margin:5px;'> <a href='#'><img src='"+data_json.response[i].brand_img+"'alt='"+data_json.response[i].brand_name+"' style='margin: auto;'/></a> </div>";
       if((i+1) % 5 == 0){
           k += "</div></div><div class='container' style><div class='row'>";
       }
        if(i != 0) {
            BannerImage += '<li data-target="#carouselExampleIndicators" data-slide-to="'+(i)+'"style="background-color: red;"></li>';
            bannercount+= '<div class="carousel-item "><img class="d-block w-100" src="'+data_json.response[i].brand_img+'" style="height: 350px;"><a class="carousel-control-prev" style="width: 45%;"></a></div>';
        }
    }
   
    document.getElementById("Popular_brand_div").innerHTML = k + '</div></div>';
    document.getElementById('BannerImage').innerHTML = bannercount;
    document.getElementById('BannerCount').innerHTML = BannerImage;
}
