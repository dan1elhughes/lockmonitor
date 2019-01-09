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
import LockName from "./components/LockName";
import LockState from "./components/LockState";
import Row from "./components/Row";

const initialState = {
	locks: [],
	devLocked: true,
	err: null,
};

function randomDateBetween(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

const createNewData = () => {
	const today = new Date();
	const aWeekAgo = new Date(Date.now() - 24 * 3600 * 7000);

	const timestamp = +randomDateBetween(aWeekAgo, today);

	const locked = Math.random() >= 0.5;

	return {
		timestamp,
		locked,
	};
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

	onToggleDevLock: () => state => ({
		devLocked: !state.devLocked,
	}),

	onCreateSampledata: () => database.ref("locks").push(createNewData()),
};

const selectors = {
	isCurrentlyLocked: createAccessor("locks.0.locked"),
	myPhoto: createAccessor("user.photoURL"),
};

const view = (state, actions) => (
	<div>
		<Container>
			<Row>
				<BigLock locked={state.devLocked} onclick={actions.onToggleDevLock} />
			</Row>
			<Row>
				<LockName>Front door</LockName>
				<LockState>{state.devLocked ? "Locked" : "Unlocked"}</LockState>
			</Row>
			<History locks={state.locks} />
			<button onclick={actions.onCreateSampledata}>Add sample data</button>
		</Container>
	</div>
);

const wrappedView = (state, actions) =>
	view({ ...state, ...createDerivedState(selectors, state) }, actions);

const instance = app(initialState, actions, wrappedView, document.body);

auth(instance.onFirebaseAuth);
database
	.ref("/locks")
	.on("value", instance.onFirebaseUpdate, instance.onFirebaseError);
