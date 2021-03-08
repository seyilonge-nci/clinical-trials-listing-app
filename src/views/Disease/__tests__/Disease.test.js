import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import nock from 'nock';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { MemoryRouter } from 'react-router-dom';

import Disease from '../Disease';
import { buildAxiosRequest } from '../../../services/api/common/buildAxiosRequest';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';
import {
	getAxiosClient,
	replacingRequestInterceptor,
} from '../../../services/api/common';
import { cleanURI } from '../../../utils';

jest.mock('../../../store/store.js');

describe('<Disease />', () => {
	axios.defaults.adapter = require('axios/lib/adapters/http');
	const axiosInstance = axios.create({
		timeout: 10000,
	});
	const options = {
		headers: { 'content-type': 'application/json; charset=utf-8' },
		signal: {
			onabort: jest.fn(),
		},
	};

	beforeAll(() => {
		nock.disableNetConnect();
	});

	afterAll(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	test('should render <NoResults /> component',  () => {
		const basePath = '/';
		const canonicalHost = 'https://www.cancer.gov';
		const baseURL = 'http://localhost';
		const listingApiEndpoint = `${baseURL}/triallistingsupport/v1`;
		const trialsApiEndpoint = `${baseURL}/v1`;
		const listingScope = nock(listingApiEndpoint);
		const trialScope = nock(trialsApiEndpoint);

		listingScope
			.persist()
			.log(console.log)
			.get('/listing-information/get?ccode=C4872')
			.reply(200, {
				conceptId: ['C4872'],
				name: {
					label: 'Breast Cancer',
					normalized: 'breast cancer',
				},
				prettyUrlName: 'breast-cancer',
			});
		return buildAxiosRequest(axiosInstance)(
			`${listingApiEndpoint}/listing-information/get?ccode=C4872`,
			options
		).then((actual) => {
			const { status } = actual;
			expect(status).toEqual(200);
			listingScope.done();

			trialScope
				.persist()
				.log(console.log)
				.post('/clinical-trials', {
					current_trial_status: [
						'Active',
						'Approved',
						'Enrolling by Invitation',
						'In Review',
						'Temporarily Closed to Accrual',
						'Temporarily Closed to Accrual and Intervention',
					],
					'diseases.nci_thesaurus_concept_id': ['C7251'],
				})
				.reply(200, {
					total: 0,
					trials: [],
				});
			return buildAxiosRequest(axiosInstance)(
				`${trialsApiEndpoint}/clinical-trials`,
				{
					...options,
					method: 'POST',
					body: {
						current_trial_status: [
							'Active',
							'Approved',
							'Enrolling by Invitation',
							'In Review',
							'Temporarily Closed to Accrual',
							'Temporarily Closed to Accrual and Intervention',
						],
						'diseases.nci_thesaurus_concept_id': ['C7251'],
					},
				}
			).then( async (actual) => {
				const { status } = actual;
				expect(status).toEqual(200);
				trialScope.done();

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
						listingApiEndpoint,
						noTrialsHtml,
						pageTitle,
						title,
						trialsApiEndpoint,
						trialListingPageType,
					},
				]);

				// Setup requestInterceptors for RTL client.
				const requestInterceptors = [
					replacingRequestInterceptor('clinical-trials-api', {
						API_HOST: cleanURI(trialsApiEndpoint),
					}),
					replacingRequestInterceptor('listing-information-api', {
						API_HOST: cleanURI(listingApiEndpoint),
					}),
				];

				await act(async () => {
					render(
						<MockAnalyticsProvider>
							<MemoryRouter initialEntries={['/C4872?cfg=0']}>
								<ClientContextProvider
									client={getAxiosClient(requestInterceptors)}>
									<Disease />
								</ClientContextProvider>
							</MemoryRouter>
						</MockAnalyticsProvider>
					);
				});
				screen.debug();
				expect(screen.getByText('Disease Listing Page')).toBeInTheDocument();
				expect(
					screen.getByText('There are currently no available trials.')
				).toBeInTheDocument();
			});
		});
	});
});
