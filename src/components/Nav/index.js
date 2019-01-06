import { h } from "hyperapp";
import "./styles.scss";

const Nav = ({ photoURL, onSignout }) => (
	<div className="Nav">
		<img src={photoURL} />
		<button onclick={onSignout}>Sign out</button>
	</div>
);

export default Nav;
