import { createHttpClient } from './helpers/httpClient';
import { Users } from './services';
import { UspacyConfig, UspacyInstance } from './types';

export default function({ apiUrl, httpClientConfig }: UspacyConfig): UspacyInstance {
	const httpClient = createHttpClient(apiUrl, httpClientConfig);
	return {
		httpClient,
		users: new Users(httpClient),
	};
}
