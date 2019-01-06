import firebase from "firebase";

const config = {
	apiKey: "AIzaSyAPXXN_xTWkhJHWOmuKhfPjXJl-UYQH3SY",
	authDomain: "lockmonitor-42f72.firebaseapp.com",
	databaseURL: "https://lockmonitor-42f72.firebaseio.com",
	projectId: "lockmonitor-42f72",
	storageBucket: "lockmonitor-42f72.appspot.com",
	messagingSenderId: "761705591149"
};

firebase.initializeApp(config);

export default firebase;
