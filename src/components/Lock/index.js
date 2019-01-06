import { h } from "hyperapp";

import "./styles.scss";

const Lock = ({ locked }) => (
	<span className="material-icons">{locked ? "lock" : "lock_open"}</span>
);

export default Lock;
