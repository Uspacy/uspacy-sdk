import { AxiosInstance } from 'axios';

import { ReponseLogin, UsersInstance } from './types';

export class Users implements UsersInstance {
	constructor(private httpClient: AxiosInstance) {
		this.httpClient.interceptors.request.use((config) => {
			return {
				...config,
				baseURL: `${config.baseURL}/company/v1`,
			};
		});
	}

	login(email: string, password: string, remember?: boolean) {
		return this.httpClient.post<ReponseLogin>(
			'/auth/signIn/',
			{
				email,
				password,
			},
			{
				params: {
					remember,
				},
			},
		);
	}

	list(page: number, list: number) {
		return this.httpClient.get<ReponseLogin>('/users', {
			params: {
				page,
				list,
			},
		});
	}
}

