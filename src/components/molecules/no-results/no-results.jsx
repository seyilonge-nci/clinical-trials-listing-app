import React from 'react';

import { useStateValue } from '../../../store/store.js';

const NoResults = () => {
	const [{ noTrialsHtml }] = useStateValue();

	return (
		<div>
			<p>
				<strong>{noTrialsHtml}</strong>
			</p>
		</div>
	);
};

export default NoResults;
