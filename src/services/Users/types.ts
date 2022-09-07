import { AxiosResponse } from 'axios';

export interface ReponseLogin {
	jwt: string;
	refreshToken: string;
	expiresInSeconds: number;
}

export interface ReponseUserList {
	jwt: string;
	refreshToken: string;
	expiresInSeconds: number;
}

export interface UsersInstance {
	login(email: string, password: string, remember?: boolean): Promise<AxiosResponse<ReponseLogin>>;
	list(page?: number, list?: number): Promise<AxiosResponse<ReponseUserList>>;
}
