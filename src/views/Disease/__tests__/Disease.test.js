import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { MemoryRouter } from 'react-router-dom';

import Disease from '../Disease';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store.js');

describe('<Disease />', () => {
test('should render <NoResults /> component', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.cancer.gov';
		const data = {
			conceptId: ["C4872"],
				name: {
					label: 'Breast Cancer',
					normalized: 'breast cancer'
				},
				prettyUrlName: 'breast-cancer',
		};
		const introText = 'Intro text';
		const noTrialsHtml = 'There are currently no available trials.';
		const pageTitle = 'Disease Listing Page';
		const title = 'NCI Clinical Trials';
		const trialListingPageType = 'Disease';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				introText,
				noTrialsHtml,
				pageTitle,
				title,
				trialListingPageType,
			},
		]);

		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: {
					total: 0,
					trials: [],
				},
			}),
		};

		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<MemoryRouter initialEntries={['/C4872?cfg=0']}>
						<ClientContextProvider client={client}>
							<Disease listingInfo={data}/>
						</ClientContextProvider>
					</MemoryRouter>
				</MockAnalyticsProvider>
			);
		});

		expect(screen.getByText('Disease Listing Page')).toBeInTheDocument();
		expect(
			screen.getByText('There are currently no available trials.')
		).toBeInTheDocument();
	});
});
