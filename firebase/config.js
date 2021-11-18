// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC84O1mF9Nod_uXC359mLrN6h3QBakbxhw",
	authDomain: "connectuva-dc5e4.firebaseapp.com",
	databaseURL: "https://connectuva-dc5e4-default-rtdb.firebaseio.com",
	projectId: "connectuva-dc5e4",
	storageBucket: "connectuva-dc5e4.appspot.com",
	messagingSenderId: "265060928859",
	appId: "1:265060928859:web:5f2c4d9383d1e91c175e7e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
