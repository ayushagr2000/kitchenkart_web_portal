window.onload = function() {
    var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
    var getdata = data.name;
    console.log(getdata);
    GetApiCall(getdata);
}

function GetApiCall(getdata) {

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/product/getc/"+getdata;
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => CallingApi(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

}

function CallingApi(Api_data) {
    console.log(Api_data);
}