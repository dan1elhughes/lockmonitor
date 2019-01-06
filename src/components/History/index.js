import { h } from "hyperapp";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import Lock from "../Lock";

const History = ({ locks }) => (
	<div className="History">
		<ul>
			{locks.map(entry => (
				<li>
					<Lock locked={entry.locked} />
					{dayjs(entry.timestamp).fromNow()}
				</li>
			))}
		</ul>
	</div>
);

export default History;
