import { AxiosRequestConfig } from 'axios';

import { createHttpClient } from './helpers/httpClient';
import { Auth, Users } from './services';

export * from './services';

/**
 * Create uspacy sdk instance
 * @param params config
 * @returns uspacy instance
 */
export default function({ apiUrl, httpClientConfig }: UspacyConfig) {
	const httpClient = createHttpClient(apiUrl, httpClientConfig);
	return {
		httpClient,
		auth: new Auth(httpClient),
		users: new Users(httpClient),
	};
}

export interface UspacyConfig {
	apiUrl: string;
	httpClientConfig?: AxiosRequestConfig;
}
