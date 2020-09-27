window.onload = function() {
    console.log('00');
    userAction();
}
const userAction = async () => {
    console.log('=========');
    const response = await fetch('http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/cart/sub/10483', {
      method: 'POST',
      //body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    // do something with myJson
  }