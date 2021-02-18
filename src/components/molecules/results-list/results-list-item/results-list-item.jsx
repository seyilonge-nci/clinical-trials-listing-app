import PropTypes from 'prop-types';
import React from 'react';

import { useStateValue } from '../../../../store/store';

const ResultsListItem = ({ nciId, locationText, summary, title }) => {
	const [{ resultsItemTitleLink }] = useStateValue();
	return (
		<div className="result-list-item">
			<dt>
				<dfn>
					<a href={`${resultsItemTitleLink}?id=${nciId}`}>
						{title}
					</a>
				</dfn>
			</dt>
			<dd>{summary}</dd>
			<dd>
				<strong>Location: </strong>
				{locationText}
			</dd>
		</div>
	);
};

ResultsListItem.propTypes = {
	nciId: PropTypes.string.isRequired,
	locationText: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default ResultsListItem;
