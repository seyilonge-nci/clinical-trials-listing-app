import PropTypes from 'prop-types';
import React from 'react';

import { getLocationInfoFromSites } from '../../../utils';

import ResultsListItem from './results-list-item';

const ResultsList = ({ results }) => {
	return (
		<>
			<hr />
			<dl>
				{results.map((resultItem, index) => {
					const {
						brief_summary,
						brief_title,
						current_trial_status,
						nci_id,
						nct_id,
						sites,
					} = resultItem;
					const locationInfo = getLocationInfoFromSites(
						current_trial_status,
						nct_id,
						sites
					);

					return (
						<ResultsListItem
							key={index}
							nciId={nci_id}
							summary={brief_summary}
							title={brief_title}
							locationText={locationInfo}
						/>
					);
				})}
			</dl>
		</>
	);
};

ResultsList.propTypes = {
	results: PropTypes.array.isRequired,
};

export default ResultsList;
