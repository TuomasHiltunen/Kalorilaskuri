  import * as firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  
  
  var firebaseConfig = {
      apiKey: "AIzaSyDthPkDuV2tB-hDuCF6nSbSaX0mdNWy5kU",
      authDomain: "kalorilaskuri-9a8f9.firebaseapp.com",
      databaseURL: "https://kalorilaskuri-9a8f9.firebaseio.com",
      projectId: "kalorilaskuri-9a8f9",
      storageBucket: "kalorilaskuri-9a8f9.appspot.com",
      messagingSenderId: "523955860197",
      appId: "1:523955860197:web:2b8a98219460b6d2dd5a0c"
  };

  firebase.initializeApp(firebaseConfig); // alustaa yhteyden firebaseen configin tiedoilla

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;