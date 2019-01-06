import firebase from "./firebase";
import database from "./database";
import { h, app } from "hyperapp";
import createAccessor from "create-accessor";
import dayjs from "dayjs";
import auth from "./auth";
import createDerivedState from "./util/createDerivedState";

import BigLock from "./components/BigLock";
import Container from "./components/Container";
import History from "./components/History";
import Nav from "./components/Nav";

const initialState = {
	locks: [],
	devLocked: true,
	err: null,
};

const actions = {
	onFirebaseAuth: user => ({ user }),
	onSignout: () => firebase.auth().signOut(),

	onFirebaseUpdate: snapshot => ({
		locks: Object.entries(snapshot.val())
			.map(([id, val]) => ({ id, ...val }))
			.sort((a, b) => b.timestamp - a.timestamp),
	}),

	onFirebaseError: err => ({ err }),

	tick: () => state => ({
		devLocked: !state.devLocked,
	}),
};

const selectors = {
	isCurrentlyLocked: createAccessor("locks.0.locked"),
	myPhoto: createAccessor("user.photoURL"),
};

const view = (state, actions) => (
	<div>
		<Nav photoURL={state.myPhoto || ""} onSignout={actions.onSignout} />
		<Container>
			<BigLock locked={state.isCurrentlyLocked} />
			<History locks={state.locks} />
		</Container>
	</div>
);

const wrappedView = (state, actions) =>
	view({ ...state, ...createDerivedState(selectors, state) }, actions);

const instance = app(initialState, actions, wrappedView, document.body);

setInterval(instance.tick, 1000);

auth(instance.onFirebaseAuth);
database
	.ref("/locks")
	.on("value", instance.onFirebaseUpdate, instance.onFirebaseError);
