import { AxiosInstance } from 'axios';

/**
 * Auth service
 */
export class Auth {
	private namespace = '/company/v1/auth';
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Login user by email and password
	 * @param email user email
	 * @param password user password
	 * @returns jwt tokens
	 */
	login(email: string, password: string) {
		return this.httpClient.post<ReponseJwt>(`${this.namespace}/signIn/`, {
			email,
			password,
		});
	}

	/**
	 * Confirm user email
	 * @param body email and token
	 * @returns new jwt tokens
	 */
	confirmEmail(body: { email: string; token: string }) {
		return this.httpClient.post<ReponseJwt>(
			`${this.namespace}/confirmToken/`,
			body,
		);
	}

	/**
	 * Refresh token
	 * @param refreshToken refresh token from login method
	 * @returns new jwt tokens
	 */
	refreshToken(refreshToken: string) {
		return this.httpClient.post<ReponseJwt>(
			`${this.namespace}/refreshToken/`,
			null,
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
	}

	/**
	 * Create user by invitation
	 * @param email email
	 * @param password password
	 * @param firstName firstName
	 * @param lastName lastName
	 * @returns new jwt tokens
	 */
	createUserByInvite(body: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}) {
		return this.httpClient.post<ReponseJwt>(
			`${this.namespace}/register/`,
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
