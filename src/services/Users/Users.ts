import { AxiosInstance } from 'axios';

import { User, UsersInstance } from './types';

export class Users implements UsersInstance {
	private namespace = '/company/v1';
	constructor(private httpClient: AxiosInstance) {}

	list(page: number, list: number) {
		return this.httpClient.get<User>(`${this.namespace}/users`, {
			params: {
				page,
				list,
			},
		});
	}
}

