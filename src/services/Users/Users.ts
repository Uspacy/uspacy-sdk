import { AxiosInstance } from 'axios';

/**
 * Users service
 */
export class Users {
	private namespace = '/company/v1';

	private routeAceessName = {
		usersServiceBaseURL: `${this.namespace}/users`,
		getUsersURL: (): string =>
			`${this.routeAceessName.usersServiceBaseURL}`,
		userByIDURL: (userId: number): string =>
			`${this.routeAceessName.usersServiceBaseURL}/${userId}`,
		userDeactivateURL: (userId: number): string =>
			`${this.routeAceessName.userByIDURL(userId)}/deactivate/`,
		userActivateURL: (userId: number): string =>
			`${this.routeAceessName.userByIDURL(userId)}/activate/`,
		userUpdateRolesURL: (userId: number): string =>
			`${this.routeAceessName.userByIDURL(userId)}/updateRoles/`,
		userUpdatePositionURL: (userId: number): string =>
			`${this.routeAceessName.userByIDURL(userId)}/updatePosition/`,
		userUpdatePasswordURL: (userId: number): string =>
			`${this.routeAceessName.userByIDURL(userId)}/changePassword/`,
		getSelfProfileURL: (): string =>
			`${this.routeAceessName.getUsersURL()}/me/`,
		updateSelfPasswordURL: (): string =>
			`${this.routeAceessName.getSelfProfileURL()}changePassword/`,
		forgotPasswordURL: (): string =>
			`${this.routeAceessName.getUsersURL()}/forgotPassword/`,
		resetPasswordURL: (): string =>
			`${this.routeAceessName.getUsersURL()}/resetPassword/`,
		searchURL: (
			email: string,
			firstName: string,
			lastName: string,
		): string =>
			`${this.routeAceessName.getUsersURL()}/search/?email=${email}&firstName=${firstName}&LastName=${lastName}`,
	};

	/**
	 * @param config http client
	 */
	constructor(private httpClient: AxiosInstance) {}

	/**
	 * Get users list
	 * @param page page number
	 * @param list elements count
	 * @returns Array users entity
	 */
	list(page: number, list: number) {
		return this.httpClient.get<User[]>(
			`${this.routeAceessName.getUsersURL()}`,
			{
				params: {
					page,
					list,
				},
			},
		);
	}

	/**
	 * Get user by id
	 * @param id user id
	 * @returns user entity
	 */
	getById(id: number) {
		return this.httpClient.get<User>(
			`${this.routeAceessName.userByIDURL(id)}`,
		);
	}

	/**
	 * Sign up user by firstName, lastName, email, password.
	 * @param email user email
	 * @param password user password
	 * @param firstName	user firstName
	 * @param lastName user lastName
	 * @returns created user
	 */
	createUser(
		email: string,
		password: string,
		firstName: string,
		lastName: string,
	) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.getUsersURL()}`,
			{
				email,
				password,
				firstName,
				lastName,
			},
		);
	}

	/**
	 * Update user data by id.
	 * @param id user id
	 * @param config user info (interface)
	 * @returns updated user
	 */

	updateUser(id: number, config: updateUser) {
		return this.httpClient.patch<User>(
			`${this.routeAceessName.userByIDURL(id)}`,
			config,
		);
	}

	/**
	 * Deactivate user by id
	 * @param id user id
	 * @returns user data with active: false
	 */
	deactvateUser(id: number) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.userDeactivateURL(id)}`,
		);
	}

	/**
	 * Activate user by id.
	 * @param id user id
	 * @returns user data with active: true
	 */
	activateUser(id: number) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.userActivateURL(id)}`,
		);
	}

	/**
	 * Update user roles by id.
	 * @param id user id
	 * @returns user data with new roles
	 */
	updateRoles(id: number, roles: UserRole[]) {
		return this.httpClient.patch<User>(
			`${this.routeAceessName.userUpdateRolesURL(id)}`,
			{ roles },
		);
	}

	/**
	 * Update user position by id
	 * @param id user id
	 * @param position user position
	 * @returns user data with new position
	 */
	updatePosition(id: number, position: updatePosition) {
		return this.httpClient.patch<User>(
			`${this.routeAceessName.userUpdatePositionURL(id)}`,
			{
				position,
			},
		);
	}

	/**
	 * Update user password by id
	 * @param id user id
	 * @param password user password
	 * @returns
	 */
	updatePassword(id: number, password: string) {
		return this.httpClient.patch<User>(
			`${this.routeAceessName.userUpdatePasswordURL(id)}`,
			{
				password,
			},
		);
	}

	/**
	 * Get self profile
	 * @returns user profile data
	 */
	getSelfProfile() {
		return this.httpClient.get<User>(
			`${this.routeAceessName.getSelfProfileURL()}`,
		);
	}

	/**
	 * Update self password.
	 * @param oldPassword user old password
	 * @param newPassword user new password
	 * @returns
	 */
	updateSelfPassword(
		password: string,
		oldPassword: string,
		newPassword: string,
	) {
		return this.httpClient.patch<User>(
			`${this.routeAceessName.updateSelfPasswordURL()}`,
			{
				oldPassword,
				newPassword,
				password,
			},
		);
	}

	/**
	 * Reset password
	 * @param email user email
	 * @returns
	 */
	forgotPassword(email: string) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.forgotPasswordURL()}`,
			{
				email,
			},
		);
	}

	/**
	 * Reset password.
	 * @param email user email
	 * @param password user password
	 * @param token auth token
	 * @returns
	 */
	resetPassword(email: string, password: string, token: string) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.resetPasswordURL()}`,
			{
				email,
				password,
				token,
			},
		);
	}

	/**
	 * Search
	 * @param email user email
	 * @param firstName user firstName
	 * @param lastName user lastName
	 * @returns
	 */
	search(email: string, firstName: string, lastName: string) {
		return this.httpClient.get<User>(
			`${this.routeAceessName.searchURL(email, firstName, lastName)}/`,
		);
	}
}

/**
 * Enum UserRole
 */
export enum UserRole {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	USER = 'USER',
}
/**
 * User entity
 */
export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	position: string;
	specialization: string;
	country: string;
	city: string;
	avatar: string;
	aboutMyself: string;
	phone: {
		id: string;
		type: 'WORK' | 'MOBILE' | 'HOME';
		value: string;
	}[];
	active: boolean;
	birthday: string | number;
	timestamp: number;
	showBirthYear: boolean;
	roles: UserRole[];
	departmentsIds: string[];
	socialMedia: {
		id: string;
		name: string;
		link: string;
	}[];
}

/**
 * Type for update user
 */
type updateUser = Omit<User, 'id' | 'active' | 'position' | 'roles'>;

/**
 * Type for update user position
 */
type updatePosition = Pick<User, 'position'>;
