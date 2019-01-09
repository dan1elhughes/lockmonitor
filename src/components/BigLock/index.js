import { h } from "hyperapp";

import "./styles.scss";

const BigLock = ({ locked, onclick }) => (
	<div className="BigLock" onclick={onclick}>
		<div className={`circle ${locked ? "" : "un"}locked`}>
			<div className="bar" />
		</div>
	</div>
);

export default BigLock;
