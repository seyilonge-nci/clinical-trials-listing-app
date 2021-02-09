import { useAppPaths } from '../routing';

import { useStateValue } from '../../store/store.js';
jest.mock('../../store/store.js');

describe('when base path has trailing slash', () => {
	useStateValue.mockReturnValue([
		{
			basePath: '/',
		},
	]);

	it('will replace paths with params', () => {
		const { PurlPath } = useAppPaths();
		expect(PurlPath({purl: 'my-pretty-url'})).not.toEqual('/my-pretty-url/');
	});
});
