import firebase from "./firebase";
import database from "./database";
import { h, app } from "hyperapp";
import createAccessor from "create-accessor";
import dayjs from "dayjs";
import auth from "./auth";
import createDerivedState from "./util/createDerivedState";

import BigLock from "./components/BigLock";
import Button from "./components/Button";
import Container from "./components/Container";
import History from "./components/History";
import LockInfo from "./components/LockInfo";
import Nav from "./components/Nav";
import Row from "./components/Row";

const initialState = {
	locks: [],
	err: null,
};

const randomDateBetween = (start, end) =>
	new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

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
		locks: Object.entries(snapshot.val() || {})
			.map(([id, val]) => ({ id, ...val }))
			.sort((a, b) => b.timestamp - a.timestamp),
	}),

	onFirebaseError: err => ({ err }),

	onCreateSampleData: () => {
		database.ref("locks").push(createNewData());
	},
};

const selectors = {
	last: state => createAccessor("locks.0", state) || {},
	myPhoto: createAccessor("user.photoURL"),
};

const view = (state, actions) => (
	<div>
		<Container>
			<Row>{state.locks.length} locks</Row>
			<Row>
				<BigLock locked={state.last.locked} onclick={actions.onToggleDevLock} />
			</Row>
			<Row>
				<LockInfo locked={state.last.locked} timestamp={state.last.timestamp} />
			</Row>
			<Row>
				<Button onclick={actions.onCreateSampleData}>Add sample data</Button>
			</Row>
			<Row>
				<pre>
					<code>{JSON.stringify(state, null, 4)}</code>
				</pre>
			</Row>
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
