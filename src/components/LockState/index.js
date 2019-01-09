import { h } from "hyperapp";
import "./styles.scss";

const LockState = (props, children) => (
	<h2 className="LockState">{children}</h2>
);

export default LockState;
