
import { ConfigHttpClient } from './helpers/httpClient';
import { UsersInstance } from './services/Users';

export interface UspacyConfig {
	apiUrl: string;
	httpClientConfig?: ConfigHttpClient;
}

export interface UspacyInstance {
	httpClient: AxiosInstance;
	users: UsersInstance;
}
