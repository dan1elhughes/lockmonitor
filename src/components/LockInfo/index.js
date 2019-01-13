import { h } from "hyperapp";
import "./styles.scss";

import dayjs from "dayjs";

const LockInfo = ({ locked, timestamp }) => (
	<div className="LockInfo">
		<h2>{locked ? "Locked" : "Unlocked"}</h2>
		<h3>{dayjs(timestamp).format("dddd [at] HH:mm")}</h3>
	</div>
);

export default LockInfo;
