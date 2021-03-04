let LISTING_API_ENDPOINT;
let TRIALS_API_ENDPOINT;

function cleanURI(uri) {
	return uri.replace(/\/$/, '');
}

/**
 * Sets the Listing Information API endpoint
 *
 * @param {string} endpoint - Listing Information API endpoint
 * @return void
 */
export function setListingAPIEndpoint(endpoint) {
	LISTING_API_ENDPOINT = cleanURI(endpoint);
}

/**
 * Sets the Clinical Trials API endpoint
 *
 * @param {string} endpoint - Clinical Trials API endpoint
 * @return void
 */
export function setTrialsAPIEndpoint(endpoint) {
	TRIALS_API_ENDPOINT = cleanURI(endpoint);
}

/**
 * Sets and returns defined API endpoint URL based on service name passed in
 *
 * @param {string} serviceName - Given name of defined API service endpoint
 * @return {string} endpoint - Endpoint URL
 */
export const getEndpoint = (serviceName) => {
	// Define api endpoints here
	const endpoints = {
		clinicalTrials: `${TRIALS_API_ENDPOINT}/clinical-trials`,
		getById: `${LISTING_API_ENDPOINT}/listing-information/get`,
		getByName: `${LISTING_API_ENDPOINT}/listing-information`
	};
	return endpoints[serviceName];
};
