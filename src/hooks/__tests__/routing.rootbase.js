import { useAppPaths } from '../routing';

import { useStateValue } from '../../store/store.js';
jest.mock('../../store/store.js');

describe('when base path is slash', () => {
	useStateValue.mockReturnValue([
		{
			basePath: '/',
		},
	]);

	it('will replace paths with params', () => {
		const { PurlPath } = useAppPaths();
		expect(PurlPath({purl: 'my-pretty-url'})).toEqual('/my-pretty-url');
	});
});
