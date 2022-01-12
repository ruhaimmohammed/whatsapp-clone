// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCfw8SCT9VM6bQqK8OaP3_jw5t61ieKr9k",
  authDomain: "whatsapp-clone-b3433.firebaseapp.com",
  projectId: "whatsapp-clone-b3433",
  storageBucket: "whatsapp-clone-b3433.appspot.com",
  messagingSenderId: "381363679843",
  appId: "1:381363679843:web:2a8f3ef6b8e4c6e1987e56",
  measurementId: "G-8416XWY9CR"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;