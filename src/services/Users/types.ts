import { AxiosResponse } from 'axios';

export interface User {
	id: string;
}

export interface UsersInstance {
	list(page?: number, list?: number): Promise<AxiosResponse<User>>;
}
