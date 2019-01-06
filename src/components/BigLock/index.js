import { h } from "hyperapp";

import "./styles.scss";

const getLockPhrase = locked => (locked ? "closed" : "open");

const BigLock = ({ locked }) => (
	<div className={`BigLock ${getLockPhrase(locked)}`}>
		<div className="circle">
			<span className="material-icons closed">lock</span>
			<span className="material-icons open">lock_open</span>
		</div>
	</div>
);

export default BigLock;
