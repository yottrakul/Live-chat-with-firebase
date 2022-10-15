import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyApcspVsadXYqcYBDjqjwyY2JfzZspKnes",
  authDomain: "udemy-vue-firebase-site-eeeb0.firebaseapp.com",
  projectId: "udemy-vue-firebase-site-eeeb0",
  storageBucket: "udemy-vue-firebase-site-eeeb0.appspot.com",
  messagingSenderId: "666625123196",
  appId: "1:666625123196:web:8b160a7c9247859498faf9"
};

//Init firebase
firebase.initializeApp(firebaseConfig);

// Init auth
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectAuth, projectFirestore, timestamp }