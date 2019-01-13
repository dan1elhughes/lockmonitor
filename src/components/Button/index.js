import { h } from "hyperapp";
import "./styles.scss";

const Button = (props, children) => (
	<button className="Button" {...props}>
		{children}
	</button>
);

export default Button;
