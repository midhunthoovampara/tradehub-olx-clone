import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBWJhhgQ84BoI852MClnbXzHr6zPoAS8sk",
  authDomain: "olx-clone-88c66.firebaseapp.com",
  projectId: "olx-clone-88c66",
  storageBucket: "olx-clone-88c66.firebasestorage.app",
  messagingSenderId: "1042793599200",
  appId: "1:1042793599200:web:21e67432b761b9cae1c085",
  measurementId: "G-5VK104HGGG"
};

export default firebase.initializeApp(firebaseConfig)