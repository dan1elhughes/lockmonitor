import firebase from "./firebase";

export default async onAuth => {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			console.log(user.uid);
			return onAuth(user);
		}
		const provider = new firebase.auth.GoogleAuthProvider();
		return firebase.auth().signInWithRedirect(provider);
	});
};
