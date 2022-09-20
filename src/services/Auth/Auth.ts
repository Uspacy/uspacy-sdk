import { AxiosInstance } from 'axios';

import { AuthInstance, ReponseLogin } from './types';

export class Auth implements AuthInstance {
	private namespace = '/company/v1';
	constructor(private httpClient: AxiosInstance) {}

	login(email: string, password: string) {
		return this.httpClient.post<ReponseLogin>(
			`${this.namespace}/auth/signIn/`,
			{
				email,
				password,
			},
		);
	}

	refreshToken(refreshToken: string) {
		return this.httpClient.post<ReponseLogin>(
			`${this.namespace}/auth/signIn/`,
			null,
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
	}

	confirmEmail(body: { email: string, token: string }) {
		return this.httpClient.post<ReponseLogin>(
			`${this.namespace}/auth/signIn/`,
			body,
		);
	}
}

