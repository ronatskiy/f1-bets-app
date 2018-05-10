import React from "react";

const TableHeader = ({ hasRaceResults }) => (
	<thead className="thead-light">
		<tr className="text-uppercase">
			<th>Пользователь</th>
			<th className="text-center">1</th>
			<th className="text-center">2</th>
			<th className="text-center">3</th>
			<th className="text-center">4</th>
			<th className="text-center">5</th>
			<th className="text-center">6</th>
			<th className="text-center">7</th>
			<th className="text-center">8</th>
			<th className="text-center">9</th>
			<th className="text-center">10</th>
			{hasRaceResults && <th className="text-center">PTS</th>}
		</tr>
	</thead>
);

export default TableHeader;
