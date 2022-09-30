import { AxiosInstance } from 'axios';

/**
 * Users service
 */
export class Users {
	private namespace = '/company/v1';
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
		return this.httpClient.get<User[]>(`${this.namespace}/users/`, {
			params: {
				page,
				list,
			},
		});
	}

	/**
	 * Get user by id
	 * @param id user id
	 * @returns user entity
	 */
	getById(id: number) {
		return this.httpClient.get<User>(`${this.namespace}/users/${id}/`);
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
	birthday: string;
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
