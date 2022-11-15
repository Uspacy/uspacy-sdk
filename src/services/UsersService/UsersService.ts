import { AxiosInstance } from 'axios';

/**
 * Users service
 */
export class Users {
	private namespace = '/company/v1';

	private routeAceessName = {
		BaseURL: `${this.namespace}/users/`,
		getUsersURL: (): string => `${this.routeAceessName.BaseURL}/`,
		userByIDURL: (id: string): string =>
			`${this.routeAceessName.BaseURL}/${id}`,
		userDeactivateURL: (id: string): string =>
			`${this.routeAceessName.userByIDURL(id)}/deactivate/`,
		userActivateURL: (id: string): string =>
			`${this.routeAceessName.userByIDURL(id)}/activate/`,
		userUpdateRolesURL: (id: string): string =>
			`${this.routeAceessName.userByIDURL(id)}/updateRoles/`,
		userUpdatePositionURL: (id: string): string =>
			`${this.routeAceessName.userByIDURL(id)}/updatePosition/`,
		userUpdatePasswordURL: (id: string): string =>
			`${this.routeAceessName.userByIDURL(id)}/changePassword/`,
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
			`${this.routeAceessName.getUsersURL()}/search/?email=${email}&firstName=${firstName}&LastName=${lastName}/`,
		avatarUploadURL: (): string =>
			`${this.routeAceessName.getUsersURL()}/uploadAvatar/`,
		checkEmailURL: (email: string): string =>
			`${this.routeAceessName.getUsersURL()}/checkEmail/?email=${email}`,
		getListUsersByFilterURL: (): string =>
			`${this.routeAceessName.getUsersURL()}/getUsersByField/`,
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
	getUsers(page: number, list: number) {
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
	 * Get user by id
	 * @param id user id
	 * @returns user entity
	 */
	getUserById(id: string) {
		return this.httpClient.get<User>(
			`${this.routeAceessName.userByIDURL(id)}`,
		);
	}

	/**
	 * Update user data by id.
	 * @param id user id
	 * @param config user info (interface)
	 * @returns updated user
	 */

	updateUser(id: string, config: updateUser) {
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
	deactivateUser(id: string) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.userDeactivateURL(id)}`,
		);
	}

	/**
	 * Activate user by id.
	 * @param id user id
	 * @returns user data with active: true
	 */
	activateUser(id: string) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.userActivateURL(id)}`,
		);
	}

	/**
	 * Update user roles by id.
	 * @param id user id
	 * @returns user data with new roles
	 */
	updateRoles(id: string, roles: UserRole[]) {
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
	updatePosition(id: string, position: updatePosition) {
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
	updatePassword(id: string, password: string) {
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
			`${this.routeAceessName.searchURL(email, firstName, lastName)}`,
		);
	}

	/**
	 * Avatar upload
	 * @param avatar
	 * @returns
	 */
	avatarUpload(avatar: number) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.avatarUploadURL()}`,
			{
				avatar,
			},
		);
	}

	/**
	 * Check email
	 * @param email
	 * @returns
	 */
	checkEmail(email: string) {
		return this.httpClient.get<getEmailExist>(
			`${this.routeAceessName.checkEmailURL(email)}`,
		);
	}

	/**
	 * Getting a list of users by filter
	 * @param ids
	 * @returns
	 */
	getListUsersByFilter(ids: string[]) {
		return this.httpClient.post<User>(
			`${this.routeAceessName.getListUsersByFilterURL()}`,
			{ ids },
		);
	}
}

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
	showBirthYear: boolean;
	roles: UserRole[];
	departmentsIds: string[];
	socialMedia: {
		id: string;
		name: string;
		link: string;
	}[];
}

interface getEmailExist {
	status: boolean;
	message: string;
}

type updateUser = Omit<User, 'id' | 'active' | 'position' | 'roles'>;
type updatePosition = Pick<User, 'position'>;
