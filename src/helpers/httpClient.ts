import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { logout } from './logout';
import { hasRemember, setRemember } from './remember';
import { getRefreshToken, getToken, setRefreshToken, setToken } from './token';

export interface ConfigHttpClient extends AxiosRequestConfig {
	logoutCallback?(): void;
}

export const createHttpClient = (baseURL: string, configHttpClient?: ConfigHttpClient): AxiosInstance => {
	const { logoutCallback, ...config } = configHttpClient || {};
	const httpClient = axios.create({
		...config,
		baseURL,
	});
	httpClient.interceptors.request.use((res) => {
		const token = getToken();
		res.headers['Authorization'] = token && `Bearer ${token}`;
		return res;
	});
	httpClient.interceptors.response.use(
		(response) => {
			if (response.config.url.includes('/auth/login')) {
				setToken(response.data.jwt);
				if (response.config.params.remember) {
					setRemember();
					setRefreshToken(response.data.refreshToken);
				}
			}
			return response;
		},
		async (error) => {
			try {
				const originalRequest = error.config;
				if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('auth/refreshToken')) {
					if (!hasRemember()) throw new Error('logout');
					originalRequest._retry = true;
					const refreshToken = getRefreshToken();
					const newToken = await httpClient.post('/api/auth/refreshToken', null, {
						headers: {
							...(refreshToken && {Authorization: `Bearer ${refreshToken}`}),
						},
					});
					originalRequest.headers['Authorization'] = `Bearer ${newToken.data.jwt}`;
					return httpClient(originalRequest);
				}
			} catch(_) {
				logout(logoutCallback);
				return Promise.reject(error);
			}
		}
	);
	return httpClient;
};
