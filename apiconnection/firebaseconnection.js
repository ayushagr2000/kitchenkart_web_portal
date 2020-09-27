var app_firebase = {};
(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyC71v9v_cjBqO6f39JSGFvU4abI4UrhspI",
    authDomain: "kitchenkart-3b889.firebaseapp.com",
    databaseURL: "https://kitchenkart-3b889.firebaseio.com",
    projectId: "kitchenkart-3b889",
    storageBucket: "kitchenkart-3b889.appspot.com",
    messagingSenderId: "499113722476",
    appId: "1:499113722476:web:21ca3899a12582aa6d0e49",
    measurementId: "G-QTLHQ9Z0Q9"
  };

  firebase.initializeApp(firebaseConfig);
  app_firebase = firebase;
})()
