import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAbZ220sq2wBmoGXy5kyqIT8Cf9qt70Nvo",
    authDomain: "todo-list-e1377.firebaseapp.com",
    databaseURL: "https://todo-list-e1377-default-rtdb.firebaseio.com",
    projectId: "todo-list-e1377",
    storageBucket: "todo-list-e1377.appspot.com",
    messagingSenderId: "448764439155",
    appId: "1:448764439155:web:c4745143a720ee3bec1806"
  };

const initializedFirebaseApp = () => initializeApp(firebaseConfig);

export default initializedFirebaseApp;
