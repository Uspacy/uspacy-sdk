import { AxiosRequestConfig } from 'axios';

import { createHttpClient } from './helpers/httpClient';
import { Auth, Departments, FilesService, NewsFeed, Tasks, Users } from './services';

export * from './services';

/**
 * Create uspacy sdk instance
 * @param params config
 * @returns uspacy instance
 */
export default function ({ apiUrl, httpClientConfig }: UspacyConfig) {
	const httpClient = createHttpClient(apiUrl, httpClientConfig);
	return {
		httpClient,
		auth: new Auth(httpClient),
		users: new Users(httpClient),
		feed: new NewsFeed(httpClient),
		tasks: new Tasks(httpClient),
		dep: new Departments(httpClient),
		files: new FilesService(httpClient),
	};
}

export interface UspacyConfig {
	apiUrl: string;
	httpClientConfig?: AxiosRequestConfig;
}
