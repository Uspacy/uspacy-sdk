import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createHttpClient = (baseURL: string, config?: AxiosRequestConfig): AxiosInstance => {
	return axios.create({
		...config,
		baseURL,
	});
};
