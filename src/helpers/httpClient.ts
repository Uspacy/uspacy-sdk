import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 *
 * @param baseURL
 * @param config
 * @returns
 */
export const createHttpClient = (baseURL: string, config?: AxiosRequestConfig): AxiosInstance => {
	return axios.create({
		...config,
		baseURL,
	});
};
