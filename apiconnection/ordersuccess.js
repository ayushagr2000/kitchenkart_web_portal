window.onload = function() {
    try {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        console.log(data.order);
        if(data.order){
            console.log('asdasd');
        }
        else console.log('zxc');
    } catch (e) {
        
    }
}