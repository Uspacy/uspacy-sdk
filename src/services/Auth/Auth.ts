import { AxiosInstance } from 'axios';

/**
 * Auth service
 */
export class Auth {
	private namespace = '/company/v1';
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Login user by email and password
	 * @param email user email
	 * @param password user password
	 * @returns jwt tokens
	 */
	login(email: string, password: string) {
		return this.httpClient.post<ReponseJwt>(
			`${this.namespace}/auth/signIn/`,
			{
				email,
				password,
			},
		);
	}

	/**
	 * Refresh token
	 * @param refreshToken refresh token from login method
	 * @returns new jwt tokens
	 */
	refreshToken(refreshToken: string) {
		return this.httpClient.post<ReponseJwt>(
			`${this.namespace}/auth/signIn/`,
			null,
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
	}

	/**
	 * Confirm user email
	 * @param body email and token
	 * @returns new jwt tokens
	 */
	confirmEmail(body: { email: string, token: string }) {
		return this.httpClient.post<ReponseJwt>(
			`${this.namespace}/auth/signIn/`,
			body,
		);
	}
}

/**
 * Jwt data
 */
export interface ReponseJwt {
	jwt: string;
	refreshToken: string;
	/**
	 * time in seconds when token will be expired
	 */
	expiresInSeconds: number;
}
